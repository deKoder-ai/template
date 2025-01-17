'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import { F, HtmlElement } from './js/Functions.js';
import { NavigationBar } from './js/NavigationBar/NavigationBar.js';
// import { clickEvents, keydownEvents } from './js/globalEvents.js';

import { greeting } from './greeting.js';
import odinImage from './img/odin-lined.png';

// import { showSlides } from './js/slideshowW3.js';

import { createSlideshow } from './js/Slideshow/slideshow.js';
import { Dropdown } from './js/Dropdown/Dropdown.js';
import { hamburger } from './js/Hamburger.js';
import { chevrons } from './js/Chevrons.js';

// dev
function dev() {
  console.log(greeting);
  F.addOutlineToAllElements(false);
  document.addEventListener('click', (e) => {
    console.log(e.target);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  dev();

  console.log('DOM fully loaded and parsed.');
  
  const html = document.querySelector('html');
  const baseFontSize = Number(window.getComputedStyle(html).fontSize.match(/\d+/g));
  const content = document.getElementById('content');

  const navBtns = ['Home', 'About', 'Login', 'Sign Up', 'Whatever'];
  const navigationBar = new NavigationBar(5, navBtns, true, baseFontSize);
  content.appendChild(navigationBar);




  // const slideshow = createSlideshow('600px', '400px', true, 5);

  // showSlides();

  // new F.EventHandler(clickEvents, 'click');
  // new F.EventHandler(keydownEvents, 'keydown');

  // const image = document.createElement("img");
  // image.src = odinImage;
  // content.appendChild(image);
});

F.cl('wtf');

// import ss1 from "./img/odin-lined.png";
// const ss1img = document.createElement("img");
// image.src =


//  - Replaced the dropdown menu in NavigationBar.js with the new class of Dropdown.js
//  - Converted NavigationBar.js to a class
//  - Added JSDoc to NavigationBar.js
//  - Added JSDoc to Dropdown.js
//  - Separated the dropdown settings to Settings.js to make them easier to find and edit