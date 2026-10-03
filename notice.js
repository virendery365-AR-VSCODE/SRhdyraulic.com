/* ============================================================
   SR HYDRAULIC — "We also do repairing" welcome notice
   Self-contained: injects its own CSS + markup. Just include
   <script src="notice.js"></script> on any page.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'srh-repair-notice-seen';
  var SHOW_DELAY = 1400;     // ms after page load
  var AUTO_HIDE = 14000;     // ms before it tucks itself away

  // Show once per browser session (not on every page change).
  // For testing, add ?notice=1 to the URL to force it.
  var force = /[?&]notice=1/.test(location.search);
  try { if (!force && sessionStorage.getItem(STORAGE_KEY)) return; } catch (e) {}

  var css = '\
.repair-notice{position:fixed;left:24px;bottom:24px;z-index:900;width:min(380px,calc(100% - 32px));\
  background:linear-gradient(135deg,#0e131a 0%,#1c2530 100%);color:#fff;border-radius:18px;\
  border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(10,14,20,.45);overflow:hidden;\
  opacity:0;visibility:hidden;transform:translateY(30px) scale(.96);\
  transition:opacity .45s ease,transform .6s cubic-bezier(.22,1.2,.36,1),visibility 0s linear .6s}\
.repair-notice.is-visible{opacity:1;visibility:visible;transform:none;transition:opacity .45s ease,transform .6s cubic-bezier(.22,1.2,.36,1)}\
.repair-notice::before{content:"";position:absolute;inset:0 auto 0 0;width:4px;background:linear-gradient(180deg,#2e7ce0,#0e52ad)}\
.repair-notice::after{content:"";position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;\
  background:radial-gradient(circle,rgba(46,124,224,.35),transparent 70%);pointer-events:none}\
.rn-body{position:relative;display:flex;gap:16px;align-items:flex-start;padding:22px 22px 20px 26px}\
.rn-icon{position:relative;flex:0 0 auto;width:52px;height:52px;border-radius:14px;display:grid;place-items:center;\
  background:linear-gradient(135deg,#2e7ce0,#0e52ad);box-shadow:0 8px 20px rgba(14,82,173,.5)}\
.rn-icon svg{width:28px;height:28px;transform-origin:70% 70%;animation:rn-wrench 2.4s ease-in-out infinite 1s}\
.rn-icon::after{content:"";position:absolute;inset:0;border-radius:14px;border:2px solid #2e7ce0;animation:rn-pulse 2.2s ease-out infinite}\
.rn-text{min-width:0}\
.rn-badge{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;\
  color:#0e131a;background:#7fb0f0;padding:3px 9px;border-radius:999px}\
.rn-title{font-family:"Barlow Condensed","Inter",sans-serif;font-size:24px;line-height:1.1;font-weight:700;margin:9px 0 6px;color:#fff;padding-right:18px}\
.rn-title span{color:#7fb0f0}\
.rn-desc{font-size:13.5px;line-height:1.5;color:#b6c0cb;margin:0}\
.rn-actions{display:flex;align-items:center;gap:14px;margin-top:14px}\
.rn-btn{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#0a3e86;border:0;border-radius:8px;\
  padding:9px 16px;font:600 13px Inter,sans-serif;cursor:pointer;transition:transform .18s ease,background .18s ease}\
.rn-btn:hover{transform:translateY(-2px);background:#e6eefb}\
.rn-call{font-size:13px;font-weight:600;color:#cddaea;border-bottom:1px solid rgba(255,255,255,.3)}\
.rn-call:hover{color:#fff;border-color:#fff}\
.rn-close{position:absolute;z-index:5;top:10px;right:10px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.08);\
  color:#cddaea;cursor:pointer;display:grid;place-items:center;transition:background .18s ease}\
.rn-close:hover{background:rgba(255,255,255,.2);color:#fff}\
.rn-close svg{width:13px;height:13px}\
.rn-progress{height:3px;background:rgba(255,255,255,.08)}\
.rn-progress i{display:block;height:100%;width:100%;background:#2e7ce0;transform-origin:left;animation:rn-timer ' + (AUTO_HIDE / 1000) + 's linear forwards}\
.repair-notice:hover .rn-progress i{animation-play-state:paused}\
@keyframes rn-wrench{0%,60%,100%{transform:rotate(0)}15%{transform:rotate(-22deg)}30%{transform:rotate(18deg)}45%{transform:rotate(-10deg)}}\
@keyframes rn-pulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.55);opacity:0}}\
@keyframes rn-timer{from{transform:scaleX(1)}to{transform:scaleX(0)}}\
@media (max-width:720px){.repair-notice{left:16px;right:16px;bottom:16px;width:auto}.rn-title{font-size:22px}}\
@media (prefers-reduced-motion:reduce){.rn-icon svg,.rn-icon::after,.rn-progress i{animation:none!important}}\
';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var el = document.createElement('aside');
  el.className = 'repair-notice';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.innerHTML = '\
<button class="rn-close" type="button" aria-label="Dismiss notice">\
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>\
</button>\
<div class="rn-body">\
  <div class="rn-icon" aria-hidden="true">\
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">\
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.3-.6-.6-2.3z"/>\
    </svg>\
  </div>\
  <div class="rn-text">\
    <span class="rn-badge">Also available</span>\
    <h4 class="rn-title">We deal in all types of <span>repairing</span> too</h4>\
    <p class="rn-desc">Cylinders, pumps, valves and more &mdash; bring us the faulty part and we\'ll get it working again.</p>\
    <div class="rn-actions">\
      <button class="rn-btn" type="button">Enquire about repair &rarr;</button>\
      <a class="rn-call" href="tel:+918169777856">Call now</a>\
    </div>\
  </div>\
</div>\
<div class="rn-progress"><i></i></div>';

  var hideTimer;
  function hide() {
    clearTimeout(hideTimer);
    el.classList.remove('is-visible');
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }

  function startTimer() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, AUTO_HIDE);
  }

  function init() {
    document.body.appendChild(el);

    el.querySelector('.rn-close').addEventListener('click', hide);

    el.querySelector('.rn-btn').addEventListener('click', function () {
      var modal = document.getElementById('enquiry-modal');
      hide();
      if (!modal) { location.href = 'contact.html'; return; }
      // Reuse the page's existing enquiry popup
      var product = modal.querySelector('#modal-product');
      var title = modal.querySelector('#modal-title');
      if (product) product.value = 'Repair service';
      if (title) title.textContent = 'Enquire about repair';
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      setTimeout(function () {
        var first = modal.querySelector('#modal-name');
        if (first) first.focus();
      }, 250);
    });

    // Pause auto-hide while hovered / focused
    el.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    el.addEventListener('mouseleave', startTimer);
    el.addEventListener('focusin', function () { clearTimeout(hideTimer); });
    el.addEventListener('focusout', startTimer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.classList.contains('is-visible')) hide();
    });

    setTimeout(function () {
      el.classList.add('is-visible');
      startTimer();
    }, SHOW_DELAY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
