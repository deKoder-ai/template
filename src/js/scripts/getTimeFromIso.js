'use strict';

/**
 * Calculate the time from an ISO date object.
 * @param {Object} iso - The ISO date object
 * @returns {string} The relevant time as 24h HH:mm
 */
const getTimeFromIso = (iso) => {
  const datetime = new Date(iso);
  const time = datetime.toLocaleString('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return time;
};

export { getTimeFromIso };
