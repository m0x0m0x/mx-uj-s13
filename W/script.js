"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  confetti({
    particleCount: 1000,
    spread: 170,
    origin: { y: 0.6 },
  });
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////
// Scrolling function
// Implementing the scroll function
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  //getting coordinates of the image we want to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log("heheh");

  // Getting position of the actual element
  console.log(e.target.getBoundingClientRect());

  // getting the scroll position
  console.log("Current scroll (X/Y)", window.scrollX, scrollY);

  // Reading height and width of viewport
  console.log(
    "heignt/width",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Set destination point
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // The folllowing code implements the smooth scroolling

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  // Modern method - Fastmethod to jump to a section
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////
// Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = this.getAttribute("href");
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Using Event Delegation to make above code more efficient
// 1. Add event listener to commonparent
// 2. Determing what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB")));

// Do the above code with event delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //remove active tab
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate content
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////
// menu Fade Animation

// Function of the opacity isolated as its own funciton to be called in the event listeners
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    // Selecting the necessary elements
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/////////////////////////////////////////////
// 197: Sticky navigation
// window.addEventListener("scroll", function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

//Determine position dynamically
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// This method works but there is better way below
const nav = document.querySelector(".nav");
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

// Passing "argument " into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

////////////////////////////////////////////
// 198 Implement sticky navigation with intersection api

// The following section was for study but afer it , you will implement sticky navigation using the intersection api
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const headerS = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerSObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerSObserver.observe(headerS);

/////////////////////////////////////////////////////
// Reveal Sections

const allSections1 = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections1.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////////////////
// Lazy Loading

const imgTarget = document.querySelectorAll("img[data-src]");
console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: "+200px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////
// Slider Functionality

const slides = document.querySelectorAll(".slide");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.5) translateX(-300px)";
// slider.style.overflow = "visible";

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}]`)
    .classList.add(".dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Enabling the left and right keys
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide();

  //Short Circuit method
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Learning stuff

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

// getting a HTML Collection different from nodes
document.getElementById("#section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName(".btn"));

// Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent = "Sucking and fucking now";
message.innerHTML =
  'Sucking and fucking now <button class="btn btn--close-cookie"> RAPE!</button>';

// This is also for moving elements
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

header.before(message);
// header.after(message);

//Deelete Elements from the dom
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    confetti({
      particleCount: 1000,
      spread: 170,
      origin: { y: 0.6 },
    });
  });

// Styles
message.style.width = "120%";
console.log(message.style.color);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Extracting the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 10 + "px";

// Custom properties = more like variables
// document.documentElement.style.setProperty("--color-primary", "#092635");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.src);

//setting attribute
logo.alt = "BootySmell";
logo.setAttribute("Type", "fetishes");

// Paths
console.log(logo.src);
console.log(logo.getAttribute("src"));

// Links
const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

// Attributes - Data Attributes
/* 
Code for working with classes 
*/
// logo.classList.add("v claz1");
// logo.classList.remove("v claz1");
// logo.classList.toggle("v claz1");
// logo.classList.contains("v claz1"); // called contain

///////////////////////////////////////
/*
190: Types of events and handlers 
- Work on that will be here 
https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
- Location of these events for study 
*/

// newer method  - can add multiple function
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEVentListener: LickPussy");
  console.log(`%c LickHerAssandAndPussy`, "color:red;font-size:5rem");

  // h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// Attaching elements - Old method
// h1.onmouseenter = function (e) {
//   alert("onMouseEnter: LickPussy");
// };

// Removing an event handler

// Another method of using HTML attribute

// /*
// 191: Event Propagation
// */
// // Creating random colors

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `
// rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})
// `;
// console.log(randomColor(0, 255));

// // attaching event
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);

//   // Stopping propogation - This will precvent others from being activated
//   e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });

// 194: Dom Traversing

const h11 = document.querySelector("h1");

//going downwards - child element
console.log(h11.querySelectorAll(".highlight"));

// Childnodes are more deailed
console.log(h11.childNodes);
console.log(h11.children);

// Note these can be done in the css but here doing it with JS instead where you can apply and remove styles
// h11.firstElementChild.style.color = "white";
// h11.lastElementChild.style.color = "black";

// Going upwards
console.log(h11.parentNode);
console.log(h11.parentElement);

// Closest method
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest(".header").style.background = "var(--gradient-primary)";

//Going sideways = Selecting siblings
console.log(h11.previousElementSibling);
console.log(h11.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//Select all siblings , go up to parent element and read all childrenf from here
// console.log(h11.parentElement.children);
// [...h11.parentElement.children].forEach(function (el) {
//   if (el !== h11) el.style.transform = "scale(0.5)";
// });
