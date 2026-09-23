/* CSCI 4220 · brain rot mode for the course website.
 *
 * Needs canvas/brainrot.js loaded first (same cheat codes, same engine). Off by default and
 * invisible until someone finds a code. Everything here is undone the moment it's turned off:
 * styles are scoped to html.brainrot, renamed text is restored, every timer and node is removed.
 *
 * Movement respects prefers-reduced-motion: those readers get the fonts, colours and renamed
 * headings, but nothing moves. Nothing flashes faster than about once a second (WCAG 2.3.1).
 */
(function () {
  if (!window.BrainRot) return;
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

  // For whoever opens the console. Curiosity gets a clue.
  try {
    console.log("%c CSCI 4220 %c hidden layer detected ",
      "background:#4a3aa7;color:#fff;font:700 12px monospace;padding:3px 6px;border-radius:4px 0 0 4px",
      "background:#15123a;color:#b6ff00;font:700 12px monospace;padding:3px 6px;border-radius:0 4px 4px 0");
    console.log("Some inputs are older than you.  ↑ ↑ ↓ ↓ … you know the rest.");
  } catch (e) {}

  // ── styles ───────────────────────────────────────────────────────────────────
  var COMIC = '"Comic Sans MS", "Comic Neue", "Chalkboard SE", cursive';
  var IMPACT = 'Impact, "Arial Black", "Helvetica Neue", sans-serif';
  var css = [
    "html.brainrot body, html.brainrot p, html.brainrot li, html.brainrot td, html.brainrot th, html.brainrot a,",
    "html.brainrot button, html.brainrot label, html.brainrot small, html.brainrot h3, html.brainrot h4,",
    "html.brainrot .eyebrow { font-family: " + COMIC + " !important; }",
    "html.brainrot h1, html.brainrot h2, html.brainrot h1 *, html.brainrot h2 * { font-family: " + IMPACT + " !important;",
    "  letter-spacing: .01em !important; font-style: normal !important; }",
    "html.brainrot h1, html.brainrot h2 { display: inline-block; background: linear-gradient(90deg,#ff2fd0,#ffb000,#00c2ff,#1faa00,#ff2fd0);",
    "  background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent !important; }",
    "html.brainrot h1 *, html.brainrot h2 * { color: transparent !important; background: none !important; -webkit-text-fill-color: transparent; }",
    "html.brainrot h3 { color: #d4008f !important; }",
    ".br-frame { position: fixed; inset: 0; z-index: 9990; pointer-events: none;",
    "  box-shadow: inset 0 0 0 6px #ff2fd0, inset 0 0 34px 6px rgba(255,47,208,.45); }",
    ".br-aura { position: fixed; right: 16px; top: 72px; z-index: 9995; padding: 8px 14px; border-radius: 999px;",
    "  font: 900 15px/1 " + IMPACT + "; letter-spacing: .04em; color: #fff; background: #15002b;",
    "  border: 2px solid #b6ff00; box-shadow: 0 4px 18px rgba(0,0,0,.35); pointer-events: none; }",
    ".br-toast { position: fixed; left: 50%; top: 18px; z-index: 9999; transform: translateX(-50%); padding: 10px 18px;",
    "  border-radius: 999px; font: 700 14px/1.2 system-ui, sans-serif; background: #fff; color: #140c33;",
    "  box-shadow: 0 8px 30px rgba(0,0,0,.3); pointer-events: none; }",
    ".br-pop, .br-fly, .br-trail, .br-plus, .br-67 { position: fixed; z-index: 9996; pointer-events: none; white-space: nowrap; }",
    ".br-pop { font: 900 40px/1 " + IMPACT + "; color: #fff; -webkit-text-stroke: 2px #000; text-shadow: 3px 3px 0 #000; }",
    ".br-plus { font: 900 20px/1 " + IMPACT + "; color: #b6ff00; -webkit-text-stroke: 1px #000; }",
    ".br-trail { font-size: 20px; }",
    ".br-67 { left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; gap: 4vw;",
    "  font: 900 30vh/1 " + IMPACT + "; color: #ffe600; -webkit-text-stroke: 4px #000; text-shadow: 8px 8px 0 #000; }",
    ".br-game { position: fixed; right: 16px; bottom: 16px; z-index: 9994; width: 180px; padding: 8px; border-radius: 14px;",
    "  background: #15002b; border: 2px solid #ff2fd0; box-shadow: 0 10px 40px rgba(0,0,0,.45); color: #fff;",
    "  font: 800 11px/1.2 system-ui, sans-serif; }",
    ".br-game header { display: flex; align-items: center; gap: 6px; margin: 0 0 6px; }",
    ".br-game header span { flex: 1; letter-spacing: .04em; }",
    ".br-game button { all: unset; cursor: pointer; width: 20px; height: 20px; border-radius: 50%; text-align: center;",
    "  line-height: 20px; background: #ff2fd0; color: #fff; font: 900 12px/20px system-ui, sans-serif; }",
    ".br-game canvas { display: block; width: 180px; height: 270px; border-radius: 8px; }",
    "@media (max-width: 760px) { .br-game { display: none; } }",
    "@media (prefers-reduced-motion: no-preference) {",
    "  html.brainrot h1, html.brainrot h2 { transform-origin: 30% 60%; animation: br-rainbow 2.4s linear infinite, br-wobble 1.3s ease-in-out infinite; }",
    "  @keyframes br-rainbow { to { background-position: 300% 0; } }",
    "  @keyframes br-wobble { 0%,100% { transform: rotate(-2deg) scale(1); } 50% { transform: rotate(2deg) scale(1.04); } }",
    "  html.brainrot [class*='card']:not([class*='cards']):not([class*='grid']) { animation: br-float 2.6s ease-in-out infinite alternate; }",
    "  html.brainrot [class*='card']:nth-child(even):not([class*='cards']):not([class*='grid']) { animation-delay: -1.3s; }",
    "  @keyframes br-float { from { transform: translateY(-3px) rotate(-.8deg); } to { transform: translateY(3px) rotate(.8deg); } }",
    "  html.brainrot img { animation: br-hue 5s linear infinite; }",
    "  html.brainrot img[src*='professor'] { animation: br-hue 5s linear infinite, br-spin 6s linear infinite; }",
    "  @keyframes br-hue { to { filter: hue-rotate(360deg) saturate(1.6); } }",
    "  @keyframes br-spin { to { transform: rotate(360deg); } }",
    "  .br-frame { animation: br-hue 3s linear infinite; }",
    "  html.br-shake body { animation: br-shake .5s cubic-bezier(.36,.07,.19,.97) both; }",
    "  @keyframes br-shake { 20%,80% { transform: translate(3px,-1px) rotate(.3deg); } 40%,60% { transform: translate(-5px,2px) rotate(-.4deg); } }",
    "  .br-pop { animation: br-pop 1.5s cubic-bezier(.2,1.6,.4,1) forwards; }",
    "  @keyframes br-pop { 0% { transform: translate(-50%,-50%) scale(.2) rotate(var(--r)); opacity: 0; }",
    "    22% { transform: translate(-50%,-50%) scale(1.3) rotate(var(--r)); opacity: 1; }",
    "    70% { transform: translate(-50%,-50%) scale(1) rotate(var(--r)); opacity: 1; }",
    "    100% { transform: translate(-50%,-80%) scale(1.5) rotate(var(--r)); opacity: 0; } }",
    "  .br-fly { left: 0; font-size: 34px; animation: br-fly linear forwards; }",
    "  @keyframes br-fly { from { transform: translateX(-60px) rotate(0); } to { transform: translateX(var(--w)) rotate(900deg); } }",
    "  .br-trail { animation: br-trail .8s ease-out forwards; }",
    "  @keyframes br-trail { to { transform: translate(-50%, 30px) scale(.3) rotate(160deg); opacity: 0; } }",
    "  .br-plus { animation: br-plus 1s ease-out forwards; }",
    "  @keyframes br-plus { to { transform: translate(-50%, -60px) scale(1.4); opacity: 0; } }",
    "  .br-67 span { display: inline-block; animation: br-seesaw .45s ease-in-out infinite alternate; }",
    "  .br-67 span + span { animation-delay: -.45s; }",
    "  @keyframes br-seesaw { from { transform: translateY(-8vh) rotate(-6deg); } to { transform: translateY(8vh) rotate(6deg); } }",
    "}"
  ].join("\n");
  var style = document.createElement("style"); style.id = "br-site-css"; style.textContent = css;
  document.head.appendChild(style);

  // ── renaming: only labels (nav, headings, badges), never the paragraphs you actually read ──
  var RENAME = [
    [/Where this goes/g, "The lore so far"], [/Meet your instructor/g, "Meet the main character"],
    [/The toolkit/g, "The inventory"], [/A semester of research/g, "A semester of deep lore"],
    [/Every deck, in the order we teach it/g, "Every deck of lore, in canon order"],
    [/This site explains\. Canvas runs the course\./g, "This site yaps. Canvas runs the course."],
    [/Derive it/g, "Derive it (math arc)"], [/Build it/g, "Build it (code arc)"],
    [/Lecture slides/gi, "The lore"], [/Final [Pp]roject/g, "Final Boss"],
    [/\bDeep Learning\b/g, "Deep Brainrot"], [/\bCourse Calendar\b/g, "The Timeline"], [/\bCalendar\b/g, "Timeline"],
    [/\bAssignments\b/g, "Side Quests"], [/\bAssignment\b/g, "Side Quest"],
    [/\bassignments\b/g, "side quests"], [/\bassignment\b/g, "side quest"],
    [/\bProjects\b/g, "Boss Fights"], [/\bProject\b/g, "Boss Fight"],
    [/\bSyllabus\b/g, "Lore Book"], [/\bSlides\b/g, "Lore"], [/\bHome\b/g, "Spawn Point"],
    [/\bInstructor\b/g, "Main Character"], [/\bMidterm\b/g, "Mid-Boss"], [/\bProposal\b/g, "Pitch"],
    [/\bPresentations?\b/g, "Yap Session"], [/\bResearch\b/g, "Deep Lore"],
    [/\bOffice hours\b/gi, "Rizz hours"], [/\bDue\b/g, "Cooked by"], [/\bdue\b/g, "cooked by"],
    [/^Arc$/, "Lore"], [/^Work$/, "Grind"], [/\bWeek\b/g, "Grind week"], [/\bCanvas\b/g, "Canvas 💀"]
  ];
  var LABELS = "nav a, h1, h2, h3, .eyebrow, .section-title, .nav-link, .nav-logo, .topbar__mark, button, th," +
               "[class*='badge'], [class*='due'], [class*='title']";
  var owned = new Map();                       // text node → its original text
  function translate(t) { RENAME.forEach(function (r) { t = t.replace(r[0], r[1]); }); return t; }
  function rename() {
    document.querySelectorAll(LABELS).forEach(function (el) {
      if (el.closest(".br-game, script, style")) return;
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) {
        var orig = owned.has(n) ? owned.get(n) : n.nodeValue;
        if (owned.has(n) && n.nodeValue !== translate(orig)) orig = n.nodeValue;   // the page changed it since
        var out = translate(orig);
        if (out !== orig) { owned.set(n, orig); if (n.nodeValue !== out) n.nodeValue = out; }
      }
    });
  }
  function unrename() {
    owned.forEach(function (orig, n) { if (n.nodeValue === translate(orig)) n.nodeValue = orig; });
    owned.clear();
  }

  // ── pieces that only exist while it's on ─────────────────────────────────────
  var AURA_KEY = "cs4220-aura", aura = 0;
  try { aura = parseInt(localStorage.getItem(AURA_KEY), 10) || 0; } catch (e) {}
  var nodes = [], timers = [], listeners = [], auraEl = null, game = null, baseTitle = document.title;
  function el(tag, cls, text, parent) {
    var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text;
    (parent || document.body).appendChild(e); return e;
  }
  function temp(cls, text, css, life) {
    var e = el("span", cls, text); for (var k in css) e.style.setProperty(k, css[k]);
    setTimeout(function () { e.remove(); }, life); return e;
  }
  function gain(n, x, y) {
    aura += n; try { localStorage.setItem(AURA_KEY, String(aura)); } catch (e) {}
    if (auraEl) auraEl.textContent = "AURA " + aura.toLocaleString();
    if (x != null && !calm) temp("br-plus", (n > 0 ? "+" : "") + n + " AURA", { left: x + "px", top: y + "px" }, 1000);
  }
  function toast(msg) { temp("br-toast", msg, {}, 2600); }
  function listen(target, type, f, opt) { target.addEventListener(type, f, opt); listeners.push([target, type, f, opt]); }
  function every(ms, f) { timers.push(setInterval(f, ms)); }

  var WORDS = ["NO CAP", "FR FR", "LOCK IN", "+1000 AURA", "SIGMA", "RIZZ", "W", "COOKED", "BUSSIN", "NPC DETECTED",
               "MAIN CHARACTER", "SIDE QUEST", "IT'S GIVING GRADIENT", "BACKPROP BESTIE", "OVERFIT ARC", "TOUCH GRASS",
               "6 7", "LORE DROP", "GRINDSET"];
  var EMO = ["🧠", "💀", "🔥", "🗿", "✨", "🥶", "💅", "🍟", "😭", "🤯", "📉", "📈"];
  var TITLES = ["🧠 brain rot mode", "📚 lock in", "💀 you're cooked", "🔥 +1000 aura", "🗿 sigma study session"];

  var active = false;
  function turnOn(loud) {
    if (active) return; active = true;
    rename(); setTimeout(rename, 1200);                 // the assignments page draws its cards after a fetch
    nodes.push(el("div", "br-frame"));
    auraEl = el("div", "br-aura"); nodes.push(auraEl); gain(loud ? 1000 : 0);
    if (loud) toast("🧠 BRAIN ROT MODE · the whole site is cooked now · same code to undo");
    if (calm) { document.title = "🧠 " + baseTitle; return; }

    every(2000, rename);
    every(1800, function () {
      temp("br-pop", pick(WORDS), { left: (10 + Math.random() * 80) + "vw", top: (18 + Math.random() * 70) + "vh",
           "--r": (Math.random() * 30 - 15) + "deg", color: pick(["#fff", "#ffe600", "#b6ff00", "#00e5ff"]) }, 1500);
    });
    every(900, function () {
      var d = 3 + Math.random() * 3;
      temp("br-fly", pick(EMO), { top: (Math.random() * 90) + "vh", "--w": (innerWidth + 120) + "px",
           "animation-duration": d + "s", "font-size": (24 + Math.random() * 30) + "px" }, d * 1000);
    });
    every(11000, function () {
      document.documentElement.classList.add("br-shake");
      setTimeout(function () { document.documentElement.classList.remove("br-shake"); }, 550);
    });
    var ti = 0;
    every(1500, function () { document.title = ti % (TITLES.length + 1) === TITLES.length ? baseTitle : TITLES[ti % (TITLES.length + 1)]; ti++; });

    var last = 0;
    listen(document, "mousemove", function (e) {
      var now = Date.now(); if (now - last < 55) return; last = now;
      temp("br-trail", pick(EMO), { left: e.clientX + "px", top: e.clientY + "px" }, 800);
    });
    listen(document, "click", function (e) { gain(67, e.clientX, e.clientY); }, true);

    var digits = "";                                    // type 6 then 7
    listen(document, "keydown", function (e) {
      digits = (digits + (e.key || "")).slice(-2);
      if (digits !== "67") return;
      digits = ""; gain(67);
      var s = el("div", "br-67"); s.innerHTML = "<span>6</span><span>7</span>";
      setTimeout(function () { s.remove(); }, 1800);
    });

    var closed = false; try { closed = sessionStorage.getItem("br-game-closed") === "1"; } catch (e) {}
    if (!closed && innerWidth > 760) startGame();
  }
  function turnOff(loud) {
    if (!active) return; active = false;
    timers.forEach(clearInterval); timers = [];
    listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); }); listeners = [];
    nodes.forEach(function (n) { n.remove(); }); nodes = []; auraEl = null;
    stopGame();
    document.querySelectorAll(".br-pop, .br-fly, .br-trail, .br-plus, .br-67").forEach(function (n) { n.remove(); });
    document.documentElement.classList.remove("br-shake");
    document.title = baseTitle;
    unrename();
    if (loud) toast("touched grass. welcome back.");
  }

  // ── the split-screen gameplay, for attention spans in need of support ────────
  function startGame() {
    var box = el("div", "br-game"); nodes.push(box);
    var head = el("header", null, null, box); el("span", null, "attention span life support", head);
    var x = el("button", null, "✕", head); x.setAttribute("aria-label", "Close the game");
    var cv = el("canvas", null, null, box), dpr = window.devicePixelRatio || 1, W = 180, H = 270;
    cv.width = W * dpr; cv.height = H * dpr; var ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
    x.addEventListener("click", function (e) { e.stopPropagation(); try { sessionStorage.setItem("br-game-closed", "1"); } catch (err) {} stopGame(); });

    var LANE = [W / 6, W / 2, 5 * W / 6], PY = H - 44, speed = 170;         // px per second
    var trains = [], coins = [], lane = 1, px = LANE[1], coinsGot = 0, dash = 0, t = 0, spawnT = 0, coinT = .6, bonk = 0;
    var COLORS = ["#ff2fd0", "#00c2ff", "#b6ff00", "#ffb000"];
    function blocked(l, y0, y1) { return trains.some(function (tr) { return tr.l === l && tr.y + tr.h > y0 && tr.y < y1; }); }
    function spawn() {
      var l = Math.floor(Math.random() * 3), h = 60 + Math.random() * 70;
      var others = [0, 1, 2].filter(function (k) { return k !== l && blocked(k, -h - 90, 90); });
      if (others.length >= 2) return;                                     // always leave a way through
      trains.push({ l: l, y: -h, h: h, c: pick(COLORS) });
    }
    function think() {
      var danger = blocked(lane, PY - 150, PY + 20);
      if (danger) {
        var free = [lane - 1, lane + 1].filter(function (k) { return k >= 0 && k <= 2 && !blocked(k, PY - 170, PY + 30); });
        if (free.length) lane = pick(free);
      } else {
        var c = coins.filter(function (c) { return c.y > PY - 160 && c.y < PY - 40; })[0];
        if (c && Math.abs(c.l - lane) === 1 && !blocked(c.l, PY - 170, PY + 30)) lane = c.l;
      }
    }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    var prev = performance.now();
    function frame(now) {
      var dt = Math.min(.05, (now - prev) / 1000); prev = now; t += dt;
      speed = Math.min(320, 170 + t * 4);
      spawnT -= dt; if (spawnT <= 0) { spawn(); spawnT = .45 + Math.random() * .6; }
      coinT -= dt; if (coinT <= 0) { var cl = Math.floor(Math.random() * 3);
        for (var k = 0; k < 4; k++) if (!blocked(cl, -30 - k * 26, -k * 26)) coins.push({ l: cl, y: -k * 26 - 10 }); coinT = 1 + Math.random(); }
      trains.forEach(function (tr) { tr.y += speed * dt; }); coins.forEach(function (c) { c.y += speed * dt; });
      trains = trains.filter(function (tr) { return tr.y < H + 10; });
      think(); px += (LANE[lane] - px) * Math.min(1, dt * 14);
      coins = coins.filter(function (c) {
        if (c.y > H + 10) return false;
        if (Math.abs(LANE[c.l] - px) < 20 && Math.abs(c.y - PY) < 20) { coinsGot++; return false; }
        return true;
      });
      if (trains.some(function (tr) { return Math.abs(LANE[tr.l] - px) < 20 && tr.y + tr.h > PY - 10 && tr.y < PY + 10; })) {
        trains = []; bonk = 1; coinsGot = 0;
      }
      bonk = Math.max(0, bonk - dt * 1.5);
      // draw
      ctx.fillStyle = "#1a1030"; ctx.fillRect(0, 0, W, H);
      dash = (dash + speed * dt) % 24;
      ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 2; ctx.setLineDash([12, 12]); ctx.lineDashOffset = -dash;
      [W / 3, 2 * W / 3].forEach(function (lx) { ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, H); ctx.stroke(); });
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.lineWidth = 3;
      LANE.forEach(function (lx) { [-9, 9].forEach(function (o) { ctx.beginPath(); ctx.moveTo(lx + o, 0); ctx.lineTo(lx + o, H); ctx.stroke(); }); });
      coins.forEach(function (c) { ctx.fillStyle = "#ffd400"; ctx.beginPath(); ctx.arc(LANE[c.l], c.y, 6, 0, 6.283); ctx.fill(); });
      trains.forEach(function (tr) {
        var lx = LANE[tr.l] - 22; ctx.fillStyle = tr.c; rr(lx, tr.y, 44, tr.h, 7); ctx.fill();
        ctx.fillStyle = "rgba(20,10,50,.55)"; for (var wy = tr.y + 10; wy < tr.y + tr.h - 12; wy += 18) { rr(lx + 7, wy, 30, 9, 3); ctx.fill(); }
      });
      ctx.font = "26px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(bonk > 0 ? "💥" : "🏃", px, PY + Math.sin(t * 18) * 2);
      ctx.font = "900 14px Impact, 'Arial Black', sans-serif"; ctx.textAlign = "left"; ctx.fillStyle = "#fff";
      ctx.fillText("🪙 " + coinsGot, 8, 16);
      if (bonk > 0) { ctx.fillStyle = "rgba(255,47,208," + bonk * .35 + ")"; ctx.fillRect(0, 0, W, H); }
      game.raf = requestAnimationFrame(frame);
    }
    game = { box: box, raf: requestAnimationFrame(frame) };
  }
  function stopGame() { if (!game) return; cancelAnimationFrame(game.raf); game.box.remove(); game = null; }

  BrainRot.onChange(function (on, how) { if (on) turnOn(how !== "sync"); else turnOff(how !== "sync"); });
  // the page title is ticklish: five quick taps (the nav logo is a link on most pages, so it can't be the target)
  document.querySelectorAll(".topbar__mark, h1").forEach(function (m) { BrainRot.tapTarget(m); });
  if (BrainRot.on) turnOn(false);
})();
