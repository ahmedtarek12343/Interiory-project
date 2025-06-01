"use strict";
// Get the header element
const header = document.querySelector(".header");

// Get the initial offset position of the header
const sticky = header.offsetTop;

// Function to make header sticky on scroll
function makeHeaderSticky() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Add scroll event listener
window.addEventListener("scroll", makeHeaderSticky);

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(
    ".ri-menu-line, .ri-close-large-line"
  );
  const navLinks = document.querySelector(".header__list");

  menuIcon.addEventListener("click", function () {
    navLinks.classList.toggle("show-menu");
    menuIcon.classList.toggle("ri-menu-line");
    menuIcon.classList.toggle("ri-close-large-line");
  });
});

// --- Image Modal Slider with Smooth Zoom ---

function ensureImageModal() {
  if (!document.getElementById("image-modal")) {
    const modal = document.createElement("div");
    modal.id = "image-modal";
    modal.className = "image-modal";
    modal.innerHTML = `
      <span class="image-modal__close">&times;</span>
      <span class="image-modal__arrow image-modal__arrow--left">&#8592;</span>
      <img class="image-modal__img" src="" alt="Zoomed image" />
      <span class="image-modal__arrow image-modal__arrow--right">&#8594;</span>
    `;
    document.body.appendChild(modal);
  }
}

function injectModalCSS() {
  if (!document.getElementById("image-modal-style")) {
    const style = document.createElement("style");
    style.id = "image-modal-style";
    style.innerHTML = `
      .image-modal {
        display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.8); align-items: center; justify-content: center; transition: background 0.3s;
      }
      .image-modal.active { display: flex; }
      .image-modal__img {
        max-width: 80vw; max-height: 80vh; border-radius: 1rem;
        transform: scale(0.7); opacity: 0;
        transition: transform 0.4s cubic-bezier(.4,2,.6,1), opacity 0.4s;
        box-shadow: 0 0 40px 10px rgba(0,0,0,0.3);
        z-index: 2001;
      }
      .image-modal.active .image-modal__img { transform: scale(1); opacity: 1; }
      .image-modal__close {
        position: absolute; top: 2rem; right: 3rem; color: #fff; font-size: 4rem; cursor: pointer; z-index: 2100;
      }
      .image-modal__arrow {
        position: absolute; top: 50%; transform: translateY(-50%);
        color: #fff; font-size: 4rem; cursor: pointer; z-index: 2100;
        user-select: none; background: rgba(0,0,0,0.3); border-radius: 50%; padding: 0.5rem 1.2rem;
        transition: background 0.2s;
      }
      .image-modal__arrow--left { left: 2rem; }
      .image-modal__arrow--right { right: 2rem; }
      .image-modal__arrow:hover { background: rgba(0,0,0,0.6); }
    `;
    document.head.appendChild(style);
  }
}

function setupImageModalSlider() {
  ensureImageModal();
  injectModalCSS();

  // Collect all images from both sections
  const containers = [
    ...document.querySelectorAll(".service__grid-item-img-container"),
    ...document.querySelectorAll(".room__grid-item-img-container"),
  ];
  const images = containers.map((container) => container.querySelector("img"));
  let currentIndex = 0;

  const modal = document.getElementById("image-modal");
  const modalImg = modal.querySelector(".image-modal__img");
  const closeBtn = modal.querySelector(".image-modal__close");
  const leftArrow = modal.querySelector(".image-modal__arrow--left");
  const rightArrow = modal.querySelector(".image-modal__arrow--right");

  function showImage(index) {
    currentIndex = (index + images.length) % images.length; // wrap around
    modalImg.src = images[currentIndex].src;
    modal.classList.add("active");
    // Force reflow for zoom animation
    modalImg.style.transform = "scale(0.7)";
    modalImg.style.opacity = "0";
    setTimeout(() => {
      modalImg.style.transform = "scale(1)";
      modalImg.style.opacity = "1";
    }, 10);
  }

  containers.forEach((container, idx) => {
    container.onclick = function () {
      showImage(idx);
    };
  });

  leftArrow.onclick = function (e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  };
  rightArrow.onclick = function (e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  };
  closeBtn.onclick = function () {
    modal.classList.remove("active");
  };
  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  };

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") modal.classList.remove("active");
  });
}

// Run setup after DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupImageModalSlider);
} else {
  setupImageModalSlider();
}

const checkbox = document.querySelector(
  ".main__grid-item-form-checkbox-custom"
);
const checkboxes = document.querySelector(".ri-check-line");

checkbox.addEventListener("click", function () {
  checkboxes.classList.toggle("hidden");
  checkbox.classList.toggle("custom_background");
});
