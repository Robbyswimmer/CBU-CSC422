/* CSC 422 — interaction only.
 *
 * All course content is rendered by Jekyll at build time, so nothing here
 * fetches data and no failure can leave the page empty or stuck loading.
 */
(function () {
  'use strict';

  // --- Mobile navigation -------------------------------------------------
  var navToggle = document.getElementById('mobile-nav-toggle');
  var navMenu = document.getElementById('mobile-nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Reveal on scroll ---------------------------------------------------
  // The opacity:0 start state is scoped to `.js` in CSS, so if this script
  // never runs the content is simply visible rather than invisible.
  var revealable = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealable.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver: show everything immediately.
    revealable.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Relative countdowns ------------------------------------------------
  // Dates and titles are already in the HTML. The only thing that cannot be
  // baked in at build time is distance from *now*, so that alone is computed.
  var MS_PER_DAY = 24 * 60 * 60 * 1000;

  function daysUntil(iso) {
    var target = new Date(iso + 'T00:00:00');
    if (isNaN(target.getTime())) return null;
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
