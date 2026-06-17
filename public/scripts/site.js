const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-site-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

const setMenuOpen = (open) => {
  nav?.classList.toggle("is-open", open);
  header?.classList.toggle("menu-open", open);
  if (!open) {
    nav
      ?.querySelectorAll(".nav-item.open")
      .forEach((item) => item.classList.remove("open"));
  }
};

navToggle?.addEventListener("click", () => {
  setMenuOpen(!nav?.classList.contains("is-open"));
});

// Language switch button (mobile): its own click-dropdown, independent of the
// hamburger menu. On desktop the dropdown is hover-driven, so .open is inert.
const langSwitch = document.querySelector(".lang-switch");
if (langSwitch) {
  const langButton = langSwitch.querySelector(":scope > a");
  langButton?.addEventListener("click", (event) => {
    event.preventDefault();
    langSwitch.classList.toggle("open");
  });
  document.addEventListener("click", (event) => {
    if (!langSwitch.contains(event.target)) {
      langSwitch.classList.remove("open");
    }
  });
}

// Mobile accordion: tapping a section header (a parent of a dropdown) expands
// or collapses it instead of navigating. Leaf links navigate as usual.
nav?.querySelectorAll(".nav-item.has-dropdown > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (nav.classList.contains("is-open")) {
      event.preventDefault();
      const item = link.parentElement;
      const willOpen = !item.classList.contains("open");
      // Exclusive accordion: collapse every other open section first.
      nav
        .querySelectorAll(".nav-item.open")
        .forEach((other) => other.classList.remove("open"));
      item.classList.toggle("open", willOpen);
    }
  });
});

// Tapping the empty area below the open mobile menu closes it.
nav?.addEventListener("click", (event) => {
  if (nav.classList.contains("is-open") && !event.target.closest("a")) {
    setMenuOpen(false);
  }
});

// Tapping anywhere outside the open mobile menu (page content, header gaps —
// anything but the nav itself or the toggle button) closes it. Navigation
// links inside the nav still navigate normally and close on page change.
document.addEventListener("click", (event) => {
  if (
    nav?.classList.contains("is-open") &&
    !event.target.closest("[data-site-nav]") &&
    !event.target.closest("[data-nav-toggle]")
  ) {
    setMenuOpen(false);
  }
});

const track = document.querySelector("[data-hero-track]");
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll("[data-slide-to]"));
const prev = document.querySelector("[data-slide-prev]");
const next = document.querySelector("[data-slide-next]");

let currentSlide = slides.length > 1 ? 1 : 0;
let allSlides = slides;
let isTransitioning = false;
let timer;
let transitionTimer;
const heroAutoPlayEnabled = true;
const heroAutoPlayDelay = 4000;
const heroTransitionDuration = 700;

const setTrackPosition = (index, animate = true) => {
  if (!track || slides.length === 0) return;

  if (!animate) {
    track.style.transition = "none";
  }

  track.style.transform = `translateX(-${index * 100}%)`;

  if (!animate) {
    void track.offsetHeight;
    track.style.transition = "";
  }
};

const getRealSlideIndex = () => {
  if (slides.length <= 1) return 0;
  if (currentSlide === 0) return slides.length - 1;
  if (currentSlide === slides.length + 1) return 0;

  return currentSlide - 1;
};

const updateSlideState = () => {
  const realSlideIndex = getRealSlideIndex();

  allSlides.forEach((slide, slideIndex) => {
    slide.setAttribute("aria-hidden", slideIndex === currentSlide ? "false" : "true");
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === realSlideIndex);
  });
};

const finishSlideTransition = () => {
  window.clearTimeout(transitionTimer);

  if (currentSlide === slides.length + 1) {
    currentSlide = 1;
    setTrackPosition(currentSlide, false);
  } else if (currentSlide === 0) {
    currentSlide = slides.length;
    setTrackPosition(currentSlide, false);
  }

  isTransitioning = false;
  updateSlideState();
};

const watchSlideTransition = () => {
  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(
    finishSlideTransition,
    heroTransitionDuration + 120
  );
};

const setupInfiniteSlider = () => {
  if (!track || slides.length === 0) return;

  if (slides.length <= 1) {
    setTrackPosition(0, false);
    updateSlideState();
    return;
  }

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");
  track.prepend(lastClone);
  track.append(firstClone);
  allSlides = Array.from(track.querySelectorAll(".hero-slide"));

  setTrackPosition(currentSlide, false);
  updateSlideState();

  track.addEventListener("transitionend", (event) => {
    if (event.target !== track) return;

    finishSlideTransition();
  });
};

const goToSlide = (index) => {
  if (!track || slides.length === 0 || isTransitioning) return;

  if (slides.length <= 1) {
    currentSlide = 0;
    setTrackPosition(0, false);
    updateSlideState();
    return;
  }

  const targetSlide = Math.max(0, Math.min(index, slides.length - 1)) + 1;
  if (targetSlide === currentSlide) return;

  currentSlide = targetSlide;
  isTransitioning = true;
  setTrackPosition(currentSlide);
  updateSlideState();
  watchSlideTransition();
};

const stepSlide = (direction = 1) => {
  if (slides.length <= 1 || isTransitioning) return;

  currentSlide += direction;
  isTransitioning = true;
  setTrackPosition(currentSlide);
  updateSlideState();
  watchSlideTransition();
};

const startAutoPlay = () => {
  if (!heroAutoPlayEnabled || slides.length <= 1) return;

  stopAutoPlay();
  timer = window.setInterval(() => stepSlide(1), heroAutoPlayDelay);
};

const stopAutoPlay = () => {
  window.clearInterval(timer);
};

const restartAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

prev?.addEventListener("click", () => {
  stepSlide(-1);
  restartAutoPlay();
});

next?.addEventListener("click", () => {
  stepSlide(1);
  restartAutoPlay();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(Number(dot.dataset.slideTo));
    restartAutoPlay();
  });
});

setupInfiniteSlider();
startAutoPlay();

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

const historyTrack = document.querySelector("[data-history-track]");
const historyPrev = document.querySelector("[data-history-prev]");
const historyNext = document.querySelector("[data-history-next]");
const historyItems = historyTrack
  ? Array.from(historyTrack.querySelectorAll(".history-item"))
  : [];

let historyAllItems = historyItems;
let historyIndex = 0;
let historyCloneCount = 0;
let historyIsSliding = false;
let historyTimer;
let historyTransitionTimer;

const historyAutoDelay = 4200;
const historyAutoDuration = 900;
const historyManualDuration = 450;

const getHistoryVisibleCount = () => {
  if (!historyTrack) return 4;

  const rawValue = getComputedStyle(historyTrack)
    .getPropertyValue("--history-visible")
    .trim();
  const visibleCount = Number.parseInt(rawValue, 10);

  return Number.isFinite(visibleCount) && visibleCount > 0 ? visibleCount : 4;
};

const getHistoryStepWidth = () => {
  const firstItem = historyAllItems[0];

  return firstItem?.getBoundingClientRect().width || 0;
};

const setHistoryPosition = (index, duration = 0) => {
  if (!historyTrack) return;

  historyTrack.style.transition = duration
    ? `transform ${duration}ms ease`
    : "none";
  historyTrack.style.transform = `translateX(-${
    index * getHistoryStepWidth()
  }px)`;

  if (!duration) {
    void historyTrack.offsetHeight;
  }
};

const finishHistoryTransition = () => {
  window.clearTimeout(historyTransitionTimer);

  if (historyIndex >= historyItems.length + historyCloneCount) {
    historyIndex =
      historyCloneCount +
      (historyIndex - historyItems.length - historyCloneCount);
    setHistoryPosition(historyIndex, 0);
  } else if (historyIndex < historyCloneCount) {
    historyIndex = historyItems.length + historyIndex;
    setHistoryPosition(historyIndex, 0);
  }

  historyIsSliding = false;
};

const watchHistoryTransition = (duration) => {
  window.clearTimeout(historyTransitionTimer);
  historyTransitionTimer = window.setTimeout(
    finishHistoryTransition,
    duration + 120
  );
};

const slideHistory = (step = 1, duration = historyAutoDuration) => {
  if (!historyTrack || historyItems.length <= getHistoryVisibleCount()) return;
  if (historyIsSliding) return;

  historyIndex += step;
  historyIsSliding = true;
  setHistoryPosition(historyIndex, duration);
  watchHistoryTransition(duration);
};

const startHistoryAutoPlay = () => {
  if (!historyTrack || historyItems.length <= getHistoryVisibleCount()) return;

  window.clearInterval(historyTimer);
  historyTimer = window.setInterval(
    () => slideHistory(1, historyAutoDuration),
    historyAutoDelay
  );
};

const restartHistoryAutoPlay = () => {
  window.clearInterval(historyTimer);
  startHistoryAutoPlay();
};

const setupHistoryCarousel = () => {
  if (!historyTrack || historyItems.length === 0) return;

  historyCloneCount = Math.min(4, historyItems.length);

  const beforeClones = document.createDocumentFragment();
  const afterClones = document.createDocumentFragment();

  historyItems.slice(-historyCloneCount).forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    beforeClones.append(clone);
  });

  historyItems.slice(0, historyCloneCount).forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    afterClones.append(clone);
  });

  historyTrack.prepend(beforeClones);
  historyTrack.append(afterClones);
  historyAllItems = Array.from(historyTrack.querySelectorAll(".history-item"));
  historyIndex = historyCloneCount;
  setHistoryPosition(historyIndex, 0);

  historyTrack.addEventListener("transitionend", (event) => {
    if (event.target !== historyTrack) return;

    finishHistoryTransition();
  });

  window.addEventListener("resize", () => {
    setHistoryPosition(historyIndex, 0);
  });

  historyPrev?.addEventListener("click", () => {
    slideHistory(-getHistoryVisibleCount(), historyManualDuration);
    restartHistoryAutoPlay();
  });

  historyNext?.addEventListener("click", () => {
    slideHistory(getHistoryVisibleCount(), historyManualDuration);
    restartHistoryAutoPlay();
  });

  startHistoryAutoPlay();
};

setupHistoryCarousel();
