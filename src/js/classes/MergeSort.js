'use strict';

/**
 * Sort an array using the merge sort algorithm.
 * @param {Array} array - An unsorted array
 * @returns {Array} A sorted array
 */
class MergeSort {
  mergeSort(array) {
    if (array.length < 2) return array;  // Base case: no need to sort
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }
  merge(left, right) {
    let sorted = [];
    let leftIndex = 0;
    let rightIndex = 0;
    // Compare elements and merge in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        sorted.push(left[leftIndex]);
        leftIndex++;
      } else {
        sorted.push(right[rightIndex]);
        rightIndex++;
      }
    }
    // Concatenate remaining elements, if any
    return sorted.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
}

export { MergeSort };

// Original
// class MergeSort {
//   mergeSort = (array) => {
//     const mid = Math.floor(array.length / 2);
//     if (array.length < 2) return array;
//     const left = array.slice(0, mid);
//     const right = array.slice(mid);
//     return this.merge(this.mergeSort(left), this.mergeSort(right));
//   };
//   merge = (left, right) => {
//     let sorted = [];
//     while (left.length && right.length) {
//       if (left[0] < right[0]) {
//         sorted.push(left.shift());
//       } else {
//         sorted.push(right.shift());
//       }
//     }
//     return [...sorted, ...left, ...right];
//   };
// }

// export { MergeSort };
