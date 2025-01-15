'use strict';

import { ssImageArray } from './slideshowImages.js';
import slideshowCss from './slideshow.css';

import { F } from '../Functions.js';

function createSlideshow(ssWidth, ssHeight, auto, interval) {
  interval = interval * 1000;
  // slideshow container
  const container = F.htmlElement('div', '', 'ss-border-radius', 'slideshow-container');
  container.style.width = ssWidth;
  container.style.height = ssHeight;

  // image array
  const images = ssImageArray(container);

  // image navigation buttons
  const leftBtn = F.htmlElement('div', '', 'ss-btn', 'ss-btn-left');
  const rightBtn = F.htmlElement('div', '', 'ss-btn', 'ss-btn-right');
  container.appendChild(leftBtn);
  container.appendChild(rightBtn);

  // image navigation dots
  const dotsContainer = F.htmlElement('div', '', '', 'ss-dots-container');
  const dotsArray = [];
  for (let i = 0; i < images.length; i++) {
    let dot = F.htmlElement('div', '', 'ss-dot', `ss-dot-${i}`);
    dotsArray.push(dot);
  }
  dotsArray[0].classList.add('ss-dot-selected');
  for (let dot of dotsArray) {
    dotsContainer.appendChild(dot);
  }
  container.appendChild(dotsContainer);

  // slideshow logic
  let index = 0;
  function indexContain() {
    if (index >= images.length) {
      index = 0;
    } else if (index < 0) {
      index = images.length - 1;
    }
  }
  function displayImage(i) {
    for (let img of images) {
      img.style.display = 'none';
    }
    images[index].style.display = 'block';
  }
  function highlightDot() {
    for(let dot of dotsArray) {
      dot.classList.remove('ss-dot-selected');
    }
    dotsArray[index].classList.add('ss-dot-selected');
  }

  // handle click events
  container.addEventListener('click', (e) => {
    const id = e.target.id;
    if (id === 'ss-btn-left') {
      index--;
    } else if (id === 'ss-btn-right') {
      index++;
    }
    const splitId = id.split('-');
    console.log(splitId);
    if (splitId[1] === 'dot') {
      index = Number(splitId[2]);
      console.log(splitId);
      console.log(index);
    }
    indexContain();
    displayImage();
    highlightDot();
    console.log(`Slideshow Index: ${index}`);
  });

  // automatically change slide
  if (auto) {
    function incrementIndex() {
      index++;
      indexContain();
      displayImage();
      highlightDot();
    }
    setInterval (incrementIndex, interval);
  }

  return container;
}

export { createSlideshow };
