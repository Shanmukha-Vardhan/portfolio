document.addEventListener("DOMContentLoaded", () => {
    const principleItems = document.querySelectorAll(".principle-item");
    const modals = document.querySelectorAll(".modal-overlay");
    const closeButtons = document.querySelectorAll(".modal-close-button");
  
    principleItems.forEach((item) => {
      item.addEventListener("click", () => {
        const modalId = item.getAttribute("data-modal-target");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove("modal-hidden");
        }
      });
    });
  
    const closeModal = (modal) => {
      modal.classList.add("modal-hidden");
    };
  
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal-overlay");
        closeModal(modal);
      });
    });
  
    modals.forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });
  });