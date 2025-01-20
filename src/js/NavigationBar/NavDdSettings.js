'use strict'

import { hamburger } from '../Hamburger.js';
import { chevrons } from '../Chevrons.js';

class NavDdSettings {
  constructor(height, baseFontSize) {
    this.id = 'navbar-dd';
    this.text = '';
    this.size = { width: height * baseFontSize, height: height * baseFontSize - 2 };
    this.alignment = 'right';
    this.menuWidth = 200; // px
    this.menuItems = [
      `Profile`,
      `Contact`,
      `Gallery`,
      `Latest Stories`,
      `Backup`,
      `Settings`,
      `Sign Out`,
    ];
    this.images = {
      initial: hamburger(true, '#ffffff', 'none', '2', 'round'),
      hover: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      focus: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      open: chevrons(true, 'down', 'double', '#ffffff', 'none', '2', 'round'),
    };
    this.dropOnHover = false;
  }
}

export { NavDdSettings }