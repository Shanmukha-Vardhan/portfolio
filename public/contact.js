document.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.getElementById("copy-button");
    const emailLink = document.getElementById("email-link");
  
    if (copyButton && emailLink) {
      copyButton.addEventListener("click", () => {
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
          const originalIcon = copyButton.innerHTML;
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          copyButton.classList.add("copied");
  
          setTimeout(() => {
            copyButton.innerHTML = originalIcon;
            copyButton.classList.remove("copied");
          }, 2000);
        });
      });
    }
  
    const socialLinksContainer = document.querySelector(".social-links");
    const socialLinks = document.querySelectorAll(".social-links a");
    const descriptionDisplay = document.querySelector(".social-description");
  
    if (socialLinksContainer && socialLinks.length > 0 && descriptionDisplay) {
      socialLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          socialLinksContainer.classList.add("faded");
          const description = link.getAttribute("data-description");
          descriptionDisplay.textContent = description;
        });
      });
  
      socialLinksContainer.addEventListener("mouseleave", () => {
        socialLinksContainer.classList.remove("faded");
        descriptionDisplay.textContent = "";
      });
    }
  });