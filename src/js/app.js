// Selecting HTML elements
// Navbar Section
const navbar = document.querySelector(".nav__navbar");
const nav = document.querySelector("nav");
// Modal Window behaviour and Overlay
const openFormButtons = document.querySelectorAll(".open__modal_w");
console.log(openFormButtons);
const headerSegment = document.querySelector(".header");
const modalWindow = document.querySelector(".modal");
const overlaySegment = document.querySelector(".overlay");
const modalWindowClose = document.querySelector(".modal__close");
// Feature Lists
const featureUnList = document.querySelector(".section__features__list");
const featureListItem = document.querySelectorAll(".features__list__item");
// Button to Link Section
const toSectionTwoBtn = document.querySelector(".scroll_to--section2");
const sectionTwo = document.querySelector("#go--to__section2");

// Tab Section
const valueSection = document.querySelector(".values__container");
const valueTabButtons = document.querySelectorAll(".value--btn");
const valuesContent = document.querySelectorAll(".values__content");

// Segment Section

const slides = document.querySelectorAll(".slide");
const slidesBtnLeft = document.querySelector(".slider__btn--left");
const slidesBtnRight = document.querySelector(".slider__btn--right");
let currentSlide = 0;
let maximumSlide = slides.length;
console.log(maximumSlide);

// Array of document selectors for adjusting Modal and Overlay
const closingModalButtons = [overlaySegment, modalWindowClose];
const hidingModalAndOverlay = [modalWindow, overlaySegment];
// Hover over single nav elements brings it to focus and lowers opacity to the rest
const hoverLinks = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".dog__logo");

    siblings.forEach((m) => {
      if (m !== link) {
        m.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// Sticky navbar when scrolling

const receiveNavHeight = navbar.getBoundingClientRect().height;
console.log(receiveNavHeight);

const navThatSticks = (entries) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserverMonitor = new IntersectionObserver(navThatSticks, {
  root: null,
  threshold: 0.8,
  // rootMargin: `${-receiveNavHeight}px`,
});

headerObserverMonitor.observe(headerSegment);

// Creating Cookie Bar from scratch
const createElements = function (ele) {
  const createDiv = document.createElement(ele);
  const createParagraph = document.createElement("p");
  const createButton = document.createElement("button");
  const childrenElems = [createParagraph, createButton];

  createParagraph.innerText =
    "We use cookies for improved user experience and analytics";

  createButton.textContent = "Agree!";
  createButton.classList.add("cookie-btn");

  childrenElems.forEach((m) => createDiv.appendChild(m));

  headerSegment.prepend(createDiv);

  // createDiv.style.height =
  //   parseInt(getComputedStyle(createDiv).height) + 40 + "px";
  createDiv.classList.add("cookie-bar");
  setTimeout(() => {
    createDiv.style.opacity = 1;
  }, 1500);

  createButton.addEventListener("click", () => {
    createDiv.style.opacity = 0;

    setTimeout(() => {
      createDiv.remove();
    }, 1000);
  });
};

const createCookieBar = function () {
  createElements("div");
};

// Open or Close Modal Window for Form
openFormButtons.forEach((m) => {
  m.addEventListener("click", function (e) {
    e.preventDefault();
    const btn = e.target.closest("li") || e.target.closest("button");
    if (!btn) return;
    modalWindow.classList.remove("hidden");
    overlaySegment.classList.remove("hidden");
  });
});

function hidingSegments(hideEl) {
  hideEl.forEach((el) => {
    el.classList.add("hidden");
  });
}

closingModalButtons.forEach((el) => {
  el.addEventListener("click", () => hidingSegments(hidingModalAndOverlay));
});

// Jumping to section - navbar links
const jumpToSection = function (e) {
  document.querySelector(e).addEventListener("click", function (e) {
    e.preventDefault();
    if (
      e.target.classList.contains("nav__link") &&
      !e.target.classList.contains("open__modal_w")
    ) {
      const id = e.target.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

// Jumping to section - button in About segment

toSectionTwoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sectionTwo.scrollIntoView({ behavior: "smooth" });
});

featureListItem.forEach((item) =>
  item.addEventListener("mouseover", function (e) {
    const target = e.target;
    const dataLink = target.classList.contains(
      `feature-item--${item.dataset.link}`
    );
    const dataLinkvalue = target.getAttribute("data-link");
    console.log(dataLink);
    if (!target) return;
    if (target) {
      item.classList.add("features__list__item--active");
      item.classList.add("feature-item-font-color");

      switch (dataLinkvalue) {
        case "1":
          item.textContent = "Professionalism";
          break;
        case "2":
          item.textContent = "Experience";
          break;
        case "3":
          item.textContent = "Passion";
          break;
      }
    }
  })
);

featureListItem.forEach((item) =>
  item.addEventListener("mouseleave", function (e) {
    const target = e.target;
    item.textContent = `Value nr.${target.getAttribute("data-link")}`;
    item.classList.remove("features__list__item--active");
  })
);

// Values Tab Component

valueSection.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".value--btn");
  const clickedValue = clicked.dataset.value;
  console.log(typeof clickedValue);
  if (!clicked) return;
  valueTabButtons.forEach((btn) => btn.classList.remove("value__btn--active"));
  clicked.classList.add("value__btn--active");
  valuesContent.forEach((c) => c.classList.remove("values__content--active"));

  document
    .querySelector(`.values__content--${clickedValue}`)
    .classList.add("values__content--active");
  console.log("what");
});

// Slider Segment
const moveToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
moveToSlide(0);
const nextSlide = () => {
  if (currentSlide === maximumSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
};

const previousSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maximumSlide - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
};
console.log(currentSlide);

// Invoking functions
jumpToSection(".nav__links");
createCookieBar();
slidesBtnRight.addEventListener("click", nextSlide);
slidesBtnLeft.addEventListener("click", previousSlide);
navbar.addEventListener("mouseover", hoverLinks.bind(0.5));
navbar.addEventListener("mouseout", hoverLinks.bind(1));

const arr = [1, 2, 3];
let result = 0;
for (const value in arr) {
  result += +value;
}
console.log(result);
