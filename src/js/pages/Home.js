'use strict';

import { F } from '../classes/Functions';
import { ImageArray } from '../classes/Slideshow/ImageArray';
import { Slideshow } from '../classes/Slideshow/Slideshow';

import { Battleship } from './battleship/Battleship.js'

class Home {
  constructor(content) {
    console.log('home at last');
    content.innerHTML = '';
    this.home = F.htmlElement('div', '', '', 'home-page');

    // slideshow
    // this.ssImages = new ImageArray();
    // this.slideshow = new Slideshow(this.ssImages, '600px', '400px', true, 5);
    // this.home.appendChild(this.slideshow);

 
    const bs = new Battleship();
    content.innerHTML = bs.html;
    bs.build();

    return this.home;
  }
}

export { Home };

// Issues
// - lowest number in array is missing from tree
