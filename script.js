/* ═══════════════════════════════════════════════════════════════════
   a box of us — behaviour
   Nothing personal lives in here. All the words are in content.js
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var C = window.CONTENT || {};
  var $ = function (s) { return document.querySelector(s); };
  var SAID_YES_KEY = "boxofus.saidyes";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function set(sel, text) { var n = $(sel); if (n && text != null) n.textContent = text; }
  function paras(target, text) {
    target.innerHTML = "";
    String(text || "").split("\n\n").forEach(function (t, i) {
      var p = el("p", null, t);
      p.style.setProperty("--i", i);
      target.appendChild(p);
    });
  }

  /* ── in-app browsers (WhatsApp, Instagram) block the camera ────── */
  var ua = navigator.userAgent || "";
  var inApp = /FBAN|FBAV|Instagram|Line\/|WhatsApp|Snapchat/i.test(ua);


  /* ═══════════════════════════════════════════════════════════
     TEXT
     ═══════════════════════════════════════════════════════════ */
  document.title = "for " + (C.her || "you");

  set("#parcelTo", (C.parcel && C.parcel.to) || C.her);
  set("#parcelWarn", C.parcel && C.parcel.warning);
  set("#parcelHint", C.parcel && C.parcel.hint);
  set("#parcelSealChar", (C.parcel && C.parcel.seal) || "D");

  (function note() {
    var wrap = $("#noteLines");
    (C.note || []).forEach(function (line) { wrap.appendChild(el("p", null, line)); });
    set("#noteSign", C.noteSign);
  })();

  set("#walletTitle", C.wallet && C.wallet.title);
  set("#letterTo", C.letter && C.letter.to);
  set("#letterSign", C.letter && C.letter.sign);
  set("#letterFrom", C.letter && C.letter.from);
  if (C.letter) paras($("#letterBody"), C.letter.body);

  set("#turnKicker", C.mirror && C.mirror.kicker);
  set("#turnTitle", C.mirror && C.mirror.title);
  set("#mirrorInvite", C.mirror && C.mirror.invite);
  set("#mirrorBtn", C.mirror && C.mirror.button);
  set("#mirrorPrivacy", C.mirror && C.mirror.privacy);

  set("#askSub", C.ask && C.ask.sub);
  set("#askQuestion", C.ask && C.ask.question);
  set("#btnYes", C.ask && C.ask.yes);
  set("#yesStamp", C.yes && C.yes.stamp);
  set("#yesLine", C.yes && C.yes.line);
  set("#yesSub", C.yes && C.yes.sub);
  set("#yesPhotoCap", C.yes && C.yes.polaroidCap);
  set("#btnSave", C.yes && C.yes.save);
  set("#btnTell", C.yes && C.yes.tell);

  set("#closingLine", C.closing && C.closing.line);
  set("#closingFrom", C.closing && C.closing.from);
  set("#closingDate", C.closing && C.closing.date);
  set("#secretBody", C.secret);

  set("#againTitle", C.returning && C.returning.title);
  set("#againSub", C.returning && C.returning.sub);
  set("#againBtn", C.returning && C.returning.button);

  if (C.whatsapp) {
    $("#btnTell").href = "https://wa.me/" + C.whatsapp +
      "?text=" + encodeURIComponent(C.whatsappMessage || "yes 💗");
  }

  (function wallet() {
    var list = $("#walletList");
    ((C.wallet && C.wallet.items) || []).forEach(function (t, i) {
      var li = el("li", null, t);
      li.style.setProperty("--i", i);
      list.appendChild(li);
    });
  })();


  /* ═══════════════════════════════════════════════════════════
     CHAPTERS
     ═══════════════════════════════════════════════════════════ */
  (function chapters() {
    var host = $("#chapters");

    (C.chapters || []).forEach(function (ch) {
      var sec = el("section", "spread");
      var page = el("article", "page");

      if (ch.deco) page.appendChild(el("div", "deco deco--" + ch.deco));

      if (ch.stamp) {
        var st = el("span", "stamp rev", ch.stamp);
        page.appendChild(st);
      }
      if (ch.title) page.appendChild(el("h2", "chapter__title rev", ch.title));

      if (ch.body) {
        var b = el("div", "chapter__body rev");
        paras(b, ch.body);
        page.appendChild(b);
      }
      if (ch.quote) page.appendChild(el("p", "chapter__quote rev", ch.quote));
      if (ch.bodyAfter) {
        var b2 = el("div", "chapter__body rev");
        paras(b2, ch.bodyAfter);
        page.appendChild(b2);
      }

      var items = ch.media || [];
      if (items.length) {
        var grid = el("div", "media" + (items.length === 1 ? " media--one" : ""));
        items.forEach(function (m) { grid.appendChild(buildMedia(m)); });
        page.appendChild(grid);
      }

      page.appendChild(el("div", "page__fold"));
      sec.appendChild(page);
      host.appendChild(sec);
    });
  })();

  function buildMedia(m) {
    var fig = el("figure", "polaroid rev");
    var frame = el("div", "polaroid__frame");

    if (m.video) {
      fig.classList.add("polaroid--video");
      fig.dataset.type = "video";
      fig.dataset.src = "videos/" + m.video;
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("muted", "");
      v.preload = "none";
      frame.appendChild(v);
    } else if (m.photo) {
      fig.dataset.type = "photo";
      fig.dataset.src = "photos/" + m.photo;
      var img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = m.cap || "us";
      img.src = "photos/" + m.photo;
      img.onerror = function () {
        fig.classList.add("polaroid--empty");
        fig.removeAttribute("data-type");
        img.remove();
      };
      frame.appendChild(img);
    } else {
      fig.classList.add("polaroid--empty");
    }

    fig.appendChild(frame);
    if (m.cap) fig.appendChild(el("figcaption", "polaroid__cap", m.cap));
    fig.dataset.cap = m.cap || "";
    return fig;
  }


  /* ═══════════════════════════════════════════════════════════
     THE PARCEL
     ═══════════════════════════════════════════════════════════ */
  var opened = false;
  function openParcel() {
    if (opened) return;
    opened = true;
    var p = $("#parcel");
    p.classList.add("is-open");
    document.body.classList.remove("is-sealed");
    var album = $("#album");
    album.setAttribute("aria-hidden", "false");
    // NOT requestAnimationFrame: it never fires while the tab is backgrounded,
    // which would leave her staring at a blank page if she switched apps.
    album.classList.add("is-visible");
    startMusic();
    $("#flower").hidden = false;
    setTimeout(function () { p.style.display = "none"; }, 1100);
  }
  $("#parcelPull").addEventListener("click", openParcel);
  $("#parcelBox").addEventListener("click", openParcel);


  /* ═══════════════════════════════════════════════════════════
     REVEALS
     ═══════════════════════════════════════════════════════════ */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("on");
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  function watchReveals() {
    document.querySelectorAll(".rev, .wallet__list li, .letter__body p")
      .forEach(function (n) { revealIO.observe(n); });
  }
  watchReveals();


  /* ═══════════════════════════════════════════════════════════
     VIDEOS — load and play only when she is looking at them
     ═══════════════════════════════════════════════════════════ */
  var videoIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var fig = e.target;
      var v = fig.querySelector("video");
      if (!v) return;
      if (e.isIntersecting) {
        if (!v.src) v.src = fig.dataset.src;
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
        fig.classList.add("is-playing");
      } else {
        v.pause();
        fig.classList.remove("is-playing");
      }
    });
  }, { threshold: 0.45 });

  document.querySelectorAll(".polaroid--video").forEach(function (f) {
    videoIO.observe(f);
    var v = f.querySelector("video");
    v.addEventListener("error", function () {
      f.classList.add("polaroid--empty");
      f.classList.remove("polaroid--video");
      f.removeAttribute("data-type");
      v.remove();
    });
  });


  /* ═══════════════════════════════════════════════════════════
     LIGHTBOX
     ═══════════════════════════════════════════════════════════ */
  var light = $("#light"), stage = $("#lightStage");
  document.addEventListener("click", function (e) {
    var fig = e.target.closest && e.target.closest(".polaroid[data-type]");
    if (!fig || fig.classList.contains("polaroid--hero")) return;
    openLight(fig);
  });

  function openLight(fig) {
    stage.innerHTML = "";
    if (fig.dataset.type === "video") {
      var v = document.createElement("video");
      v.src = fig.dataset.src;
      v.controls = true; v.autoplay = true; v.loop = true;
      v.playsInline = true; v.setAttribute("playsinline", "");
      stage.appendChild(v);
      duck(true);
    } else {
      var i = document.createElement("img");
      i.src = fig.dataset.src;
      i.alt = fig.dataset.cap || "us";
      stage.appendChild(i);
    }
    set("#lightCap", fig.dataset.cap || "");
    light.classList.add("open");
    light.setAttribute("aria-hidden", "false");
  }
  function closeLight() {
    light.classList.remove("open");
    light.setAttribute("aria-hidden", "true");
    stage.innerHTML = "";
    duck(false);
  }
  $("#lightClose").addEventListener("click", closeLight);
  light.addEventListener("click", function (e) { if (e.target === light) closeLight(); });


  /* ═══════════════════════════════════════════════════════════
     THE MIRROR
     ═══════════════════════════════════════════════════════════ */
  var mirror = $("#mirror"),
      mVideo = $("#mirrorVideo"),
      mCanvas = $("#mirrorCanvas"),
      mCaption = $("#mirrorCaption"),
      stream = null,
      cameraOn = false;

  function showCaption(text) {
    mCaption.textContent = text;
    setTimeout(function () { mCaption.classList.add("on"); }, 30);
  }

  $("#mirrorBtn").addEventListener("click", function () {
    if (inApp) return mirrorFail(true);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return mirrorFail(false);

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
      audio: false
    }).then(function (s) {
      stream = s;
      mVideo.srcObject = s;
      var pr = mVideo.play();
      if (pr && pr.catch) pr.catch(function () {});
      cameraOn = true;
      mirror.classList.add("is-live");
      showCaption((C.mirror && C.mirror.caption) || "");
    }).catch(function () {
      mirrorFail(false);
    });
  });

  function mirrorFail(isInApp) {
    $("#mirrorIdle").style.opacity = "0";
    $("#mirrorIdle").style.pointerEvents = "none";
    var msg = (C.mirror && C.mirror.fallback) || "";
    if (isInApp) {
      msg = "Open this in Safari or Chrome and the mirror will work.\n\n" + msg;
    }
    showCaption(msg);
  }

  function capture() {
    if (!cameraOn || !mVideo.videoWidth) return null;
    var w = mVideo.videoWidth, h = mVideo.videoHeight;
    var side = Math.min(w, h);
    mCanvas.width = side; mCanvas.height = side;
    var ctx = mCanvas.getContext("2d");
    // mirrored, so it matches exactly what she was looking at
    ctx.translate(side, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(mVideo, (w - side) / 2, (h - side) / 2, side, side, 0, 0, side, side);
    try { return mCanvas.toDataURL("image/jpeg", 0.92); }
    catch (err) { return null; }
  }

  function stopCamera() {
    if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
    cameraOn = false;
  }


  /* ═══════════════════════════════════════════════════════════
     THE ASK
     ═══════════════════════════════════════════════════════════ */
  var askTyped = false;
  var askIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !askTyped) { askTyped = true; typeAsk(); }
    });
  }, { threshold: 0.4 });
  askIO.observe($("#ask"));

  function typeAsk() {
    var host = $("#askLines");
    var lines = (C.ask && C.ask.lines) || [];
    host.innerHTML = "";

    if (reduced) {
      lines.forEach(function (t, i) {
        host.appendChild(el("p", "ask__line" + (i ? " ask__line--accent" : ""), t));
      });
      return finishAsk();
    }

    var li = 0;
    (function nextLine() {
      if (li >= lines.length) return finishAsk();
      var p = el("p", "ask__line" + (li ? " ask__line--accent" : ""));
      var span = el("span");
      var cur = el("span", "cursor");
      p.appendChild(span); p.appendChild(cur);
      host.appendChild(p);

      var text = lines[li], ci = 0;
      (function tick() {
        span.textContent = text.slice(0, ++ci);
        if (ci < text.length) return setTimeout(tick, 62);
        cur.remove();
        li++;
        setTimeout(nextLine, 460);
      })();
    })();
  }

  function finishAsk() {
    setTimeout(function () { $("#askQuestion").classList.add("on"); }, 320);
    setTimeout(function () { $("#askButtons").classList.add("on"); }, 700);
  }

  /* the "no" that keeps changing its mind */
  var noStage = 0;
  $("#btnNo").addEventListener("click", function () {
    var stages = (C.ask && C.ask.noStages) || ["no"];
    noStage++;
    if (noStage >= stages.length) return sayYes();
    this.textContent = stages[noStage];
    this.style.transform = "scale(" + Math.max(0.72, 1 - noStage * 0.07) + ")";
  });

  $("#btnYes").addEventListener("click", sayYes);


  /* ═══════════════════════════════════════════════════════════
     SHE SAID YES
     ═══════════════════════════════════════════════════════════ */
  var answered = false;
  function sayYes() {
    if (answered) return;
    answered = true;
    try { localStorage.setItem(SAID_YES_KEY, "1"); } catch (e) {}

    var shot = null;
    if (cameraOn) {
      $("#mirrorFlash").classList.add("fire");
      shot = capture();
    }

    var scene = $("#yesScene");
    scene.hidden = false;
    $("#closing").hidden = false;      // the credits are her reward for saying yes
    $("#ask").style.display = "none";

    if (shot) {
      $("#yesPhoto").src = shot;
      $("#yesPolaroid").hidden = false;
      var save = $("#btnSave");
      save.href = shot;
      save.download = (C.her || "us").toLowerCase() + "-said-yes.jpg";
      save.hidden = false;
    }
    stopCamera();

    // inline:"nearest" stops scrollIntoView nudging the page sideways —
    // the tape and coffee ring hang past the edge on purpose
    scene.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start", inline: "nearest" });
    setTimeout(function () { document.documentElement.scrollLeft = 0; }, 60);
    setTimeout(function () { $("#yesStamp").classList.add("thump"); }, 480);
    if (!reduced) { rain(90); setTimeout(function () { rain(60); }, 900); }
  }

  /* paper scraps, petals and tiny polaroids falling */
  function rain(n) {
    var box = $("#confetti");
    var pinks = ["#e34f7c", "#f9c4d2", "#bd2f5f", "#fde3ea", "#f2d8d5", "#c2955c"];
    for (var i = 0; i < n; i++) {
      var kind = Math.random();
      var s = el("span", "scrap");
      if (kind < 0.16) {
        s.textContent = "❀";
        s.style.color = pinks[i % pinks.length];
        s.style.fontSize = (Math.random() * 12 + 12) + "px";
      } else if (kind < 0.28) {
        // a tiny polaroid
        s.style.width = "13px"; s.style.height = "16px";
        s.style.background = "#fffdfb";
        s.style.boxShadow = "inset 0 0 0 2px " + pinks[i % pinks.length];
      } else {
        s.style.width = (Math.random() * 7 + 4) + "px";
        s.style.height = (Math.random() * 12 + 6) + "px";
        s.style.background = pinks[i % pinks.length];
        s.style.borderRadius = Math.random() < 0.4 ? "50%" : "1px";
      }
      s.style.left = Math.random() * 100 + "vw";
      s.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
      s.style.setProperty("--dr", (Math.random() * 900 - 300) + "deg");
      s.style.setProperty("--ft", (Math.random() * 2.4 + 3.2) + "s");
      s.style.setProperty("--fd", (Math.random() * 1.2) + "s");
      box.appendChild(s);
      setTimeout((function (node) { return function () { node.remove(); }; })(s), 7000);
    }
  }


  /* ═══════════════════════════════════════════════════════════
     MUSIC
     ═══════════════════════════════════════════════════════════ */
  var audio = $("#audio"), musicBtn = $("#music"), musicReady = false;
  var baseVol = (C.music && typeof C.music.volume === "number") ? C.music.volume : 0.38;

  function startMusic() {
    if (!C.music || !C.music.file) return;
    if (!musicReady) {
      musicReady = true;

      // The button only appears once the song is genuinely playable. If the
      // file is missing or misnamed she sees nothing at all, instead of a
      // music button that does nothing when she taps it.
      audio.addEventListener("canplay", function () { musicBtn.hidden = false; });
      audio.addEventListener("error", function () {
        musicBtn.hidden = true;
        musicBtn.classList.remove("playing");
      });

      musicBtn.addEventListener("click", function () {
        if (audio.paused) {
          var p = audio.play();
          if (p && p.then) {
            p.then(function () { musicBtn.classList.add("playing"); }).catch(function () {});
          } else { musicBtn.classList.add("playing"); }
        } else {
          audio.pause();
          musicBtn.classList.remove("playing");
        }
      });

      audio.volume = baseVol;
      audio.src = "music/" + C.music.file;
    }
    var pr = audio.play();
    if (pr && pr.then) {
      pr.then(function () {
        musicBtn.hidden = false;
        musicBtn.classList.add("playing");
      }).catch(function () {
        // autoplay refused is fine — "canplay" will have surfaced the button
        // so she can start it herself with a single tap
        musicBtn.classList.remove("playing");
      });
    }
  }

  /* fade the song down while one of your videos is playing out loud */
  function duck(on) {
    if (!musicReady || audio.paused) return;
    var target = on ? baseVol * 0.15 : baseVol;
    var steps = 12, i = 0, from = audio.volume;
    var t = setInterval(function () {
      i++;
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * (i / steps)));
      if (i >= steps) clearInterval(t);
    }, 40);
  }


  /* ═══════════════════════════════════════════════════════════
     THE SECRET
     ═══════════════════════════════════════════════════════════ */
  var secret = $("#secret");
  $("#flower").addEventListener("click", function () {
    secret.classList.add("open");
    secret.setAttribute("aria-hidden", "false");
  });
  function closeSecret() {
    secret.classList.remove("open");
    secret.setAttribute("aria-hidden", "true");
  }
  $("#secretClose").addEventListener("click", closeSecret);
  secret.addEventListener("click", function (e) { if (e.target === secret) closeSecret(); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeSecret(); closeLight();
  });


  /* ═══════════════════════════════════════════════════════════
     WHEN SHE COMES BACK
     ═══════════════════════════════════════════════════════════ */
  (function returning() {
    var been = false;
    try { been = localStorage.getItem(SAID_YES_KEY) === "1"; } catch (e) {}
    if (!been) return;
    var card = $("#again");
    card.hidden = false;
    $("#againBtn").addEventListener("click", function () {
      card.hidden = true;
      answered = false;
      noStage = 0;
    });
  })();

})();
