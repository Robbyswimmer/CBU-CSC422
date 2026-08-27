/* CSC 422 — interaction only.
 *
 * All course content is rendered by Jekyll at build time. This file exists
 * purely for UI behaviour, so there is no data fetching and nothing here can
 * leave the page in a broken/loading state.
 */
(function () {
  'use strict';

  // --- Mobile navigation -------------------------------------------------
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close after following a link on small screens.
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Collapsible phase cards on the home page --------------------------
  document.querySelectorAll('[data-toggle="phase"]').forEach(function (header) {
    header.addEventListener('click', function () {
      var card = header.closest('.phase-card');
      if (!card) return;
      var open = card.classList.toggle('is-open');
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // --- Relative countdowns ----------------------------------------------
  // Dates and titles are already in the HTML from Jekyll. The only thing that
  // cannot be baked in at build time is "how far away is this from *now*",
  // so that alone is computed here.
  var MS_PER_DAY = 24 * 60 * 60 * 1000;

  function daysUntil(iso) {
    var target = new Date(iso + 'T00:00:00');
    if (isNaN(target)) return null;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((target - today) / MS_PER_DAY);
  }

  function phrase(d) {
    if (d === 0) return 'today';
    if (d === 1) return 'tomorrow';
    if (d > 0) return 'in ' + d + ' days';
    if (d === -1) return 'yesterday';
    return Math.abs(d) + ' days ago';
  }

  document.querySelectorAll('[data-date]').forEach(function (el) {
    var d = daysUntil(el.getAttribute('data-date'));
    if (d === null) return;

    el.classList.add(d < 0 ? 'is-past' : d <= 7 ? 'is-due-soon' : 'is-upcoming');

    var slot = el.querySelector('.countdown');
    if (slot) {
      slot.textContent = ' (' + phrase(d) + ')';
      slot.hidden = false;
    }
  });
})();
