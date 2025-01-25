'use strict';

import { F } from '../classes/Functions';
import { ImageArray } from '../classes/Slideshow/ImageArray';
import { Slideshow } from '../classes/Slideshow/Slideshow';
import { Recursion } from '../classes/Recursion.js';
import { MergeSort } from '../classes/MergeSort.js';
import { binarySearch } from '../scripts/binarySearch.js';
import { LinkedList } from '../classes/LinkedList.js';
import { HashMap } from '../classes/HashMap.js';

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
    let array = [7, 2, 4, 0, 1, 6, 3, 5];
    array = [];
    for (let i = 0; i < 100; i++) {
      array.push(i);
    }
    const strings = ['cat', 'dog', 'fish', 'monkey', 'bird', 'chicken', 'koel', 'zebra'];

    // array = ms.mergeSort(strings);
    // result = binarySearch(array.slice(), 'zebra');
    // console.log(result.found);

    const hm = new HashMap(0.75, 16, true);

    const logInit = true;
    hm.set('apple', 'red', logInit);
    hm.set('banana', 'yellow', logInit);
    hm.set('carrot', 'orange', logInit);
    hm.set('dog', 'brown', logInit);
    hm.set('elephant', 'gray', logInit);
    hm.set('frog', 'green', logInit);
    hm.set('grape', 'purple', logInit);
    hm.set('hat', 'black', logInit);
    hm.set('ice cream', 'white', logInit);
    hm.set('jacket', 'blue', logInit);
    hm.set('kite', 'pink', logInit);
    hm.set('lion', 'golden', logInit);

    hm.checkBuckets();
    hm.set('kite', 'monkey', true);
    hm.set('a', 'disco', true);
    hm.get('lion', true);
    hm.has('hat', true);
    // hm.remove('xyz') // tbd
    hm.length(true);
    hm.keys(true);
    hm.values(true);
    hm.entries(true);
    hm.clear(true);


    // console.log(ll.toString());
    // display.innerText = x;

    return this.home;
  }
}

export { Home };
