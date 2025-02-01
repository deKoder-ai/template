'use strict';

/**
 * Sorts an array of objects based on a specified key in ascending or descending order.
 * @param {Object[]} array - The array of objects to be sorted.
 * @param {string} key - The key of the object property to sort by.
 * @param {boolean} [order=true] - If true, sorts in ascending order. Otherwise, sorts in descending order.
 * @returns {Object[]} The sorted array of objects.
 */
const arrayObjectSort = (array, key, order = true) => {
  if (order) {
    array.sort((a, b) => a[key] - b[key]);
  } else {
    array.sort((a, b) => b[key] - a[key]);
  }
  return array;
};

export { arrayObjectSort };
