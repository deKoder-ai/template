'use strict'
import { F } from '../Functions';

const slideshowLogic = {
  container: undefined,
  imgArrLength: undefined,
  index: 0,
  dotsArray: [],
  createSlideshowContainer(width, height) {
    const container = F.htmlElement('div', '', 'ss-border-radius', 'slideshow-container');
    container.style.width = width;
    container.style.height = height;
    this.container = container;
  },
  createImgNavBtns() {
    const leftBtn = F.htmlElement('div', '', 'ss-btn', 'ss-btn-left');
    const rightBtn = F.htmlElement('div', '', 'ss-btn', 'ss-btn-right');
    this.container.appendChild(leftBtn);
    this.container.appendChild(rightBtn);
  },
  imgNavDots(imagesArrLength) {
    const dotsContainer = F.htmlElement('div', '', '', 'ss-dots-container');
    F.cl(imagesArrLength);
    for (let i = 0; i < imagesArrLength; i++) {
      let dot = F.htmlElement('div', '', 'ss-dot', `ss-dot-${i}`);
      this.dotsArray.push(dot);
    }
    F.cl(this.dotsArray);
    this.dotsArray[0].classList.add('ss-dot-selected');
    for (let dot of this.dotsArray) {
      dotsContainer.appendChild(dot);
    }
    this.container.appendChild(dotsContainer);
  },
  indexContain(imagesArrLength) {
    if (this.index >= imagesArrLength) {
      this.index = 0;
    } else if (index < 0) {
      this.index = imagesArrLength - 1;
    }
  },
  displayImage(images) {
    for (let img of images) {
      img.style.display = 'none';
    }
    images[this.index].style.display = 'block';
  },
  highlightDot() {
    for(let dot of this.dotsArray) {
      dot.classList.remove('ss-dot-selected');
    }
    this.dotsArray[this.index].classList.add('ss-dot-selected');
  },

  autoSlideChange(auto, interval) {
    if (auto) {
      function incrementIndex() {
        this.index++;
        this.indexContain();
        this.displayImage();
        this.highlightDot();
      }
      setInterval (incrementIndex, interval);
    }
  },
}


const ss = slideshowLogic;

export { ss }