document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");
  
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    revealElements.forEach((el) => {
      observer.observe(el);
    });
  });