/* CSCI 4220 · the hidden layer. Loaded by brainrot.js on every widget and every course-site page.
 *
 * A cheat code opens a small terminal with a locked network. Solving it unlocks brain rot mode for
 * good and mints a one-per-browser extra credit code (checked by tools/canvas/grade_hidden_layer.py,
 * which is not in this repo). Nothing typed here ever leaves the browser.
 */
(function () {
  if (window.HiddenLayer || !window.BrainRot) return;
  var DOOR = "cs4220-hl-door", CODE = "cs4220-hl-code", SAVED = "cs4220-hl-saved";
  var ANSWER = "cd70bea023f752a0564abb6ed08d42c1440f2e33e29914e55e0be1595e24f45a";
  var SALT = "cs4220/hidden-layer/fa26/", ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var W2 = String.fromCharCode(8722) + (2 + 2), W3 = 1 << 3;
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mini = innerHeight < 180, tries = 0, box = null, sawW2 = false;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  try {
    console.log("%c CSCI 4220 %c hidden layer detected ",
      "background:#4a3aa7;color:#fff;font:700 12px monospace;padding:3px 6px;border-radius:4px 0 0 4px",
      "background:#15123a;color:#b6ff00;font:700 12px monospace;padding:3px 6px;border-radius:0 4px 4px 0");
    console.log("w₃ = " + W3);
    console.log("(the door: some inputs are older than you.  ↑ ↑ ↓ ↓ …)");
  } catch (e) {}

  var css = [
    ".hl-term { position: fixed; z-index: 10000; left: 50%; top: 50%; transform: translate(-50%, -50%);",
    "  width: min(580px, calc(100% - 16px)); max-height: calc(100% - 16px); overflow: auto; box-sizing: border-box;",
    "  background: #0a0c1c; color: #b6ff00; border: 1px solid #2c2f5a; border-radius: 12px; text-align: left;",
    "  box-shadow: 0 20px 60px rgba(0,0,0,.6); font: 12.5px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }",
    ".hl-term.hl-top { top: 8px; transform: translateX(-50%); }",
    ".hl-term.hl-term * { box-sizing: border-box; font-family: inherit !important; letter-spacing: 0 !important; }",
    ".hl-bar { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: #15183a; color: #8e8ab8; font-size: 11px; }",
    ".hl-dot { width: 9px; height: 9px; border-radius: 50%; }",
    ".hl-term button { all: unset; cursor: pointer; font: inherit; }",
    ".hl-x { margin-left: auto; width: 20px; text-align: center; color: #c9c6f2; }",
    ".hl-body { padding: 8px 14px 12px; }",
    ".hl-body p { margin: 0; padding: 0; white-space: pre-wrap; color: inherit; font-size: 12.5px; line-height: 1.4; }",
    ".hl-body p.eq { color: #fff; padding-left: 2ch; }",
    ".hl-body p.say { color: #7de2ff; }",
    ".hl-row { display: flex; align-items: center; gap: 8px; margin-top: 6px; flex-wrap: wrap; }",
    ".hl-term input { width: 130px; margin: 0; background: #15183a; color: #fff; border: 1px solid #4a3aa7; border-radius: 6px;",
    "  padding: 5px 8px; font: 13px/1.2 ui-monospace, Menlo, monospace; outline: none; }",
    ".hl-term input:focus { border-color: #b6ff00; }",
    ".hl-term input.hl-code { width: 200px; font-size: 18px; font-weight: 700; letter-spacing: .06em !important; text-align: center; }",
    ".hl-btn { padding: 5px 10px !important; border-radius: 6px; background: #4a3aa7; color: #fff !important; }",
    ".hl-btn.go { background: #b6ff00; color: #0a0c1c !important; font-weight: 700; }"
  ].join("\n");
  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);

  function el(tag, cls, text, parent) {
    var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e); return e;
  }
  function close() { if (box) { box.remove(); box = null; } }
  function frame(title, top) {
    close();
    box = el("div", "hl-term" + (top ? " hl-top" : ""), null, document.body);
    box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Hidden layer");
    var bar = el("div", "hl-bar", null, box);
    ["#ff5f57", "#febc2e", "#28c840"].forEach(function (c) { el("span", "hl-dot", null, bar).style.background = c; });
    el("span", null, title, bar);
    var x = el("button", "hl-x", "✕", bar); x.setAttribute("aria-label", "Close");
    x.addEventListener("click", function () { close(); if (BrainRot.solved && !BrainRot.on) BrainRot.set(true, "solved"); });
    return el("div", "hl-body", null, box);
  }
  function lines(body, list, then) {     // types the lines out, one at a time
    var i = 0;
    (function next() {
      if (!box) return;
      if (i >= list.length) { if (then) then(); return; }
      var l = list[i++]; el("p", l[0], l[1], body);
      if (calm) next(); else setTimeout(next, 70);
    })();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box) close(); });

  function sha(s) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (b) {
      return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    });
  }
  function mint() {
    var r = crypto.getRandomValues(new Uint8Array(5)), n = "";
    for (var i = 0; i < 5; i++) n += ALPHA[r[i] % ALPHA.length];
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(SALT + n)).then(function (b) {
      var u = new Uint8Array(b), c = "";
      for (var i = 0; i < 4; i++) c += ALPHA[u[i] % ALPHA.length];
      return "HL-" + n + "-" + c;
    });
  }

  // ── the door ─────────────────────────────────────────────────────────────────
  function door() {
    put(DOOR, "1");
    if (mini) {
      var b = frame("hidden_layer", true);
      el("p", null, "> hidden layer detected 🔒 this door is too small. try the course Home page.", b);
      return;
    }
    var body = frame("hidden_layer.py");
    lines(body, [
      [null, "> HIDDEN LAYER DETECTED 🔒 this network is missing three weights."],
      ["eq", "h₁ = ReLU(w₁·x + w₂)"],
      ["eq", "h₂ = ReLU(w₂·x − w₁)"],
      ["eq", "y  = w₃·h₁ + 5·h₂ + 1          x = 5"],
      [null, "> w₁ — at the end of the thing nobody reads"],
      [null, "> w₂ — where words are defined. ask what's between input and output"],
      [null, "> w₃ — where developers look"]
    ], function () {
      var row = el("div", "hl-row", null, body);
      el("span", null, "> run the network.  y =", row);
      var input = el("input", null, null, row); input.setAttribute("aria-label", "y"); input.inputMode = "decimal";
      var go = el("button", "hl-btn go", "run ⏎", row);
      var out = el("p", "say", "", body);
      function run() { check(input.value, out); }
      go.addEventListener("click", run);
      input.addEventListener("keydown", function (e) {      // keep answer keystrokes away from the cheat-code listener
        e.stopPropagation(); if (e.key === "Enter") run(); if (e.key === "Escape") close();
      });
      input.focus();
    });
  }

  function check(raw, out) {
    var s = String(raw).trim().replace(/^y\s*=\s*/i, "").replace(/−/g, "-"), n = Number(s);
    if (s === "" || isNaN(n)) { out.textContent = "> that's not a number. this network only speaks floats."; return; }
    sha(String(n)).then(function (h) {
      if (h === ANSWER) return solved();
      tries++;
      out.textContent = n === -26
        ? "> y = −26? something negative leaked through. what does ReLU do to negatives?"
        : "> loss is still high (attempt " + tries + "). check your weights.";
    });
  }

  function solved() {
    BrainRot.unlock();
    var c = get(CODE);
    (c ? Promise.resolve(c) : mint().then(function (m) { put(CODE, m); return m; })).then(certificate);
  }
  function certificate(code) {
    var body = frame("hidden_layer.py");
    lines(body, [
      [null, "> loss = 0.000 · model converged ✓"],
      ["eq", "HIDDEN LAYER UNLOCKED 🧠"],
      [null, "> brain rot mode is yours now. the same code turns it on and off."],
      [null, "> your extra credit code:"]
    ], function () {
      var row = el("div", "hl-row", null, body);
      var field = el("input", "hl-code", null, row); field.readOnly = true; field.value = code;
      field.setAttribute("aria-label", "Your extra credit code");
      field.addEventListener("focus", function () { field.select(); });
      var copy = el("button", "hl-btn", "copy", row);
      copy.addEventListener("click", function () {
        field.select();
        var done = function () { copy.textContent = "copied ✓"; };
        if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, function () { copy.textContent = "press ⌘C / Ctrl+C"; });
        else copy.textContent = "press ⌘C / Ctrl+C";
      });
      lines(body, [
        [null, "> paste it into “Extra Credit: The Hidden Layer” on Canvas."],
        [null, "> one code per person. shared codes get flagged 👀"]
      ], function () {
        var row2 = el("div", "hl-row", null, body);
        var ok = el("button", "hl-btn go", "saved it → enter brain rot", row2);
        ok.addEventListener("click", function () { put(SAVED, "1"); close(); BrainRot.set(true, "solved"); });
      });
    });
  }

  // Until they say they've saved the code, it comes back each time the mode is switched on.
  BrainRot.onChange(function (on, how) {
    if (on && how !== "sync" && how !== "solved" && get(CODE) && get(SAVED) !== "1") certificate(get(CODE));
  });

  // w₂: the glossary gives it up, but only after the door has been opened.
  if (/glossary\.html$/.test(location.pathname)) {
    document.addEventListener("input", function (e) {
      if (sawW2 || get(DOOR) !== "1" || BrainRot.solved) return;
      if (/hidden/i.test((e.target && e.target.value) || "")) {
        sawW2 = true;
        var b = frame("hidden_layer", true);
        el("p", null, "> found one 🔍  w₂ = " + W2, b);
      }
    });
  }

  window.HiddenLayer = { door: door };
})();
