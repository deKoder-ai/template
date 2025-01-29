'use strict';

import { F } from '../classes/Functions';
import { ImageArray } from '../classes/Slideshow/ImageArray';
import { Slideshow } from '../classes/Slideshow/Slideshow';
import { Recursion } from '../classes/Recursion.js';
import { MergeSort } from '../classes/MergeSort.js';
import { binarySearch } from '../scripts/binarySearch.js';
import { LinkedList } from '../classes/LinkedList.js';
import { HashMap } from '../classes/HashMap.js';
import { UniqueRandomIntArray } from '../classes/RandomIntArray.js';
import { BinarySearchTree } from '../classes/BinarySearchTree/BinarySearchTree.js';

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

    // const ms = new MergeSort();
    // let array = [7, 2, 4, 0, 1, 6, 3, 5];
    // array = [];
    // for (let i = 0; i < 100; i++) {
    //   array.push(i);
    // }
    const strings = ['cat', 'dog', 'fish', 'monkey', 'bird', 'chicken', 'koel', 'zebra'];

    // const ll = new LinkedList(true, strings);

    // ll.toString();
    // ll.removeNodeAt(0);
    // ll.getHead();
    // ll.getTail();
    // ll.toString();

    // array = ms.mergeSort(strings);
    // result = binarySearch(array.slice(), 'zebra');
    // console.log(result.found);

    // const hm = new HashMap(0.75, 16, true);

    // const logInit = false;
    // hm.set('apple', 'red', logInit);
    // hm.set('banana', 'yellow', logInit);
    // hm.set('carrot', 'orange', logInit);
    // hm.set('dog', 'brown', logInit);
    // hm.set('elephant', 'gray', logInit);
    // hm.set('frog', 'green', logInit);
    // hm.set('grape', 'purple', logInit);
    // hm.set('hat', 'black', logInit);
    // hm.set('ice cream', 'white', logInit);
    // hm.set('jacket', 'blue', logInit);
    // hm.set('kite', 'pink', logInit);
    // hm.set('lion', 'golden', logInit);

    // const bsArray = [1, 2, 3, 4, 5, 6, 7]
    // const bsArray = new UniqueRandomIntArray(0, 100, 21);
    const bsArray = [
      6, 18, 23, 24, 25, 29, 42, 44, 49, 52, 55, 60, 63, 68, 72, 74, 77, 83, 85, 90, 96,
    ];
    const bst = new BinarySearchTree(bsArray);

    console.log(bst.array);
    const y = bst.root;
    console.log(y);
    bst.insert(-1);

    console.log(`Tree is balanced: ${bst.isBalanced()}`);

    //   console.log(bst.inOrderCallback(this.root, mul2));
    // bst.prettyPrint(bst.root)
    // bst.getHeight();
    // bst.insert(1);
    // bst.insert(2);
    // bst.insert(3);
    // bst.insert(4);
    // bst.insert(5);

    console.log(`Tree is balanced: ${bst.isBalanced()}`);

    // bst.prettyPrint();
    // console.log(bst.getHeight());
    // console.log(bst.isBalanced());

    function mul2(value) {
      return value * 10;
    }
    console.log();
    console.log(bst.levelOrderCB(mul2, true));
    bst.prettyPrint();
    console.log(`Nodes: ${bst.nodes}`)

    bst.delete(60)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(-10)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(180)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(420)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(520)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(490)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(290)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.delete(240)
    console.log(`Nodes: ${bst.nodes}`)
    console.log(`Changes: ${bst.changes}`)
    bst.prettyPrint();
    console.log(bst.isBalanced());

    // bst.prettyPrint(bst.root);

    // console.log(bst.getHeight())
    // console.log(bst.isBalanced())

    // bst.rebalance();
    // console.log(bst.getHeight())
    // console.log(bst.isBalanced())

    // bst.prettyPrint(bst.root);
    // console.log(bst.isBalanced())

    // bst.prettyPrint(bst.insert(27));
    // bst.delete(42);

    // console.log(bst.inOrder(bst.root));
    // console.log(bst.getHeight(bst.root));

    // console.log(ll.toString());
    // display.innerText = x;

    return this.home;
  }
}

export { Home };

// Issues
// - lowest number in array is missing from tree
