'use strict';

const xml = {
  upDbl: `class="feather feather-chevrons-up">
    <polyline points="17 11 12 6 7 11"></polyline>
    <polyline points="17 18 12 13 7 18"></polyline>`,
  rightDbl: `class="feather feather-chevrons-right">
    <polyline points="13 17 18 12 13 7"></polyline>
    <polyline points="6 17 11 12 6 7"></polyline>`,
  downDbl: `class="feather feather-chevrons-down">
    <polyline points="7 13 12 18 17 13"></polyline>
    <polyline points="7 6 12 11 17 6"></polyline>`,
  leftDbl: `class="feather feather-chevrons-left">
    <polyline points="11 17 6 12 11 7"></polyline>
    <polyline points="18 17 13 12 18 7"></polyline>`,
  upSingle: `class="feather feather-chevron-up">
  <polyline points="18 15 12 9 6 15"></polyline>`,
  rightSingle: `class="feather feather-chevron-right">
  <polyline points="9 18 15 12 9 6"></polyline>`,
  downSingle: `class="feather feather-chevron-down">
  <polyline points="6 9 12 15 18 9"></polyline>`,
  leftSingle: `class="feather feather-chevron-left">
  <polyline points="15 18 9 12 15 6"></polyline>`,
};

/**
 * Create a hamburger menu icon.
 * @param {boolean} convertToUri - If true, converts the string to a URI (default: true)
 * @param {string} type - Chevron type: 'single', or 'double' (default: 'double')
 * @param {string} direction - Chevron direction: 'up', 'right', 'down', 'left' (default: 'down')
 * @param {string} color - Icon line color (default: 'white')
 * @param {string} fillColor - Icon fill color (default: 'none')
 * @param {string} strokeWidth - Icon stroke width (default: '2')
 * @param {string} linecap - Stroke linecap type: 'butt', 'round', or 'square' (default: 'round')
 * @returns {string} The XVG or URI string of the icon
 */
function chevrons(
  convertToUri = true,
  direction = 'down',
  type = 'double',
  color = 'white',
  fillColor = 'none',
  strokeWidth = '2',
  linecap = 'round',
) {
  let typeXml = xml.upSingle;
  if (type === 'single') {
    switch (direction) {
      case 'up':
        typeXml = xml.upSingle;
        break;
      case 'right':
        typeXml = xml.rightSingle;
        break;
      case 'down':
        typeXml = xml.downSingle;
        break;
      case 'left':
        typeXml = xml.leftSingle;
        break;
    }
  } else if (type === 'double') {
    switch (direction) {
      case 'up':
        typeXml = xml.upDbl;
        break;
      case 'right':
        typeXml = xml.rightDbl;
        break;
      case 'down':
        typeXml = xml.downDbl;
        break;
      case 'left':
        typeXml = xml.leftDbl;
        break;
    }
  } else {
    console.log(`type must be 'single' or 'double'`);
  }

  const iconString = `<svg xmlns="http://www.w3.org/2000/svg" 
    width="60" 
    height="60" 
    stroke="${color}" 
    fill="${fillColor}" 
    stroke-width="${strokeWidth}" 
    stroke-linecap="${linecap}" 
    viewBox="0 0 24 24" 
    stroke-linejoin="round" 
    ${typeXml}
    </svg>`;

  if (convertToUri) {
    return `url("data:image/svg+xml,${encodeURIComponent(iconString)}")`;
  } else {
    return iconString;
  }
}

export { chevrons };
