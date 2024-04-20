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

/// Adding the funny noise script
const funnyNoise = document.getElementById("funny-noise");

window.addEventListener("wheel", function (event) {
  // Check if the audio is already playing to prevent multiple instances
  if (!funnyNoise.paused && funnyNoise.currentTime > 0 && !funnyNoise.ended) {
    return;
  }

  // Reset the audio to the beginning and play it
  funnyNoise.currentTime = 0;
  funnyNoise.play();
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
