/* ==========================================================================
   Ecoscope — shop.js
   The bag. No dependencies, no server: the bag lives in the visitor's own
   browser (localStorage) until they send the order.

   Card payment is not built yet. "Send order" hands the basket to Instagram
   or email with the items written out, which matches how Ecoscope takes
   orders today. When a payment provider is added, replace sendOrder() below.

   Products are defined in the HTML (order.html) using data- attributes, so
   adding a product means copying one block of markup — nothing in here needs
   to change.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'ecoscope.bag.v1';
  var CURRENCY = '฿';               /* ฿ */
  var IG_URL = 'https://ig.me/m/ecoscopeofficial';
  var EMAIL = 'Ecoscopeclothing@gmail.com';

  /* ---------- State ----------------------------------------------------- */
  var bag = [];
  try {
    var saved = window.localStorage.getItem(KEY);
    if (saved) bag = JSON.parse(saved) || [];
  } catch (e) { bag = []; }

  var save = function () {
    try { window.localStorage.setItem(KEY, JSON.stringify(bag)); } catch (e) {}
  };

  var money = function (n) {
    return n.toLocaleString('en-US') + ' ' + CURRENCY;
  };
  var total = function () {
    return bag.reduce(function (sum, it) { return sum + it.price * it.qty; }, 0);
  };
  var count = function () {
    return bag.reduce(function (sum, it) { return sum + it.qty; }, 0);
  };

  /* ---------- Elements -------------------------------------------------- */
  var panel = document.querySelector('[data-bag]');
  if (!panel) return;

  var list = panel.querySelector('[data-bag-items]');
  var foot = panel.querySelector('[data-bag-foot]');
  var totalEl = panel.querySelector('[data-bag-total]');
  var counters = document.querySelectorAll('[data-bag-count]');
  var toast = document.querySelector('[data-toast]');
  var lastFocus = null;

  /* ---------- Render ---------------------------------------------------- */
  var render = function () {
    var n = count();
    counters.forEach(function (el) {
      el.textContent = n;
      el.closest('[data-bag-open]').setAttribute('aria-label', 'Bag, ' + n + ' item' + (n === 1 ? '' : 's'));
    });

    if (!bag.length) {
      list.innerHTML = '<p class="bag__empty">Your bag is empty.</p>';
      if (foot) foot.hidden = true;
      return;
    }
    if (foot) foot.hidden = false;

    list.innerHTML = bag.map(function (it, i) {
      return '' +
        '<div class="bagitem">' +
          '<div class="bagitem__media">' + (it.img ? '<img src="' + it.img + '" alt="">' : '') + '</div>' +
          '<div>' +
            '<p class="bagitem__name">' + it.name + '</p>' +
            '<p class="bagitem__meta">Size ' + it.size + '</p>' +
            '<div class="bagitem__qty">' +
              '<button type="button" data-dec="' + i + '" aria-label="Reduce quantity">&minus;</button>' +
              '<span>' + it.qty + '</span>' +
              '<button type="button" data-inc="' + i + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="bagitem__right">' +
            '<span class="bagitem__price">' + money(it.price * it.qty) + '</span>' +
            '<button type="button" class="bagitem__remove" data-remove="' + i + '">Remove</button>' +
          '</div>' +
        '</div>';
    }).join('');

    if (totalEl) totalEl.textContent = money(total());
  };

  /* ---------- Open / close ---------------------------------------------- */
  var setOpen = function (open) {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastFocus = document.activeElement;
      panel.querySelector('[data-bag-close]').focus();
    } else if (lastFocus) {
      lastFocus.focus();
    }
  };

  document.querySelectorAll('[data-bag-open]').forEach(function (btn) {
    btn.addEventListener('click', function () { setOpen(true); });
  });
  panel.querySelector('[data-bag-close]').addEventListener('click', function () { setOpen(false); });
  panel.querySelector('[data-bag-scrim]').addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
  });

  /* ---------- Quantity / remove ----------------------------------------- */
  list.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    var i;
    if ((i = t.getAttribute('data-inc')) !== null) { bag[i].qty += 1; }
    else if ((i = t.getAttribute('data-dec')) !== null) {
      bag[i].qty -= 1;
      if (bag[i].qty < 1) bag.splice(i, 1);
    }
    else if ((i = t.getAttribute('data-remove')) !== null) { bag.splice(i, 1); }
    else return;
    save();
    render();
  });

  /* ---------- Toast ------------------------------------------------------ */
  var toastTimer;
  var say = function (msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('is-on'); }, 2600);
  };

  /* ---------- Product cards --------------------------------------------- */
  document.querySelectorAll('[data-product]').forEach(function (card) {
    var chosen = null;
    var note = card.querySelector('[data-note]');
    var pills = card.querySelectorAll('[data-size]');

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        chosen = pill.getAttribute('data-size');
        pills.forEach(function (p) { p.setAttribute('aria-pressed', String(p === pill)); });
        if (note) { note.textContent = ''; note.classList.remove('is-warn'); }
      });
    });

    card.querySelector('[data-add]').addEventListener('click', function () {
      if (!chosen) {
        if (note) { note.textContent = 'Choose a size first'; note.classList.add('is-warn'); }
        pills[0] && pills[0].focus();
        return;
      }
      var name = card.getAttribute('data-name');
      var price = parseInt(card.getAttribute('data-price'), 10) || 0;
      var img = card.getAttribute('data-img') || '';

      var existing = bag.filter(function (it) { return it.name === name && it.size === chosen; })[0];
      if (existing) existing.qty += 1;
      else bag.push({ name: name, size: chosen, price: price, img: img, qty: 1 });

      save();
      render();
      say(name + ' — size ' + chosen + ' added');
    });
  });

  /* ---------- Sending the order ----------------------------------------- */
  var summary = function () {
    var lines = ['Ecoscope order', ''];
    bag.forEach(function (it) {
      lines.push(it.qty + ' × ' + it.name + '  (size ' + it.size + ')  — ' + money(it.price * it.qty));
    });
    lines.push('', 'Total: ' + money(total()));
    return lines.join('\n');
  };

  var igBtn = panel.querySelector('[data-send-ig]');
  if (igBtn) {
    igBtn.addEventListener('click', function () {
      var text = summary();
      var go = function () { window.open(IG_URL, '_blank', 'noopener'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          say('Order copied — paste it in the chat');
          go();
        }, go);
      } else { go(); }
    });
  }

  var mailBtn = panel.querySelector('[data-send-mail]');
  if (mailBtn) {
    mailBtn.addEventListener('click', function () {
      window.location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent('Ecoscope order') +
        '&body=' + encodeURIComponent(summary() + '\n\nName:\nDelivery address:\nPhone:\n');
    });
  }

  render();
})();
