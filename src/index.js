'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import { F, HtmlElement } from './js/Functions.js';
import { navBar } from './js/nav.js';
import { clickEvents, keydownEvents } from './js/globalEvents.js';

import { greeting } from './greeting.js';
import odinImage from './img/odin-lined.png';

// import { showSlides } from './js/slideshowW3.js';

import { createSlideshow } from './js/Slideshow/slideshow.js';
// import { Dropdown } from './js/DropdownBtn/dropdownBtn.js';
import { Dropdown } from './js/DropdownBtn/dropdownBtnv2.js';
import { hamburger } from './js/DropdownBtn/hamburger.js';
import { chevrons } from './js/DropdownBtn/chevrons.js';

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
  const contentDiv = document.getElementById('content');
  const ddm = document.getElementById('ddm');

  const ddSettings = {
    id: 'dd',
    text: '',
    // replace ddm ↓ with the dropdown menu container reference
    size: { width: ddm.offsetWidth, height: ddm.offsetHeight },
    alignment: 'right',
    menuWidth: 200, // px
    menuItems: [
      `About`,
      `Contact`,
      `Gallery`,
      `Menu`,
      `Backup`,
      `Login`,
      `Sign Up`,
    ],
    images: {
      initial: hamburger(true, '#ffffff', 'none', '2', 'round'),
      hover: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      focus: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      open: chevrons(true, 'down', 'double', '#ffffff', 'none', '2', 'round'),
    },
    dropOnHover: true,
  };

  const dropdownBtn = new Dropdown(ddSettings);
  // document.addEventListener('focus', (e) => {
  //   console.log(e.target);
  //   styleBtnFocus(dropdown.button);
  // });

  // const slideshow = createSlideshow('600px', '400px', true, 5);

  ddm.appendChild(dropdownBtn);
  // showSlides();

  navBar.addToDOM();
  new F.EventHandler(clickEvents, 'click');
  new F.EventHandler(keydownEvents, 'keydown');

  // const image = document.createElement("img");
  // image.src = odinImage;
  // contentDiv.appendChild(image);
});

F.cl('wtf');

// import ss1 from "./img/odin-lined.png";
// const ss1img = document.createElement("img");
// image.src =
