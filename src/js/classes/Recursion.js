'use strict';
// https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion

class Recursion {
  constructor() {
    // input for this.all
    this.allArray = [1, 2, 3, 4, 5];
    // input for this.productoOfArray
    this.prodArray = [1, 2, 3, 10, 10];
    // input for this.contains
    this.nestedObject = {
      data: {
        info: {
          stuff: {
            thing: {
              moreStuff: {
                magicNumber: 44,
                something: 'foo2',
              },
            },
          },
        },
      },
    };
    // input for this.totalIntegers
    this.multiDimArray = [
      [[5], 3],
      0,
      [2, 0.5, [1, 23]],
      ['foo'],
      [],
      [4, [5, 6]],
    ];
    // input for this.sumSquares
    this.list = [3, [[3], 5], [10]];

    this.mArray = [7, 2, 4, 0, 1, 6, 3, 5];
    this.strings = [
      'cat',
      'dog',
      'fish',
      'monkey',
      'bird',
      'chicken',
      'koel',
      'zebra',
    ];

    this.xxx = this.mergeSort(this.strings);
    console.log(this.xxx);
    return this;
  }
  merge = (left, right) => {
    let sorted = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sorted.push(left.shift());
      } else {
        sorted.push(right.shift());
      }
    }
    return [...sorted, ...left, ...right];
  };
  mergeSort = (array) => {
    const mid = Math.floor(array.length / 2);
    if (array.length < 2) return array;
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  };
  // mergeSort = (array, sorted = []) => {
  //   if (array.length < 2) return array;
  //   let mid = Math.floor(array.length / 2);
  //   let left = array.slice(0, mid);
  //   let right = array.slice(mid);
  //   console.log(left);
  //   console.log(right);
  //   return this.mergeSort(left);

  // if (array.length < 2) return array;

  // left = array.splice(0, mid);
  // return this.merge(left, array);
  // return left;
  // right = mergeSort(array.slice(mid));
  // };
  // merge = (left, right) => {
  //   let sorted = [];
  //   while (left.length && right.length) {
  //     if (left[0] < right[0]) {
  //       sorted.push(left.shift());
  //     } else {
  //       sorted.push(right.shift());
  //     }
  //   }
  //   return sorted;
  // };

  sumRange = (n) => {
    if (n <= 0) return n;
    return n + this.sumRange(n - 1);
  };
  power = (n, exp) => {
    if (exp === 0) return 1;
    return n * this.power(n, exp - 1);
  };
  factorial = (n) => {
    if (n === 1) return 1;
    return n * this.factorial(n - 1);
  };
  // callback function for this.all
  lessThan = (n, check = 7) => {
    return n < check;
  };
  // returns true if every value in the array returns true when passed
  // to the callback function
  all = (array, callback) => {
    if (array.length === 0) return true;
    if (callback(array[0])) {
      array.shift();
      return this.all(array, callback);
    } else {
      return false;
    }
  };
  productOfArray = (array) => {
    if (array.length === 0) return 0;
    if (array.length === 1) return array[0];
    // array[1] = array[0] * array[1];
    // array.shift();
    return array.shift() * this.productOfArray(array);
  };
  // return true if a value exists in a nested object
  contains = (object, searchValue) => {
    if (typeof object !== 'object' || typeof object === null) {
      return object === searchValue;
    }
    for (const value of Object.values(object)) {
      if (this.contains(value, searchValue)) {
        return true;
      }
    }
    return false;
  };
  // return the total number of integers in a multi dimensional array
  totalIntegers = (array) => {
    if (array.length === 0) return 0;
    let total = 0;
    let first = array.shift();
    if (Array.isArray(first)) {
      total += this.totalIntegers(first);
    } else if (Number.isInteger(first)) {
      total += 1;
    }
    return total + this.totalIntegers(array);
  };
  // sum the squares of numbers in a list that may contain more lists
  sumSquares = (array) => {
    if (array.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        total += this.sumSquares(array[i]);
      } else {
        total += array[i] * array[i];
      }
    }
    return total;
  };
  // return an array containing x repetitions of n
  replicate = (n, x, array = []) => {
    if (x <= 0) return [];
    // array.push(n);
    // if (x === 1) return array;
    // return this.replicate(n, x - 1, array);
    return [n].concat(this.replicate(n, x - 1));
  };
}

export { Recursion };
