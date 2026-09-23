/* CSCI 4220 · brain rot mode — shared by every widget embedded in the Canvas course and by the course site.
 *
 * The cheat codes don't switch it on by themselves: they knock on a door (hidden-layer.js, loaded
 * from next to this file). Once that puzzle is solved the mode is unlocked for good, and from then
 * on the same codes turn it on and off. No spoilers here; the instructor's notes aren't in this repo.
 *
 * State lives in localStorage on this origin, so every widget embedded in the course
 * shares it, and a 'storage' event flips any other widget that's open at the same time.
 */
(function () {
  var KEY = "cs4220-brainrot", SOLVED = "cs4220-hl-solved";
  var KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright",
                "arrowleft", "arrowright", "b", "a"];
  var WORDS = ["brainrot", "skibidi"];
  var listeners = [], seq = [], typed = "", clicks = [];

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch (e) {} }
  function solved() { return get(SOLVED) === "1"; }
  var on = get(KEY) === "1" && solved();

  function apply(v, how) {
    on = v;
    document.documentElement.classList.toggle("brainrot", v);
    listeners.forEach(function (f) { f(v, how); });
  }
  function set(v, how) { write(v); apply(v, how); }
  function toggle(how) { set(!on, how); }
  // A cheat code toggles the mode once the puzzle is solved; before that it knocks on the door.
  function code(how) {
    if (solved()) toggle(how);
    else if (window.HiddenLayer) window.HiddenLayer.door(how);
  }

  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    seq.push(k); if (seq.length > KONAMI.length) seq.shift();
    if (seq.length === KONAMI.length && KONAMI.every(function (x, i) { return seq[i] === x; })) {
      seq = []; code("konami"); return;
    }
    if (k.length === 1) {
      typed = (typed + k).slice(-12);
      if (WORDS.some(function (w) { return typed.slice(-w.length) === w; })) { typed = ""; code("typed"); }
    }
  });

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue === "1" && solved(), "sync");
  });

  function tapTarget(el) {            // five quick clicks anywhere on `el`
    el.addEventListener("click", function () {
      var now = Date.now();
      clicks = clicks.filter(function (t) { return now - t < 1600; }); clicks.push(now);
      if (clicks.length >= 5) { clicks = []; code("tap"); }
    });
  }

  document.documentElement.classList.toggle("brainrot", on);
  window.BrainRot = {
    get on() { return on; }, get solved() { return solved(); },
    toggle: toggle, set: set, tapTarget: tapTarget,
    onChange: function (f) { listeners.push(f); },
    unlock: function () { try { localStorage.setItem(SOLVED, "1"); } catch (e) {} }
  };

  var me = document.currentScript && document.currentScript.src;
  if (me) {
    var s = document.createElement("script");
    s.src = me.replace(/brainrot\.js(\?.*)?$/, "hidden-layer.js"); s.async = true;
    document.head.appendChild(s);
  }
})();
