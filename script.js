/* ============================================================
   SR HYDRAULIC — shared site behaviors
   Mobile nav, enquiry modal, featured-products carousel
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.classList.toggle('is-active', isOpen);
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  /* ---------- Enquiry modal ---------- */
  const modal = document.getElementById('enquiry-modal');
  if (modal) {
    const dialog = modal.querySelector('.modal-dialog');
    const productField = modal.querySelector('#modal-product');
    const titleField = modal.querySelector('#modal-title');
    const closeEls = modal.querySelectorAll('[data-modal-close]');
    let lastFocused = null;

    const openModal = (productName) => {
      lastFocused = document.activeElement;
      if (productField) productField.value = productName || '';
      if (titleField) titleField.textContent = productName ? `Enquire about ${productName}` : 'Send an enquiry';
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      window.setTimeout(() => {
        const firstInput = modal.querySelector('#modal-name');
        if (firstInput) firstInput.focus();
      }, 250);
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('[data-open-enquiry]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-product') || ''));
    });

    closeEls.forEach(el => el.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    // simple focus trap
    dialog && dialog.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = dialog.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ---------- Featured products carousel ---------- */
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const prevBtn = root.querySelector('.carousel-arrow.prev');
    const nextBtn = root.querySelector('.carousel-arrow.next');
    const dotsWrap = root.querySelector('.carousel-dots');
    if (!track || !slides.length) return;

    let index = 0;
    let autoplayTimer = null;
    const AUTOPLAY_MS = 5000;

    const perView = () => {
      const w = window.innerWidth;
      if (w < 720) return 1;
      if (w < 1080) return 2;
      return 3;
    };

    const maxIndex = () => Math.max(0, slides.length - perView());

    const dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      const dotCount = maxIndex() + 1;
      for (let i = 0; i < dotCount; i++) {
        const d = document.createElement('button');
        d.type = 'button';
        d.className = 'carousel-dot';
        d.setAttribute('aria-label', `Go to slide ${i + 1}`);
        d.addEventListener('click', () => { goTo(i); resetAutoplay(); });
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    }

    const update = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
      const offset = index * (slideWidth + gap);
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex();
    };

    const goTo = (i) => {
      index = Math.max(0, Math.min(i, maxIndex()));
      update();
    };

    const next = () => { index = index >= maxIndex() ? 0 : index + 1; update(); };
    const prev = () => { index = index <= 0 ? maxIndex() : index - 1; update(); };

    nextBtn && nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = window.setInterval(next, AUTOPLAY_MS);
    };
    const stopAutoplay = () => { if (autoplayTimer) window.clearInterval(autoplayTimer); };
    const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    // touch / swipe support
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    track.addEventListener('touchstart', (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (!dragging) return;
      dragging = false;
      if (deltaX > 40) prev();
      else if (deltaX < -40) next();
      deltaX = 0;
      startAutoplay();
    });

    window.addEventListener('resize', () => {
      if (dotsWrap) {
        const dotCount = maxIndex() + 1;
        if (dots.length !== dotCount) {
          dotsWrap.innerHTML = '';
          dots.length = 0;
          for (let i = 0; i < dotCount; i++) {
            const d = document.createElement('button');
            d.type = 'button';
            d.className = 'carousel-dot';
            d.setAttribute('aria-label', `Go to slide ${i + 1}`);
            d.addEventListener('click', () => { goTo(i); resetAutoplay(); });
            dotsWrap.appendChild(d);
            dots.push(d);
          }
        }
      }
      index = Math.min(index, maxIndex());
      update();
    });

    update();
    startAutoplay();
  });

  /* ---------- Active nav link ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
});
