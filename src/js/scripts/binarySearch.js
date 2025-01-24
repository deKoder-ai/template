'use strict';

/**
 * Search an array for a given value. The array must be sorted beforehand.
 *
 * Uses the binary search algorithm - O(log N) time complexity
 * @param {Array} array - The sorted array to be searched
 * @param {any} searchValue - The string or number to search for
 * @returns {Object} Object: found, searchedFor, index, steps to find
 */
const binarySearch = (array, searchValue, steps = 0, index = 0) => {
  let mid = Math.floor(array.length / 2);
  let status = false;
  if (array[mid] === searchValue) {
    status = true;
  } else if (array.length < 2) {
    return { 
      found: false,
      searchedFor: searchValue,
      index: undefined, 
      steps: steps };
  }
  if (array[mid] > searchValue) {
    array = array.slice(0, mid);
  } else {
    array = array.slice(mid);
    index += mid;
  }
  steps++;
  if (status === true) {
    console.log(`Index: ${index} = ${array[0]}`);
    console.log(`${steps} steps to find`);
    return { 
      found: true,
      searchedFor: array[0],
      index: index, 
      steps: steps };
  }
  return binarySearch(array, searchValue, steps, index);
};

export { binarySearch };
