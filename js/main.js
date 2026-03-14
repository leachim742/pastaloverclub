/* ============================================
   PASTALOVERCLUB — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // 1. Feather Icons Initialization
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // 2. Mobile Hamburger Nav Toggle
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close nav when a link is clicked on mobile
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link Highlighting
  (function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkEls = document.querySelectorAll('.nav__link');
    navLinkEls.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop();
        if (linkPage === currentPath ||
            (currentPath === '' && linkPage === 'index.html') ||
            (currentPath === 'index.html' && linkPage === 'index.html')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  })();

  // 4. IntersectionObserver — Scroll Reveal
  (function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  })();

  // 5. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 6. Gallery Filter Tag Functionality (gallery.html)
  (function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.gallery-grid .recipe-card');

    if (!filterBtns.length || !recipeCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.dataset.filter;

        recipeCards.forEach(function (card) {
          if (filter === 'all') {
            card.style.display = '';
            requestAnimationFrame(function () {
              card.style.opacity = '1';
              card.style.transform = '';
            });
          } else {
            const cardCategories = card.dataset.categories || '';
            if (cardCategories.includes(filter)) {
              card.style.display = '';
              requestAnimationFrame(function () {
                card.style.opacity = '1';
                card.style.transform = '';
              });
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(function () {
                if (!cardCategories.includes(filter)) {
                  card.style.display = 'none';
                }
              }, 300);
            }
          }
        });
      });
    });
  })();

  // 7. Add card transition style for gallery filter
  (function addCardTransitions() {
    const cards = document.querySelectorAll('.gallery-grid .recipe-card');
    cards.forEach(function (card) {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
  })();

});
