'use strict';

/**
 * Sort an array using the merge sort algorithm.
 * @param {Array} array - An unsorted array
 * @returns {Array} A sorted array
 */
class MergeSort {
  constructor() {
    return this;
  }
  mergeSort = (array) => {
    const mid = Math.floor(array.length / 2);
    if (array.length < 2) return array;
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  };
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
}

export { MergeSort };
