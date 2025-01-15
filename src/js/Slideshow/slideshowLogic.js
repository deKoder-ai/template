'use strict';

import { F } from '../Functions';
import { imageArray } from './slideshowImages.js';
import styles from './slideshow.css';
console.log(styles);

const slideshowLogic = {
  container: undefined,
  images: undefined,
  imgArrLength: undefined,
  index: 0,
  dotsArray: [],
  createContainer(width, height) {
    const container = F.htmlElement(
      'div',
      '',
      'ss-border-radius',
      'slideshow-container',
    );
    container.style.width = width;
    container.style.height = height;
    this.container = container;
  },
  addImagesToContainer() {
    this.images = imageArray(this.container);
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].id = `ss-img-${i}`;
      this.images[i].style.display = 'none';
      this.container.appendChild(this.images[i]);
    }
    this.images[0].style.display = 'block';
  },
  createImgNavigationBtns() {
    const leftBtn = F.htmlElement('button', '', 'ss-btn', 'ss-btn-left');
    const rightBtn = F.htmlElement('button', '', 'ss-btn', 'ss-btn-right');
    this.container.appendChild(leftBtn);
    this.container.appendChild(rightBtn);
  },
  createImgNavigationDots() {
    const dotsContainer = F.htmlElement('div', '', '', 'ss-dots-container');
    for (let i = 0; i < this.images.length; i++) {
      let dot = F.htmlElement('button', '', 'ss-dot', `ss-dot-${i}`);
      this.dotsArray.push(dot);
    }
    this.dotsArray[0].classList.add('ss-dot-selected');
    for (let dot of this.dotsArray) {
      dotsContainer.appendChild(dot);
    }
    this.container.appendChild(dotsContainer);
  },
  wrapIndex() {
    if (this.index >= this.images.length) {
      this.index = 0;
    } else if (this.index < 0) {
      this.index = this.images.length - 1;
    }
  },
  displayImage() {
    for (let img of this.images) {
      img.style.display = 'none';
    }
    this.images[this.index].style.display = 'block';
  },
  highlightDot() {
    for (let dot of this.dotsArray) {
      dot.classList.remove('ss-dot-selected');
    }
    this.dotsArray[this.index].classList.add('ss-dot-selected');
  },
  clickLogic(e) {
    const id = e.target.id;
    if (id === 'ss-btn-left') {
      ss.index--;
    } else if (id === 'ss-btn-right') {
      ss.index++;
    }
    const splitId = id.split('-');
    if (splitId[1] === 'dot') {
      ss.index = Number(splitId[2]);
    }
    this.wrapIndex();
    this.displayImage();
    this.highlightDot();
  },
  autoSlideChange(auto, interval) {
    if (auto) {
      interval = interval * 1000; // convert to ms
      function incrementIndex() {
        this.index++;
        this.wrapIndex();
        this.displayImage();
        this.highlightDot();
      }
      setInterval(incrementIndex.bind(ss), interval);
    }
  },
};

const slideshow = slideshowLogic;

export { slideshow };