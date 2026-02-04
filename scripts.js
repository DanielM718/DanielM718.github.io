// Basic UX
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when clicking a link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Lightweight parallax for elements (NOT the whole page)
// Disables automatically for reduced-motion users.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = Array.from(document.querySelectorAll(".parallax-item"));

if (!prefersReduced && items.length) {
  let ticking = false;

  const update = () => {
    ticking = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight || 800;

    for (const el of items) {
      const speed = Number(el.dataset.speed || 0.12);
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const delta = (mid - vh / 2) / vh; // -0.5..0.5-ish

      // Clamp translate so it never goes insane
      const translate = Math.max(-18, Math.min(18, -delta * 40 * speed));
      el.style.transform = `translate3d(0, ${translate}px, 0)`;
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
