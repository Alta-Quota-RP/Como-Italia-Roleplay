/* ============================================================
   GRAFIKA STUDIO — main.js
   ============================================================ */

// ─── Custom Cursor ───────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth ring follow
(function loopRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(loopRing);
})();

// Grow on hover
document.querySelectorAll('a, button, .portfolio-item, .service-card, .filter-tab')
  .forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });


// ─── Navigation ──────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger / Mobile Menu
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});


// ─── Page Router ─────────────────────────────────────────────
function navigate(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');
  // Update nav active state
  document.querySelectorAll('[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  // Scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Re-trigger reveal animations
  setTimeout(observeReveal, 100);
  // Init page-specific logic
  if (pageId === 'page-about') initSkillBars();
  // Update URL hash
  history.pushState(null, '', '#' + pageId.replace('page-', ''));
}

// Wire up all navigation links
document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.page);
  });
});

// Handle back/forward
window.addEventListener('popstate', () => {
  const hash = location.hash.replace('#', '');
  const pageMap = { '': 'page-home', home: 'page-home', services: 'page-services', about: 'page-about', contact: 'page-contact' };
  navigate(pageMap[hash] || 'page-home');
});

// Load correct page on start
(function initPage() {
  const hash = location.hash.replace('#', '');
  const pageMap = { services: 'page-services', about: 'page-about', contact: 'page-contact' };
  navigate(pageMap[hash] || 'page-home');
})();


// ─── Scroll Reveal ───────────────────────────────────────────
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.08) + 's';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}
observeReveal();


// ─── Portfolio Filter ─────────────────────────────────────────
const filterTabs = document.querySelectorAll('.filter-tab');
const portfolioItems = document.querySelectorAll('.portfolio-item[data-cat]');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.filter;
    portfolioItems.forEach(item => {
      const match = cat === 'all' || item.dataset.cat === cat;
      item.style.opacity = match ? '1' : '0.25';
      item.style.transform = match ? '' : 'scale(0.95)';
      item.style.pointerEvents = match ? 'auto' : 'none';
    });
  });
});


// ─── Counter Animation ────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = 16;
  const steps = duration / step;
  const increment = target / steps;
  let current = 0;
  const suffix = el.dataset.suffix || '';
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statObserver.observe(statsBar);


// ─── Skill Bars ───────────────────────────────────────────────
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        fills.forEach((f, i) => {
          setTimeout(() => f.classList.add('animated'), i * 120);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const wrap = document.querySelector('.skills-grid');
  if (wrap) io.observe(wrap);
}


// ─── Budget Chips ─────────────────────────────────────────────
document.querySelectorAll('.budget-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.budget-chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  });
});


// ─── Contact Form ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const successMsg  = document.getElementById('success-msg');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-primary');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;
  // Simulate sending
  setTimeout(() => {
    successMsg.classList.add('visible');
    contactForm.reset();
    document.querySelectorAll('.budget-chip').forEach(c => c.classList.remove('selected'));
    btn.textContent = 'Invia Messaggio';
    btn.disabled = false;
    showToast('Messaggio inviato con successo! 🎉');
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 1600);
});


// ─── Toast ────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}


// ─── Portfolio item click ─────────────────────────────────────
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    showToast('Dettaglio progetto in arrivo! 👁');
  });
});


// ─── Parallax hero orbs ───────────────────────────────────────
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.hero-orb');
  const cx = (e.clientX / window.innerWidth  - 0.5) * 30;
  const cy = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
  });
});
