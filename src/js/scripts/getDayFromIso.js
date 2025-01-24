'use strict';

/**
 * Calculate the day from an ISO date object.
 * @param {Object} iso - The ISO date object
 * @returns {string} The relevant day of the week
 */
const getDayFromIso = (iso) => {
  const datetime = new Date(iso);
  const day = datetime.toLocaleString('default', { weekday: 'long' });
  return day;
};

export { getDayFromIso };
