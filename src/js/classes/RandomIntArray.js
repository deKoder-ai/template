'use strict';

/**
 * Generate an array of random integers.
 * @param {number} min The minimum value of random number
 * @param {number} max The maximum value of random number
 * @param {number} length The length of the generated array
 * @returns {Array} An array of the specified length with values between min and max
 */
class RandomIntArray {
  constructor(min, max, length) {
    this.min = min;
    this.max = max;
    this.length = length;
    return this.generateArray();
  }
  generateArray = () => {
    const array = [];
    for (let i = 0; i < this.length; i++) {
      let int = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
      array.push(int);
    }
    return array;
  };
}

'use strict';

/**
 * Generate an array of unique random integers.
 * @param {number} min The minimum value of random number
 * @param {number} max The maximum value of random number
 * @param {number} length The length of the generated array
 * @returns {Array} An array of the specified length with values between min and max
 */
class UniqueRandomIntArray {
  constructor(min, max, length) {
    this.min = min;
    this.max = max;
    this.length = length;
    return [...this.generateArray()];
  }
  generateArray = () => {
    const set = new Set();
    while (set.size < this.length) {
      let int = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
      set.add(int);
    }
    return set;
  };
}

export { RandomIntArray, UniqueRandomIntArray };
