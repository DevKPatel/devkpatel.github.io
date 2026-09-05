#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   Checks whether your photos and videos are small enough for her phone.
   She will most likely open this on mobile data. A heavy page means she
   stares at empty squares, and the surprise is gone.

       node tools/optimize-media.mjs          → report only
       node tools/optimize-media.mjs --fix    → actually shrink them
                                                (needs ffmpeg installed)
   ═══════════════════════════════════════════════════════════════════ */

import { readdirSync, statSync, renameSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, extname, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const FIX = process.argv.includes("--fix");

const LIMITS = {
  photos: { max: 400 * 1024, label: "400 KB", exts: [".jpg", ".jpeg", ".png", ".webp"] },
  videos: { max: 8 * 1024 * 1024, label: "8 MB", exts: [".mp4", ".mov", ".webm", ".m4v"] },
  music:  { max: 4 * 1024 * 1024, label: "4 MB", exts: [".mp3", ".m4a", ".ogg"] },
};

const kb = (n) => n < 1024 * 1024
  ? `${Math.round(n / 1024)} KB`
  : `${(n / 1024 / 1024).toFixed(1)} MB`;

function hasFfmpeg() {
  try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); return true; }
  catch { return false; }
}

const ffmpeg = hasFfmpeg();
let totalBytes = 0, problems = 0, fixed = 0;

console.log("\n  checking what she is about to download\n  " + "─".repeat(46) + "\n");

for (const [folder, rule] of Object.entries(LIMITS)) {
  const dir = join(ROOT, folder);
  if (!existsSync(dir)) continue;

  const files = readdirSync(dir).filter((f) => rule.exts.includes(extname(f).toLowerCase()));
  if (!files.length) {
    console.log(`  ${folder}/  — empty\n`);
    continue;
  }

  console.log(`  ${folder}/`);
  for (const f of files) {
    const path = join(dir, f);
    const size = statSync(path).size;
    totalBytes += size;

    const over = size > rule.max;
    const ext = extname(f).toLowerCase();
    const isMov = ext === ".mov";

    if (!over && !isMov) {
      console.log(`    ✓  ${f.padEnd(24)} ${kb(size)}`);
      continue;
    }

    problems++;
    const why = isMov && !over ? "will not play on Android" : `over ${rule.label}`;
    console.log(`    ✗  ${f.padEnd(24)} ${kb(size)}   ${why}`);

    if (!FIX) {
      if (folder === "photos") {
        console.log(`         ffmpeg -i "${folder}/${f}" -vf "scale='min(1200,iw)':-2" -q:v 4 "${folder}/${basename(f, ext)}-small.jpg"`);
      } else if (folder === "videos") {
        console.log(`         ffmpeg -i "${folder}/${f}" -vcodec h264 -crf 28 -vf "scale='min(720,iw)':-2" -acodec aac -b:a 96k "${folder}/${basename(f, ext)}-small.mp4"`);
      } else {
        console.log(`         ffmpeg -i "${folder}/${f}" -b:a 128k "${folder}/${basename(f, ext)}-small.mp3"`);
      }
      continue;
    }

    if (!ffmpeg) {
      console.log("         cannot fix — ffmpeg is not installed. https://ffmpeg.org/download.html");
      continue;
    }

    const backupDir = join(ROOT, folder, "originals");
    if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });

    const tmp = join(dir, `__tmp${folder === "photos" ? ".jpg" : folder === "videos" ? ".mp4" : ".mp3"}`);
    const args = folder === "photos"
      ? ["-y", "-i", path, "-vf", "scale='min(1200,iw)':-2", "-q:v", "4", tmp]
      : folder === "videos"
        ? ["-y", "-i", path, "-vcodec", "h264", "-crf", "28", "-vf", "scale='min(720,iw)':-2",
           "-acodec", "aac", "-b:a", "96k", "-movflags", "+faststart", tmp]
        : ["-y", "-i", path, "-b:a", "128k", tmp];

    try {
      execFileSync("ffmpeg", args, { stdio: "ignore" });
      renameSync(path, join(backupDir, f));                 // your original is kept, never deleted
      const outName = basename(f, ext) + (folder === "photos" ? ".jpg" : folder === "videos" ? ".mp4" : ".mp3");
      renameSync(tmp, join(dir, outName));
      const now = statSync(join(dir, outName)).size;
      console.log(`         → ${outName}  ${kb(size)} → ${kb(now)}   (original kept in ${folder}/originals/)`);
      if (outName !== f) console.log(`         ⚠  update content.js: "${f}" is now "${outName}"`);
      fixed++;
    } catch {
      console.log("         ffmpeg failed on this one — convert it by hand.");
    }
  }
  console.log("");
}

console.log("  " + "─".repeat(46));
console.log(`  total she downloads: ${kb(totalBytes)}`);
if (totalBytes > 25 * 1024 * 1024) {
  console.log("  ⚠  that is a lot for mobile data. aim for under 25 MB.");
} else {
  console.log("  ✓  that will load fine on her phone.");
}

if (problems && !FIX) {
  console.log(`\n  ${problems} file(s) need attention.`);
  console.log(ffmpeg
    ? "  run:  node tools/optimize-media.mjs --fix\n"
    : "  install ffmpeg to fix them automatically: https://ffmpeg.org/download.html\n");
} else if (FIX) {
  console.log(`\n  fixed ${fixed} file(s). originals are safe in */originals/.\n`);
} else {
  console.log("  ✓  nothing to fix.\n");
}
