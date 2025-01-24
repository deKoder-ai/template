'use strict';

/**
 * Convert wind speed from kph to Beaufort Scale.
 * @param {number} kph - Wind speed in kilometers per hour
 * @returns {number} The equivalent Beaufort Scale value
 */
const kphToBeaufort = (kph) => {
  if (kph < 1) return 0;
  if (kph < 5) return 1;
  if (kph < 11) return 2;
  if (kph < 19) return 3;
  if (kph < 29) return 4;
  if (kph < 41) return 5;
  if (kph < 54) return 6;
  if (kph < 69) return 7;
  if (kph < 88) return 8;
  if (kph < 107) return 9;
  if (kph < 127) return 10;
  if (kph < 147) return 11;
  return 12;
};

export { kphToBeaufort };
