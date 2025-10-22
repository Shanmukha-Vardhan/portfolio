// === START OF NEW main.js (Refined Minimalism Engine) ===

document.addEventListener("DOMContentLoaded", () => {
  // --- Intersection Observer for Scroll Animations ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});