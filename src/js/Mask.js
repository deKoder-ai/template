'use strict';
import { F } from './Functions';

/**
 * Applies a mask to the page.
 * @param {string} item - A hex color value
 * @param {number} item - Opacity value between 0 & 1
 * @returns {Object} An instance of Mask
 */
class Mask {
  constructor(color, opacity) {
    this.color = F.addOpacityToHexColor(color, opacity); //color;
    this.opacity = opacity;
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
    mask.addEventListener('mousedown', (e) => {
      if (e.target.id === 'mask') {
        this.remove();
      }
    });
    mask.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.remove();
      }
    });
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
