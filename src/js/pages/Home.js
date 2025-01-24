'use strict';

import { F } from '../classes/Functions';
import { ImageArray } from '../classes/Slideshow/ImageArray';
import { Slideshow } from '../classes/Slideshow/Slideshow';
import { Recursion } from '../classes/Recursion.js';
import { MergeSort } from '../classes/MergeSort.js'

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
    const display = F.htmlElement('h1', 'asdfasdfa');
    // display.style.margin = '0rem 0rem 0rem -70rem';
    display.style.fontWeight = '400';
    this.home.appendChild(display);
    const r = new Recursion();

    let result;
    let arr;
    // result = r.sumRange(3);
    // result = r.power(3, 3);
    // result = r.factorial(6);
    // result = r.all(r.allArray.slice(), r.lessThan)
    // result = r.productOfArray(r.prodArray);
    // result = r.contains(r.nestedObject, 44);
    // result = r.totalIntegers(r.multiDimArray);
    // result = r.sumSquares(r.list);
    // result = r.replicate(5, 3);

    const ms = new MergeSort();
    const array = [7, 2, 4, 0, 1, 6, 3, 5];
    const strings = [
      'cat',
      'dog',
      'fish',
      'monkey',
      'bird',
      'chicken',
      'koel',
      'zebra',
    ];
    result = ms.mergeSort(strings);
    console.log(result);
    display.innerText = result;

    return this.home;
  }
}

export { Home };
