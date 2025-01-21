'use strict';

import { F } from '../../Functions';
import './slideshow.css';


/**
 * Create a slideshow.
 * @param {Array} array - The array of images to be used for the slideshow
 * @param {string} width - Slideshow container width - accepts any valid CSS width parameters
 * @param {string} height - Slideshow container height - accepts any valid CSS height parameters
 * @param {boolean} auto - If true, moves the slideshow forward every (interval) seconds
 * @param {number} interval - Time in seconds waited before moving to the next slide if auto is true
 * @returns {Object} A div element containing the slideshow
 */
class Slideshow {
  constructor(
    array,
    width = '600px',
    height = '400px',
    auto = true,
    interval = 5,
  ) {
    this.index = 0;
    this.dotsArray = [];
    this.createContainer = function (width, height) {
      const container = F.htmlElement(
        'div',
        '',
        'ss-border-radius',
        'slideshow-container',
      );
      container.style.width = width;
      container.style.height = height;
      this.container = container;
    };
    this.addImagesToContainer = function () {
      this.images = array;
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].id = `ss-img-${i}`;
        this.images[i].style.display = 'none';
        this.container.appendChild(this.images[i]);
      }
      this.images[0].style.display = 'block';
    };
    this.createImgNavigationBtns = function () {
      const leftBtn = F.htmlElement('button', '', 'ss-btn', 'ss-btn-left');
      const rightBtn = F.htmlElement('button', '', 'ss-btn', 'ss-btn-right');
      this.container.appendChild(leftBtn);
      this.container.appendChild(rightBtn);
    };
    this.createImgNavigationDots = function () {
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
    };
    this.wrapIndex = function () {
      if (this.index >= this.images.length) {
        this.index = 0;
      } else if (this.index < 0) {
        this.index = this.images.length - 1;
      }
    };
    this.displayImage = function () {
      for (let img of this.images) {
        img.style.display = 'none';
      }
      this.images[this.index].style.display = 'block';
    };
    this.highlightDot = function () {
      for (let dot of this.dotsArray) {
        dot.classList.remove('ss-dot-selected');
      }
      this.dotsArray[this.index].classList.add('ss-dot-selected');
    };
    this.clickLogic = function (e) {
      const id = e.target.id;
      if (id === 'ss-btn-left') {
        this.index--;
      } else if (id === 'ss-btn-right') {
        this.index++;
      }
      const splitId = id.split('-');
      if (splitId[1] === 'dot') {
        this.index = Number(splitId[2]);
      }
      this.wrapIndex();
      this.displayImage();
      this.highlightDot();
    };
    this.autoSlideChange = function (auto, interval) {
      if (auto) {
        interval = interval * 1000; // convert to ms
        function incrementIndex() {
          this.index++;
          this.wrapIndex();
          this.displayImage();
          this.highlightDot();
        }
        setInterval(incrementIndex.bind(this), interval);
      }
    };
    // build
    this.createContainer(width, height);
    this.addImagesToContainer();
    this.createImgNavigationBtns();
    this.createImgNavigationDots();
    new F.EventHandler(this.clickLogic.bind(this), 'click');
    this.autoSlideChange(auto, interval);
    this.container.classList.add('slideshowCss');
    return this.container;
  }
}

export { Slideshow };
