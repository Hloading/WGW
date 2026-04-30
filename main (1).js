/* ═══════════════════════════════════════════════
   WHITE GLOVE WASTE — MAIN JAVASCRIPT
═══════════════════════════════════════════════ */

/* ── NAVBAR SCROLL EFFECT ─────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── MOBILE HAMBURGER MENU ────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

/* ── FADE-IN ON SCROLL (INTERSECTION OBSERVER) ── */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = siblingIndex * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

/* ── ACTIVE NAV LINK HIGHLIGHTING ────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          if (!a.classList.contains('nav-cta')) {
            a.style.color = 'var(--gold)';
          }
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(s => sectionObserver.observe(s));

/* ── CONTACT FORM SUBMIT ──────────────────────── */
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission (replace with real API call / FormSubmit / EmailJS)
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Inquiry';
      btn.disabled = false;
      formSuccess.classList.add('show');

      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}

/* ── SMOOTH SCROLL OFFSET FOR FIXED NAV ──────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ── PHONE NOTIFICATION PULSE ANIMATION ──────── */
const notifications = document.querySelectorAll('.phone-notification');

if (notifications.length > 0) {
  let currentActive = 0;

  setInterval(() => {
    notifications.forEach(n => n.classList.remove('active'));
    currentActive = (currentActive + 1) % notifications.length;
    notifications[currentActive].classList.add('active');
  }, 3000);
}
