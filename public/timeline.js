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
  
    const modal = document.getElementById("preview-modal");
    const modalBody = document.getElementById("modal-body");
    const closeModalBtn = document.getElementById("modal-close-btn");
    const previewTriggers = document.querySelectorAll(".preview-trigger");
  
    const openModal = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Content could not be loaded.");
        }
        const content = await response.text();
        modalBody.innerHTML = content;
        modal.classList.add("visible");
      } catch (error) {
        modalBody.innerHTML = `<p>Error: ${error.message}</p>`;
        modal.classList.add("visible");
      }
    };
  
    const closeModal = () => {
      modal.classList.remove("visible");
      setTimeout(() => {
        modalBody.innerHTML = "";
      }, 300);
    };
  
    previewTriggers.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const previewUrl = button.dataset.previewUrl;
        if (previewUrl) {
          openModal(previewUrl);
        }
      });
    });
  
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });