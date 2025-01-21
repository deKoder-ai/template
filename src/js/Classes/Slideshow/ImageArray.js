'use strict';
import { F } from '../../Functions';

import ss1 from './img/ss-1.jpg';
import ss2 from './img/ss-2.jpg';
import ss3 from './img/ss-3.jpg';
import ss4 from './img/ss-4.jpg';
import ss5 from './img/ss-5.jpg';
import ss6 from './img/ss-6.jpg';
import ss7 from './img/ss-7.jpg';
import ss8 from './img/ss-8.jpg';

/**
 * Create an array of images.
 * @returns {Object} The array of images
 */
class ImageArray {
  constructor() {
    this.images = [];
    this.createImg = function (source) {
      let image = F.htmlElement('img', '', [
        'ss-img',
        'ss-border-radius',
        'fade',
      ]);
      image.src = source;
      this.images.push(image)
    };
    this.ssImg1 = this.createImg(ss1);
    this.ssImg2 = this.createImg(ss2);
    this.ssImg3 = this.createImg(ss3);
    this.ssImg4 = this.createImg(ss4);
    this.ssImg5 = this.createImg(ss5);
    this.ssImg6 = this.createImg(ss6);
    this.ssImg7 = this.createImg(ss7);
    this.ssImg8 = this.createImg(ss8);

    return this.images;
  }
}

export { ImageArray };
