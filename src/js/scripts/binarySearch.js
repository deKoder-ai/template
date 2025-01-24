'use strict'

/**
 * Search an array for a given value. The array must be sorted beforehand.
 * 
 * Uses the binary search algorithm - O(log N) time complexity
 * @param {Array} array - The sorted array to be searched
 * @param {any} searchValue - The string or number to search for
 * @returns {boolean} Returns true if the search value is contained in the array, false otherwise
 */
const binarySearch = (array, searchValue, steps = 0) => {
  let mid = Math.floor((array.length) / 2);
  let status = false;
  if (array[mid] === searchValue) {
    status = true;
  } else if (array.length < 2) {
    return false;
  }
  if (array[mid] > searchValue) {
    array = array.slice(0, mid);
  } else {
    array = array.slice(mid);
  }
  steps++;
  if (status === true) {
    console.log(`${steps} steps to find ${searchValue}`);
    return true;
  }
  return binarySearch(array, searchValue, steps);
}
  
export { binarySearch };
