'use strict';

/**
 * Asynchronously pauses execution for a specified duration, then invokes a callback function
 * with the provided arguments.
 * @param {number} ms - The duration in milliseconds to pause execution
 * @param {function} callback - The function to be invoked after the delay
 * @param {...*} ...args - Variable number of arguments to be passed to the callback function
 * @returns {*} The result of the callback function.
 */
const asyncPause = async (ms, callback, ...args) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return callback(...args);
};

export { asyncPause };
