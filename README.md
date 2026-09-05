# a box of us

A surprise for Dinks. She pulls a string, a parcel opens, and a scrapbook of
the last month unfolds — photos taped to paper, your videos as moving
polaroids, the letter, the list from your wallet — and then a mirror, and then
the question.

---

## 1. The only file you edit

**`content.js`.** Every word she reads lives in there, with comments explaining
each block. You never need to touch `styles.css` or `script.js`.

Open it and you'll find: her name, your WhatsApp number, the parcel, the note,
the six chapters, the wallet list, the letter, the mirror, the ask, the payoff,
and the secret behind the flower.

---

## 2. Your photos and videos

| Folder | What goes in | Then |
|---|---|---|
| `photos/` | `.jpg` / `.png` | add a `{ photo: "name.jpg", cap: "…" }` line to a chapter |
| `videos/` | `.mp4` only | add a `{ video: "01.mp4", cap: "…" }` line |
| `music/`  | one `.mp3` named `song.mp3` | nothing — it just works |

There are **18 empty photo slots** and **5 video slots** already waiting in
`content.js`. Fill the ones you want, delete the lines you don't. Each folder
has its own README with the details.

**A missing file never breaks the page.** A waiting photo shows a dashed pink
"photo" placeholder; a waiting **video** shows a dark "video" placeholder with
a play mark, so you can always see which is which and where they'll land.
Chapter 5 ("you, moving") is the film strip — drop `01.mp4`, `02.mp4`,
`03.mp4` in and they appear there.

### Each chapter has its own layout

Add `layout:` to any chapter to change how its media is arranged:

| `layout` | Looks like |
|---|---|
| `stack` | a leaning pile, staggered left and right |
| `duo` | one large, one smaller tucked below it |
| `scatter` | loose and uneven, pinned at angles |
| `solo` | a single large frame, nothing competing |
| `strip` | a swipeable film strip — best for videos |
| `mosaic` | a dense wall of small squares |

Leave it out for a plain even grid.

### Before you push, check the weight

She is opening this on mobile data. If it takes 40 seconds to load, the moment
is gone.

```bash
node tools/optimize-media.mjs
```

That reports anything too heavy and prints the exact command to fix it. Add
`--fix` to shrink them automatically (needs ffmpeg; your originals are moved to
`*/originals/`, never deleted).

Rough targets: photos under 400 KB, videos under 8 MB and 15 seconds, song
under 4 MB, whole site under 25 MB.

**iPhone videos:** `.mov` will not play on Android. Convert first:

```bash
ffmpeg -i clip.mov -vcodec h264 -acodec aac -movflags +faststart videos/01.mp4
```

---

## 3. Preview it yourself first

```bash
python -m http.server 5520
```

Then open <http://localhost:5520>. Use a real server, not a double-click on
`index.html` — the camera mirror only works over `http://localhost` or `https://`.

To see the ask again after you've answered once, clear the site data for
localhost, or open a private window. The page remembers her yes on purpose.

---

## 4. Publish it

```bash
git add -A && git commit -m "a box of us" && git push
```

### ⚠️ You must turn GitHub Pages back on

As of building this, **<https://devkpatel.github.io> returns 404** — the code is
pushed, but Pages is not serving. An earlier commit deleted the `CNAME`, which
can switch it off.

Go to **repo → Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `/ (root)` → Save**, wait a minute or two, then load the URL. Fix this
*before* you send her anything.

---

## 5. How to send her the link

Send it and add one line: **"open this in Chrome/Safari, not inside WhatsApp."**

WhatsApp opens links in its own in-app browser, which often blocks the camera.
The mirror will detect that and tell her gently, but the moment is much better
if it just works. Everything else on the page works fine either way.

---

## 6. What is deliberately private

This site sits on a **public URL with your real name on it.** `noindex` and
`robots.txt` keep it out of Google, but anyone who has or guesses the link can
open it.

So the following are **not** on the page, on purpose: the car, what happened on
the fourth floor, anything about her period, and her own words to you about a
first kiss. She has strict parents and a brother who already scold her for
meeting you — if that page ever reached them, she is the one who pays.

`24 August` is on the timeline, written so only the two of you can decode it.
All the tenderness, none of the evidence.

If you ever add anything explicit here, remember it is a public web page, not a
private message.

---

## 7. If something looks wrong

| Problem | Cause |
|---|---|
| Page is blank | `content.js` has a typo — a missing comma or quote. Open the browser console. |
| A photo shows a placeholder | Filename in `content.js` doesn't match the file exactly, capitals included. |
| Video square stays dark | It's a `.mov`, or the filename is wrong. Convert to `.mp4`. |
| No music button | No playable `music/song.mp3`. The button hides itself rather than sit there doing nothing. |
| Mirror won't open | Opened from inside WhatsApp/Instagram, or she declined the camera. It falls back to a written message. |
| Everything is at `/` 404 | GitHub Pages is off. See section 4. |

---

## Files

```
index.html      structure
styles.css      all the design
script.js       all the behaviour
content.js      ← your words. the only file you edit.
robots.txt      keeps it out of search engines
tools/          media size checker
photos/ videos/ music/
```

The previous version of the site is preserved on the **`v1-love-letter`** git
branch if you ever want anything from it.
