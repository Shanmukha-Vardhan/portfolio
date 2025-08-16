document.addEventListener("DOMContentLoaded", () => {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
  
    if (!sliderWrapper || !slides.length || !prevBtn || !nextBtn) {
      return;
    }
  
    let currentIndex = 0;
    const slideCount = slides.length;
  
    const updateSliderPosition = () => {
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSliderPosition();
    });
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSliderPosition();
    });
  });