/* ═══════════════════════════════════════════════════════════════════
   💌  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ═══════════════════════════════════════════════════════════════════

   Everything she reads lives here. Change the words, swap the photos,
   add or delete entries — the page rebuilds itself around whatever
   you put in.

   RULES:
   • Keep the "quotes" around text.
   • Keep the commas at the end of each line.
   • A missing photo NEVER breaks the page. It shows a soft placeholder
     instead, so it always looks intentional.
   • To add a photo: drop it in /photos and add one line to a chapter.
   • To delete anything: delete the whole line, commas included.

   ═══════════════════════════════════════════════════════════════════ */

window.CONTENT = {

  /* ── The basics ────────────────────────────────────────────────── */
  her:  "Dinks",
  me:   "Dev",

  // Your WhatsApp number, country code first, no + and no spaces.
  whatsapp: "919328346817",

  // What her phone will say when she taps "tell him".
  whatsappMessage: "I said yes. Obviously I said yes. 💗",

  /* ── Music ─────────────────────────────────────────────────────── */
  // Put your song in the /music folder and write its filename here.
  // Set file to "" to turn music off completely.
  music: {
    file:   "song.mp3",
    volume: 0.38,          // 0 to 1. Keep it low — it plays under everything.
  },

  /* ── 1. THE PARCEL — the very first thing she sees ─────────────── */
  parcel: {
    to:      "Dinks",
    warning: "DO NOT OPEN THIS IN PUBLIC",
    hint:    "pull the string",
    seal:    "D",
  },

  /* ── 2. THE NOTE ON TOP ────────────────────────────────────────── */
  note: [
    "I found a box of us.",
    "It has only been a month.",
    "Somehow there is already this much.",
  ],
  noteSign: "go slow — D",

  /* ── 3. THE CHAPTERS ───────────────────────────────────────────── */
  /*
     Each chapter is one page of the scrapbook.

     stamp   — the date stamp in the corner (any text works)
     title   — the big handwritten heading
     body    — the paragraph underneath (use \n\n for a line break)
     media   — the photos and videos taped to that page

     For each media item:
       { photo: "01.jpg", cap: "caption" }   ← from the /photos folder
       { video: "01.mp4", cap: "caption" }   ← from the /videos folder
       { photo: "", cap: "caption" }         ← leaves a blank slot for later

     VIDEOS: chapter 5 ("you, moving") already has 3 video slots waiting,
     and chapter 6 has 2 more. Drop 01.mp4 … 05.mp4 into /videos and they
     appear. Until then they show a dashed "video" placeholder so you can
     see exactly where they will land.

     layout  — how that chapter arranges its media. One of:
       "stack"    a leaning pile, the first photo on top
       "duo"      one large, one small tucked beside it
       "scatter"  loose, uneven, pinned at angles
       "solo"     a single large frame, nothing else competing
       "strip"    a horizontal film strip you swipe (best for videos)
       "mosaic"   a dense wall of small squares
     Leave it out and you get a plain even grid.

     Chapters also accept an optional  deco: "coffee" | "flower" | "clip"
     which tapes a little something extra onto the page.
  */
  chapters: [

    {
      stamp: "04 · 08 · 2026",
      title: "the day you replied",
      layout: "stack",
      body:
        "One month ago you answered a message, and I genuinely do not think " +
        "either of us understood what we had just started.\n\n" +
        "I have counted every day since. All thirty-one of them.",
      deco: "clip",
      media: [
        { photo: "photo1.jpeg", cap: "somewhere near the beginning" },
        { photo: "photo3.jpeg", cap: "us, early on" },
        { photo: "photo2.jpeg", cap: "you, being you" },
        { photo: "",           cap: "add one more here" },
      ],
    },

    {
      stamp: "the sound of you",
      title: "you speak tooooo muchhh",
      layout: "duo",
      body:
        "You do. You talk until there is no air left in the room, and you " +
        "type like this —",
      // Her actual texting voice. She will recognise this instantly.
      quote: "Yeahhhh ikkkkk, buttt idkkkk",
      bodyAfter:
        "Thirty-one days, and not once have I wanted you to stop.",
      media: [
        { photo: "", cap: "mid-sentence, probably" },
        { photo: "", cap: "still talking" },
      ],
    },

    {
      stamp: "22 · 08 · 2026",
      title: "nothing before coffee",
      layout: "scatter",
      body:
        "Near Tulsidham circle. You had something iced, because you always do " +
        "when we are out.\n\n" +
        "I had absolutely no idea how to say what I had come there to say. " +
        "I said it anyway.",
      deco: "coffee",
      media: [
        { photo: "", cap: "the table" },
        { photo: "", cap: "iced, obviously" },
        { photo: "", cap: "that evening" },
        { photo: "", cap: "us" },
        { photo: "", cap: "after" },
      ],
    },

    {
      stamp: "24 · 08 · 2026",
      title: "the fourth floor",
      layout: "solo",
      body:
        "No lights. No people. Nothing up there was even finished yet.\n\n" +
        "We talked for a while, and then we stopped talking.\n\n" +
        "You know the rest. I am still not entirely sure how it happened.",
      deco: "flower",
      media: [
        { photo: "", cap: "that night" },
        { photo: "", cap: "" },
      ],
    },

    {
      stamp: "on repeat",
      title: "you, moving",
      layout: "strip",
      body:
        "Photographs have never really worked on you. You do not hold still " +
        "long enough.\n\n" +
        "So here — the ones where you are dancing, and I am very obviously " +
        "not looking at anything else.",
      media: [
        { video: "01.mp4", cap: "you dancing" },
        { video: "02.mp4", cap: "and again" },
        { video: "03.mp4", cap: "my favourite one" },
        { photo: "",       cap: "caught mid-spin" },
        { photo: "",       cap: "" },
      ],
    },

    {
      stamp: "everything in between",
      title: "the small ones",
      layout: "mosaic",
      body:
        "Not every good thing gets a date written on it. Most of it is just " +
        "this — ordinary afternoons that I have somehow kept all of.",
      deco: "clip",
      media: [
        { photo: "", cap: "" },
        { photo: "", cap: "" },
        { photo: "", cap: "" },
        { video: "04.mp4", cap: "" },
        { photo: "", cap: "" },
        { photo: "", cap: "" },
        { photo: "", cap: "" },
        { video: "05.mp4", cap: "" },
      ],
    },

  ],

  /* ── 4. THE LIST FROM MY WALLET ────────────────────────────────── */
  wallet: {
    title: "a list I keep folded in my wallet",
    items: [
      "Pink. Always pink. Everything, always, pink.",
      "Iced when we are out. Hot when you are home, made just for you.",
      "The way you dance — and the fact that you let me watch.",
      "You hit me. Constantly. I have never minded anything less.",
      "You overthink everything, and you are usually right to.",
      "You get scolded for coming, and you come anyway.",
      "You trusted me with more than you had to. That one still gets me.",
      "You love being loved. Good. I have got a frankly unreasonable amount of it.",
    ],
  },

  /* ── 5. THE LETTER ─────────────────────────────────────────────── */
  letter: {
    to: "Dinks,",
    body:
      "It has been a month. Thirty-one days from the one you replied, and " +
      "I have been counting all of them.\n\n" +
      "I keep thinking about how easily none of this happens. We could have " +
      "gone anywhere, with anyone. We picked each other instead, and then " +
      "built all of this in four weeks.\n\n" +
      "You have trusted me with a lot. More, I think, than you meant to. I " +
      "have not taken one piece of it lightly.\n\n" +
      "I know your days are harder than you let anyone see. I know what it " +
      "costs you just to get out of the house, and I know exactly who you " +
      "answer to when you get back. You still come. You show up and you are " +
      "the loudest, brightest thing in the room, and not one person watching " +
      "you would ever guess what you carried to get there.\n\n" +
      "I am not going to be someone who makes your world smaller. You are far " +
      "too smart for that, and you have had quite enough of it already. " +
      "Whatever space you need is yours. I am only hoping you keep choosing " +
      "to spend some of it on me.\n\n" +
      "Krishna was born the night before I sent you that message, and he fell " +
      "in love with Radha. I meant it when I told you that in my eyes, you " +
      "are my Radha ji.\n\n" +
      "I really, really like you. Deliberately.",
    sign: "Love you lots,",
    from: "Dev",
  },

  /* ── 6. THE MIRROR ─────────────────────────────────────────────── */
  mirror: {
    kicker: "one more thing",
    title:  "before I ask you — look up.",
    invite: "let me show you something",
    button: "open the mirror",
    // Shown beside her face once the camera is on.
    caption: "There she is.\nThe prettiest girl I have ever seen.\nI am not being sweet. I am being accurate.",
    // Shown instead if she declines the camera, or it is not available.
    fallback: "That is completely alright.\nI already know what you look like.\nI think about it constantly.",
    privacy: "Nothing is uploaded, saved or sent. This stays on your phone.",

    // The shutter, once the mirror is live.
    shutter:  "take the picture",
    retake:   "again",
    taken:    "keep this one.",
  },

  /* ── 7. THE ASK ────────────────────────────────────────────────── */
  ask: {
    lines: [
      "so, Dinks —",
      "nothing before coffee?",
    ],
    sub: "just you and me. properly, this time.",
    question: "will you let me take you out?",
    yes: "yes",
    // The "no" button rewrites itself each time she taps it.
    noStages: [
      "no",
      "are you sure?",
      "think again",
      "wrong button",
      "ok fine… yes?",
    ],
  },

  /* ── 8. WHEN SHE SAYS YES ──────────────────────────────────────── */
  yes: {
    stamp:   "SHE SAID YES",
    line:    "I was never actually worried.",
    sub:     "iced coffee. you pick the day. I will handle the rest.",
    polaroidCap: "the second you said yes",
    save:    "save to my phone",
    share:   "save / send",
    tell:    "tell him",

    // Hint shown under the keepsake if her browser cannot download directly
    // (iPhones especially) — long-pressing the image always works.
    saveHint: "press and hold the picture to save it",

    // The words printed onto the keepsake image she saves.
    card: {
      kicker:  "05 · 09 · 2026",
      line:    "she said yes",
      caption: "nothing before coffee",
      sign:    "— Dev",
    },
  },

  /* ── 9. THE CLOSING ────────────────────────────────────────────── */
  closing: {
    line: "made by hand,",
    from: "by Dev. for Dinks.",
    date: "05 · 09 · 2026",
  },

  /* ── 10. THE SECRET ────────────────────────────────────────────── */
  // Hidden behind the pressed flower in the bottom corner.
  secret:
    "You are my first everything.\n\n" +
    "That fact still puts tears in my eyes, a month later, at completely " +
    "random times of day.\n\n" +
    "Being someone's first holds a place in them that nobody afterwards " +
    "ever gets to have. You have got mine. All of it.",

  /* ── 11. WHEN SHE COMES BACK ───────────────────────────────────── */
  // She will re-open this. This is what greets her the second time.
  returning: {
    title: "you already said yes.",
    sub:   "no takebacks. I have it in writing.",
    button: "read it all again",
  },

};
