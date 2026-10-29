/* ==========================================================================
   Ecoscope — main.js
   No dependencies. Everything degrades gracefully if JS is unavailable.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: transparent over a dark hero, solid once scrolled --- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var isStatic = header.classList.contains('is-static');
    var threshold = isStatic ? 10 : Math.round(window.innerHeight * 0.72);
    var onScroll = function () {
      header.classList.toggle('is-solid', window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      threshold = isStatic ? 10 : Math.round(window.innerHeight * 0.72);
      onScroll();
    });
    onScroll();
  }

  /* ---------- Mobile drawer -------------------------------------------- */
  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-drawer]');
  if (burger && drawer) {
    var setMenu = function (open) {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
    });
    setMenu(false);
  }

  /* ---------- Reveal on scroll ----------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
      revealables.forEach(function (el) { io.observe(el); });

      /* Safety net: if the observer never fires (background tab, odd browser),
         show everything after a few seconds rather than leave a blank page. */
      window.setTimeout(function () {
        revealables.forEach(function (el) { el.classList.add('is-in'); });
      }, 4000);
    }
  }

  /* ---------- Marquee: duplicate the track so the loop is seamless ------ */
  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Accordion ------------------------------------------------- */
  document.querySelectorAll('[data-acc]').forEach(function (acc) {
    var items = acc.querySelectorAll('.acc__item');
    items.forEach(function (item) {
      var btn = item.querySelector('.acc__btn');
      var panel = item.querySelector('.acc__panel');
      if (!btn || !panel) return;

      btn.setAttribute('aria-expanded', 'false');
      var open = function (yes) {
        item.classList.toggle('is-open', yes);
        btn.setAttribute('aria-expanded', String(yes));
        panel.style.height = yes ? panel.firstElementChild.offsetHeight + 'px' : '0px';
      };
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            other.querySelector('.acc__btn').setAttribute('aria-expanded', 'false');
            other.querySelector('.acc__panel').style.height = '0px';
          }
        });
        open(willOpen);
      });
      window.addEventListener('resize', function () {
        if (item.classList.contains('is-open')) {
          panel.style.height = panel.firstElementChild.offsetHeight + 'px';
        }
      });
    });
  });

  /* ---------- Lightbox (look book) -------------------------------------- */
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lb-item]'));
    var stage = lb.querySelector('[data-lb-img]');
    var count = lb.querySelector('[data-lb-count]');
    var index = 0;
    var lastFocus = null;

    var show = function (i) {
      index = (i + triggers.length) % triggers.length;
      var src = triggers[index].getAttribute('data-full');
      var alt = triggers[index].getAttribute('data-alt') || '';
      stage.setAttribute('src', src);
      stage.setAttribute('alt', alt);
      if (count) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(triggers.length).padStart(2, '0');
    };
    var openLb = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-lb-close]').focus();
    };
    var closeLb = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    triggers.forEach(function (t, i) {
      t.addEventListener('click', function () { openLb(i); });
    });
    lb.querySelector('[data-lb-close]').addEventListener('click', closeLb);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(index - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ---------- Missing images fall back to their tone, not a broken icon -- */
  document.querySelectorAll('img').forEach(function (img) {
    var hide = function () { img.style.visibility = 'hidden'; };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) hide();
    img.addEventListener('error', hide);
  });

  /* ---------- Year stamp ------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
