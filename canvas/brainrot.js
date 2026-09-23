/* CSCI 4220 · brain rot mode — shared by every widget embedded in the Canvas course.
 *
 * Cheat codes (the widget must have focus — click it first):
 *   ↑ ↑ ↓ ↓ ← → ← → B A      the classic
 *   type  brainrot  or  skibidi
 *   click the course title 5 times fast   (works on phones)
 * Same code again turns it off.
 *
 * State lives in localStorage on this origin, so every widget embedded in the course
 * shares it, and a 'storage' event flips any other widget that's open at the same time.
 */
(function () {
  var KEY = "cs4220-brainrot";
  var KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright",
                "arrowleft", "arrowright", "b", "a"];
  var WORDS = ["brainrot", "skibidi"];
  var listeners = [], seq = [], typed = "", clicks = [];

  function read() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  function write(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {} }
  var on = read();

  function apply(v, how) {
    on = v;
    document.documentElement.classList.toggle("brainrot", v);
    listeners.forEach(function (f) { f(v, how); });
  }
  function set(v, how) { write(v); apply(v, how); }
  function toggle(how) { set(!on, how); }

  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    seq.push(k); if (seq.length > KONAMI.length) seq.shift();
    if (seq.length === KONAMI.length && KONAMI.every(function (x, i) { return seq[i] === x; })) {
      seq = []; toggle("konami"); return;
    }
    if (k.length === 1) {
      typed = (typed + k).slice(-12);
      if (WORDS.some(function (w) { return typed.slice(-w.length) === w; })) { typed = ""; toggle("typed"); }
    }
  });

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue === "1", "sync");
  });

  function tapTarget(el) {            // five quick clicks anywhere on `el` toggles it
    el.addEventListener("click", function () {
      var now = Date.now();
      clicks = clicks.filter(function (t) { return now - t < 1600; }); clicks.push(now);
      if (clicks.length >= 5) { clicks = []; toggle("tap"); }
    });
  }

  document.documentElement.classList.toggle("brainrot", on);
  window.BrainRot = {
    get on() { return on; }, toggle: toggle, set: set, tapTarget: tapTarget,
    onChange: function (f) { listeners.push(f); }
  };
})();
