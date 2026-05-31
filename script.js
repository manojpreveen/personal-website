/* =====================================================================
   Shared site behavior - loaded on every page
   ===================================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (initial theme applied pre-paint in <head>) ---------- */
  (function () {
    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    var icon = toggle.querySelector('.theme-toggle__icon');

    function apply(theme) {
      root.setAttribute('data-theme', theme);
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    apply(root.getAttribute('data-theme') || 'light');

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  })();

  /* ---------- Header: frosted background on scroll ---------- */
  (function () {
    var header = document.getElementById('site-header');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------- Mobile menu ---------- */
  (function () {
    var header = document.getElementById('site-header');
    var toggle = document.getElementById('nav-toggle');
    if (!header || !toggle) return;

    function close() {
      header.classList.remove('is-menu-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-menu-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 680) close();
    });
  })();

  /* ---------- Scroll-reveal ---------- */
  (function () {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ---------- Animated number counters ---------- */
  (function () {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = (String(target).split('.')[1] || '').length;

      if (prefersReduced) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }
      var duration = 1400, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(run);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { obs.observe(el); });
  })();

  /* ---------- GA4 custom event tracking ----------
     Enhanced Measurement (toggled on in the GA4 UI) already covers page_view,
     scroll depth, and outbound clicks. This layer adds labeled click events and
     per-section "read" events so you can see WHICH link was clicked and WHICH
     section a visitor actually reached. */
  (function () {
    if (typeof window.gtag !== 'function') return;

    var page = location.pathname.split('/').pop() || 'index.html';

    function track(name, params) {
      params = params || {};
      params.page = page;
      window.gtag('event', name, params);
    }

    /* 1. Click tracking on every link and button */
    document.querySelectorAll('a[href], button').forEach(function (el) {
      el.addEventListener('click', function () {
        var href = el.getAttribute('href') || '';
        var label = (el.getAttribute('aria-label') || el.textContent || href)
          .replace(/\s+/g, ' ').trim().slice(0, 100);

        var name = 'click';
        if (href.indexOf('mailto:') === 0) name = 'email_click';
        else if (/^https?:\/\//.test(href) && href.indexOf(location.hostname) === -1) name = 'outbound_click';
        else if (/\.html($|#|\?)/.test(href) || href === '/') name = 'nav_click';

        track(name, { link_label: label, link_url: href });
      });
    });

    /* 2. Section read tracking (fires once when 50% of a section is visible) */
    if (!('IntersectionObserver' in window)) return;

    function nameOf(sec) {
      if (sec.querySelector('.hero__title, .page-hero__title')) return 'Hero';
      if (sec.querySelector('.cta-band')) return 'CTA';
      var src = sec.querySelector('.eyebrow, .feature__kicker, .factcard__title, .section__title, .quote__by');
      return (src ? src.textContent : '').replace(/\s+/g, ' ').trim().slice(0, 60) || 'section';
    }

    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          track('section_view', { section: nameOf(entry.target) });
          secObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('main section').forEach(function (sec) { secObs.observe(sec); });
  })();
})();
