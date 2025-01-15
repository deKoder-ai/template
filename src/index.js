"use strict";
import "./css/poppins.css";
import "./css/reset.css";
import "./css/styles.css";
import "./css/nav.css";
import { F, HtmlElement } from "./js/Functions.js";
import { navBar } from "./js/nav.js";
import { clickEvents, keydownEvents } from "./js/globalEvents.js";

import { greeting } from "./greeting.js";
import odinImage from "./img/odin-lined.png";

// import { showSlides } from './js/slideshowW3.js';

import { createSlideshow } from './js/Slideshow/slideshow.js';

// dev
function dev() {
  console.log(greeting);
  F.addOutlineToAllElements(false);
}


document.addEventListener("DOMContentLoaded", () => {

  dev();

  console.log("DOM fully loaded and parsed.");
  const contentDiv = document.getElementById("content");

  const slideshow = createSlideshow('600px', '400px', true, 5);

  contentDiv.appendChild(slideshow);
  // showSlides();

  navBar.addToDOM();
  new F.EventHandler(clickEvents, "click");
  new F.EventHandler(keydownEvents, "keydown");


  // const image = document.createElement("img");
  // image.src = odinImage;
  // contentDiv.appendChild(image);


});

F.cl("wtf");



// import ss1 from "./img/odin-lined.png";
// const ss1img = document.createElement("img");
// image.src =  