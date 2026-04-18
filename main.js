/**
 * APEX DESIGNS — main.js
 * Gestisce: config dinamica, navbar, animazioni, discord links
 */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG || {};

  // ── DISCORD LINKS ──────────────────────────────────────────────
  const discordUrl = cfg.discordInvite || "#";
  const discordIds = [
    "discord-link", "discord-link-mobile", "discord-hero",
    "discord-cta-btn", "footer-discord", "footer-discord-2"
  ];
  discordIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = discordUrl;
  });
  // Anche link generici discord nelle pagine
  document.querySelectorAll(".discord-dynamic").forEach(el => {
    el.href = discordUrl;
  });

  // ── ACCENT COLOR ───────────────────────────────────────────────
  if (cfg.accentColor) {
    document.documentElement.style.setProperty("--accent", cfg.accentColor);
  }
  if (cfg.secondaryColor) {
    document.documentElement.style.setProperty("--accent2", cfg.secondaryColor);
  }

  // ── NAVBAR SCROLL ──────────────────────────────────────────────
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // ── HAMBURGER MENU ─────────────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu?.classList.toggle("open");
  });
  // Chiudi cliccando link
  mobileMenu?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      hamburger?.classList.remove("open");
      mobileMenu?.classList.remove("open");
    });
  });

  // ── SCROLL REVEAL ──────────────────────────────────────────────
  const reveals = document.querySelectorAll(
    ".service-card, .showcase-item, .stat-item, .product-card, .process-step, .faq-item, .contact-card"
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => {
    el.classList.add("reveal-target");
    observer.observe(el);
  });

  // ── CURSOR GLOW ────────────────────────────────────────────────
  const cursor = document.createElement("div");
  cursor.className = "cursor-glow";
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // ── ACTIVE NAV LINK ────────────────────────────────────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ── FAQ ACCORDION ──────────────────────────────────────────────
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // ── FILTER TABS ────────────────────────────────────────────────
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".product-card").forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "";
          setTimeout(() => card.classList.add("visible"), 10);
        } else {
          card.classList.remove("visible");
          setTimeout(() => card.style.display = "none", 300);
        }
      });
    });
  });

  // ── COUNTER ANIMATION ─────────────────────────────────────────
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ""));
        const suffix = text.replace(/[0-9]/g, "");
        if (isNaN(num)) return;
        let start = 0;
        const step = num / 40;
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          el.textContent = Math.floor(start) + suffix;
          if (start >= num) clearInterval(timer);
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

});
