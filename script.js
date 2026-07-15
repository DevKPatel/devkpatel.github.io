/* =====================================================
   🎂  EDIT EVERYTHING IN THIS CONFIG BLOCK  🎂
   This is the ONLY part you need to change to make it
   personal. Keep the quotes "" around text.
   ===================================================== */
const CONFIG = {
  // --- Names ---
  herName: "Daisy",         // 👈 the birthday girl
  yourName: "Dev",          // 👈 who it's from
  petName: "Sunshine",      // a cute nickname (used here and there)

  // --- The typed lines in the hero (they cycle) ---
  typedLines: [
    "the friend everyone wishes they had…",
    "flowers, coffee, and the biggest heart…",
    "chaotic, hilarious, and impossible not to love…",
    "officially another year more iconic…",
  ],

  // --- Why Daisy is the best (tap-to-flip cards) ---
  reasons: [
    { emoji: "🌸", text: "You light up every room like a field of daisies in the sun." },
    { emoji: "☕", text: "Nobody does a coffee-and-catch-up better than you." },
    { emoji: "🍜", text: "The best food adventures always start with 'Daisy, look at this place.'" },
    { emoji: "🧸", text: "You find the cutest little things and make them everyone's favourite." },
    { emoji: "😂", text: "You turn the most ordinary days into stories we tell for years." },
    { emoji: "💛", text: "You show up, every time — the truest friend a person could ask for." },
  ],

  // --- The birthday note ---
  letterBody:
    "Happy birthday, Daisy! 🎉 I couldn't let today go by without making you something " +
    "as one-of-a-kind as you are. From coffee runs to food crawls to hunting down the cutest " +
    "little things nobody else would notice — every day is better with you in it.\n\n" +
    "You're kind, you're ridiculous (the best way), and you have a heart the size of the sky. " +
    "So here's to you today: I hope this year brings you all the flowers, all the good coffee, " +
    "all the incredible food, and every bit of the happiness you're always handing out to everyone else. " +
    "You deserve the whole world. Thanks for being my person. 🌼",

  // --- Photo captions (match the order of your photos) ---
  // Put your image files in the /photos folder named photo1.jpg, photo2.jpg ...
  // To use placeholders only, leave 'file' as "" (empty).
  photos: [
    { file: "photo1.jpg", caption: "dinner nights out 🍽️" },
    { file: "photo2.jpg", caption: "our kind of chaos 😄" },
    { file: "photo3.jpg", caption: "flowers suit you 🌷" },
  ],

  // --- Birthday wish chips ---
  affirmations: [
    "Happy Birthday! 🎂",
    "All the flowers 🌸",
    "Endless good coffee ☕",
    "The best food 🍰",
    "So many cute little things 🧸",
    "Best friend ever 💛",
    "Have the best day 🎉",
  ],

  // --- Our someday list (friend bucket-list cards) ---
  dreams: [
    { emoji: "☕", text: "Try every cute café in the city — one cappuccino at a time." },
    { emoji: "🍜", text: "Eat our way through that endless 'we should go here' list." },
    { emoji: "🌻", text: "A whole day at a flower market, just because." },
    { emoji: "✈️", text: "A trip together where the only plan is fun." },
  ],

  // --- The secret message (in the 💌 button, bottom-right) ---
  secretMessage:
    "Okay, real talk 💛\n\n" +
    "You're one of the best people I know, and getting to be your friend is a genuine gift. " +
    "I hope this birthday is full of flowers, coffee, amazing food, and every cute little thing " +
    "that makes you smile. Have the best day, Daisy — you've earned it. 🎉",

  // --- Background music (OPTIONAL) ---
  // Put an mp3 in a /music folder and write its name below, e.g. "song.mp3".
  // Leave "" to hide the music button entirely.
  musicFile: "",
};

/* =====================================================
   ⬇  You don't need to edit anything below this line  ⬇
   ===================================================== */

// ---- Helpers ----
const $ = (s) => document.querySelector(s);
const make = (tag, cls, html) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html != null) el.innerHTML = html;
  return el;
};

// ---- Background: stars ----
(function buildStars() {
  const wrap = $("#stars");
  const n = window.innerWidth < 600 ? 50 : 90;
  for (let i = 0; i < n; i++) {
    const s = make("span", "star");
    const size = Math.random() * 2.2 + 0.6;
    s.style.width = s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.setProperty("--t", (Math.random() * 4 + 2.5) + "s");
    s.style.animationDelay = Math.random() * 4 + "s";
    wrap.appendChild(s);
  }
})();

// ---- Background: falling petals ----
(function buildPetals() {
  const wrap = $("#petals");
  const glyphs = ["🌸", "🌼", "☕", "🎂", "🧸", "🌷", "✿"];
  const n = window.innerWidth < 600 ? 12 : 20;
  for (let i = 0; i < n; i++) {
    const p = make("span", "petal", glyphs[i % glyphs.length]);
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--s", (Math.random() * 14 + 14) + "px");
    p.style.setProperty("--ft", (Math.random() * 10 + 12) + "s");
    p.style.setProperty("--fd", (-Math.random() * 16) + "s");
    p.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    wrap.appendChild(p);
  }
})();

// ---- Fill in names everywhere (safe — skips elements that were removed/commented out) ----
function setText(sel, val) { const el = $(sel); if (el) el.textContent = val; }
setText("#gateName", CONFIG.herName || "Birthday Girl");
setText("#heroFor", "For " + (CONFIG.herName || "you"));
setText("#letterTo", "Dear " + (CONFIG.herName || "friend") + ",");
setText("#letterBody", CONFIG.letterBody);
setText("#letterFrom", CONFIG.yourName || "Me");
setText("#modalBody", CONFIG.secretMessage);
setText("#closingName", "have the happiest birthday, " + (CONFIG.herName || "friend") + ".");
setText("#madeBy", "Made with 💛 by " + (CONFIG.yourName || "me") + " · for " + (CONFIG.herName || "you"));
document.title = "Happy Birthday, " + (CONFIG.herName || "You") + " 🎉";

// ---- Build reason cards ----
(function buildReasons() {
  const wrap = $("#reasonCards");
  CONFIG.reasons.forEach((r, i) => {
    const card = make("div", "card");
    card.innerHTML =
      '<div class="card__inner">' +
        '<div class="card__face card__front">' +
          '<span class="card__num">' + String(i + 1).padStart(2, "0") + '</span>' +
          '<span class="card__emoji">' + r.emoji + '</span>' +
          '<span class="card__hint">tap to read</span>' +
        '</div>' +
        '<div class="card__face card__back">' + r.text + '</div>' +
      '</div>';
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    wrap.appendChild(card);
  });
})();

// ---- Build polaroids ----
(function buildPolaroids() {
  const wrap = $("#polaroids");
  const rots = [-4, 3, -2, 4, -3, 2];
  CONFIG.photos.forEach((p, i) => {
    const pol = make("div", "polaroid");
    pol.style.setProperty("--r", rots[i % rots.length] + "deg");
    let imgHtml;
    if (p.file) {
      imgHtml = '<img class="polaroid__img" src="photos/' + p.file +
        '" alt="' + (p.caption || "us") + '" loading="lazy" ' +
        "onerror=\"this.outerHTML='<div class=\\'polaroid__img placeholder\\'>📷 add photos/" + p.file + "</div>'\">";
    } else {
      imgHtml = '<div class="polaroid__img placeholder">📷 your photo here</div>';
    }
    pol.innerHTML = imgHtml + '<div class="polaroid__cap">' + (p.caption || "") + '</div>';
    wrap.appendChild(pol);
  });
})();

// ---- Build affirmation chips ----
(function buildAffirm() {
  const wrap = $("#affirm");
  if (!wrap) return;
  CONFIG.affirmations.forEach((a) => wrap.appendChild(make("span", "chip", a)));
})();

// ---- Build dreams ----
(function buildDreams() {
  const wrap = $("#dreams");
  if (!wrap) return;
  CONFIG.dreams.forEach((d) => {
    const el = make("div", "dream",
      '<div class="dream__emoji">' + d.emoji + '</div>' +
      '<div class="dream__text">' + d.text + '</div>');
    wrap.appendChild(el);
  });
})();

// ---- Countdown ----
(function countdown() {
  const days = $("#cdDays"), hours = $("#cdHours"), mins = $("#cdMins"), secs = $("#cdSecs");
  if (!days) return;
  const target = new Date(CONFIG.examDate).getTime();
  if (isNaN(target)) { const cd = $("#countdown"); if (cd) cd.style.display = "none"; return; }
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      days.textContent = hours.textContent = mins.textContent = secs.textContent = "00";
      setText("#cdCaption", "Go ace it — I believe in you! 🍀");
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    days.textContent = pad(d); hours.textContent = pad(h);
    mins.textContent = pad(m); secs.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

// ---- Typewriter ----
(function typewriter() {
  const el = $("#typed");
  const lines = CONFIG.typedLines;
  let li = 0, ci = 0, deleting = false;
  function step() {
    const line = lines[li];
    if (!deleting) {
      el.textContent = line.slice(0, ++ci);
      if (ci === line.length) { deleting = true; return setTimeout(step, 1700); }
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(step, deleting ? 40 : 70);
  }
  step();
})();

// ---- Scroll reveal ----
(function scrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".on-scroll, .card, .polaroid, .chip").forEach((el) => io.observe(el));
})();

// ---- Heart burst effect ----
function heartBurst(x, y, count) {
  const glyphs = ["🎉", "🎂", "🌸", "🌼", "☕", "🎈", "💛"];
  for (let i = 0; i < (count || 14); i++) {
    const h = make("span", "burst", glyphs[Math.floor(Math.random() * glyphs.length)]);
    const ang = Math.random() * Math.PI * 2;
    const dist = Math.random() * 140 + 50;
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.setProperty("--bx", Math.cos(ang) * dist + "px");
    h.style.setProperty("--by", (Math.sin(ang) * dist - 60) + "px");
    h.style.fontSize = (Math.random() * 14 + 14) + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 950);
  }
}

// ---- Surprise gate open ----
(function gate() {
  const gateEl = $("#gate");
  const main = $("#main");
  document.body.classList.add("locked");

  function open(e) {
    const x = (e && e.clientX) || window.innerWidth / 2;
    const y = (e && e.clientY) || window.innerHeight / 2;
    heartBurst(x, y, 26);
    gateEl.classList.add("is-open");
    document.body.classList.remove("locked");
    main.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => main.classList.add("is-visible"));
    // try to start music if configured
    tryStartMusic();
    setTimeout(() => { gateEl.style.display = "none"; }, 950);
  }
  $("#gateBtn").addEventListener("click", open);
  $("#gateHeart").addEventListener("click", open);
})();

// ---- Secret message modal ----
(function secret() {
  const modal = $("#modal");
  const btn = $("#secretBtn");
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 18);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
  function close() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
  $("#modalClose").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

// ---- Optional background music ----
let _musicReady = false;
function tryStartMusic() {
  if (!CONFIG.musicFile) return;
  const audio = $("#bgm");
  const btn = $("#musicBtn");
  if (!_musicReady) {
    audio.src = "music/" + CONFIG.musicFile;
    btn.hidden = false;
    _musicReady = true;
    btn.addEventListener("click", () => {
      if (audio.paused) { audio.play(); btn.classList.add("playing"); }
      else { audio.pause(); btn.classList.remove("playing"); }
    });
  }
  audio.volume = 0.55;
  audio.play().then(() => btn.classList.add("playing")).catch(() => {/* needs a tap */});
}

// ---- A gentle heart on click, anywhere (desktop delight) ----
document.addEventListener("click", (e) => {
  if (e.target.closest(".gate, .secret-btn, .music-btn, .modal, .card, .gate-btn")) return;
  heartBurst(e.clientX, e.clientY, 4);
});
