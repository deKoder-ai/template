'use strict';

/**
 * Calculate compass heading from degrees.
 * @param {number} degrees - Degrees
 * @param {boolean} abbrev - Toggle abbreviation of compass headings
 * @returns {string} Compass heading
 */
const degToCompass = (degrees, abbrev) => {
  const val = Math.floor(degrees / 22.5 + 0.5);
  let arr
  if (abbrev) {
    arr = [
      'N',
      'N/NE',
      'NE',
      'E/NE',
      'E',
      'E/SE',
      'SE',
      'S/SE',
      'S',
      'S/SW',
      'SW',
      'W/SW',
      'W',
      'W/NW',
      'NW',
      'N/NW',
    ];
  } else {
    arr = [
      'North',
      'North/Northeast',
      'Northeast',
      'East/Northeast',
      'East',
      'East/Southeast',
      'Southeast',
      'South/Southeast',
      'South',
      'South/Southwest',
      'Southwest',
      'West/Southwest',
      'West',
      'West/Northwest',
      'Northwest',
      'North/Northwest',
    ];
  }

  return arr[val % 16];
};

export { degToCompass };
