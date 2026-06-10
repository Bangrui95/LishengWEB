const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-site-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

const slider = document.querySelector("[data-hero-slider]");
const track = document.querySelector("[data-hero-track]");
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll("[data-slide-to]"));
const prev = document.querySelector("[data-slide-prev]");
const next = document.querySelector("[data-slide-next]");

let currentSlide = 0;
let timer;
const heroAutoPlayEnabled = false;

const goToSlide = (index) => {
  if (!track || slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.setAttribute("aria-hidden", slideIndex === currentSlide ? "false" : "true");
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
};

const startAutoPlay = () => {
  if (!heroAutoPlayEnabled) return;

  stopAutoPlay();
  timer = window.setInterval(() => goToSlide(currentSlide + 1), 5200);
};

const stopAutoPlay = () => {
  window.clearInterval(timer);
};

prev?.addEventListener("click", () => goToSlide(currentSlide - 1));
next?.addEventListener("click", () => goToSlide(currentSlide + 1));

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(Number(dot.dataset.slideTo));
  });
});

slider?.addEventListener("mouseenter", stopAutoPlay);
slider?.addEventListener("mouseleave", startAutoPlay);
slider?.addEventListener("focusin", stopAutoPlay);
slider?.addEventListener("focusout", startAutoPlay);

goToSlide(0);

const productTabs = Array.from(document.querySelectorAll("[data-product-tab]"));
const productPanels = Array.from(document.querySelectorAll("[data-product-panel]"));

productTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.productTab;

    productTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    productPanels.forEach((panel) => {
      const isActive = panel.dataset.productPanel === category;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});
