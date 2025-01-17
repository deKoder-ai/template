'use strict';
/**
 * Create a hamburger menu icon.
 * @param {boolean} convertToUri - IIf true, converts the string to a URI (default: true)
 * @param {string} color - Icon line color (default: 'white')
 * @param {string} fillColor - Icon fill color (default: 'none')
 * @param {string} strokeWidth - Icon stroke width (default: '2')
 * @param {string} linecap - Stroke linecap type: 'butt', 'round', or 'square' (default: 'round')
 * @returns {string} The XVG or URI string of the icon
 */
function hamburger(
  convertToUri = true,
  color = 'white',
  fillColor = 'none',
  strokeWidth = '2',
  linecap = 'round',
) {
  const iconString = `<svg xmlns="http://www.w3.org/2000/svg" 
    width="60" 
    height="60" 
    stroke="${color}" 
    fill="${fillColor}" 
    stroke-width="${strokeWidth}" 
    stroke-linecap="${linecap}" 
    viewBox="0 0 24 24" 
    stroke-linejoin="round" 
    class="feather feather-menu">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>`;

  if (convertToUri) {
    return `url("data:image/svg+xml,${encodeURIComponent(iconString)}")`;
  } else {
    return iconString
  }
}

export { hamburger };
