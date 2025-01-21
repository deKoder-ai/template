'use strict';
import { F } from '../Functions';

/**
 * Applies a mask to the page.
 * @param {string} color - A hex color value
 * @param {number} opacity - Opacity value between 0 & 1
 * @param {boolean} click - Add an event listener to close the mask when it is clicked
 * @param {boolean} keydown - Add an event listener to close the mask when escape is pressed
 * @returns {Object} An instance of Mask
 */
class Mask {
  constructor(color, opacity, click = true, keydown = true) {
    this.color = F.addOpacityToHexColor(color, opacity); //color;
    this.opacity = opacity;
    this.click = click;
    this.keydown = keydown;
    this.mask = undefined;
    return this;
  }
  style() {
    this.mask.style.position = 'fixed';
    this.mask.style.display = 'flex';
    this.mask.style.justifyContent = 'center';
    this.mask.style.alignItems = 'center';
    this.mask.style.top = '0px';
    this.mask.style.left = '0px';
    this.mask.style.backgroundColor = this.color;
    this.mask.style.width = '100vw';
    this.mask.style.height = '100vh';
    this.mask.style.overflow = 'hidden';
    this.mask.style.zIndex = 500000;
  }
  create() {
    this.mask = F.htmlElement('div', '', '', 'mask');
    this.style();
    document.body.appendChild(this.mask);
    const mask = document.getElementById('mask');
    if (this.click) {
      mask.addEventListener('mousedown', (e) => {
        if (e.target.id === 'mask') {
          this.remove();
        }
      });
    }
    if (this.keydown) {
      mask.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.remove();
        }
      });
  }
  }
  remove() {
    const mask = document.getElementById('mask');
    mask.removeEventListener('mousedown', (e) => {
      if (e.target.id === 'mask') {
        this.remove();
      }
    });
    mask.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.remove();
      }
    });
    mask.remove();
  }
}

export { Mask };
