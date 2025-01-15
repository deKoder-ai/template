'use strict';

import { slideshow } from './slideshowLogic.js';
import { F } from '../Functions.js';

/**
 * Create a new slideshow.
 * @param {string} width - Slideshow container width - accepts any valid CSS width parameters
 * @param {string} height - Slideshow container height - accepts any valid CSS height parameters
 * @param {boolean} auto - If true, moves the slideshow forward every (interval) seconds
 * @param {number} interval - Time in seconds waited before moving to the next slide if auto is true
 * @returns {Object} A div element containing the slideshow
 */
function createSlideshow(
  width = '600px',
  height = '400px',
  auto = true,
  interval = 5,
) {
  slideshow.createContainer(width, height);
  slideshow.addImagesToContainer();
  slideshow.createImgNavigationBtns();
  slideshow.createImgNavigationDots();
  new F.EventHandler(slideshow.clickLogic.bind(slideshow), 'click');
  slideshow.autoSlideChange(auto, interval);

  return slideshow.container;
}

export { createSlideshow };