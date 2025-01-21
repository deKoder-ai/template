'use strict';

import { F } from '../Functions';
import { ImageArray } from '../Classes/Slideshow/ImageArray';
import { Slideshow } from '../Classes/Slideshow/Slideshow';

class Home {
  constructor(content) {
    console.log('home at last');
    content.innerHTML = '';
    this.home = F.htmlElement('div', '', '', 'home-page');

    // slideshow
    // this.ssImages = new ImageArray();
    // this.slideshow = new Slideshow(this.ssImages, '600px', '400px', true, 5);
    // this.home.appendChild(this.slideshow);

    // testing

    return this.home;
  }
}

export { Home };
