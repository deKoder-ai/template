'use strict'

import { hamburger } from '../Hamburger.js';
import { chevrons } from '../Chevrons.js';

class DropdownSettings {
  constructor(height, baseFontSize) {
    this.id = 'navbar-dropdown';
    this.text = '';
    this.size = { width: height * baseFontSize, height: height * baseFontSize - 2 };
    this.alignment = 'right';
    this.menuWidth = 200; // px
    this.menuItems = [
      `About`,
      `Contact`,
      `Gallery`,
      `Menu`,
      `Backup`,
      `Login`,
      `Sign Up`,
    ];
    this.images = {
      initial: hamburger(true, '#ffffff', 'none', '2', 'round'),
      hover: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      focus: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      open: chevrons(true, 'down', 'double', '#ffffff', 'none', '2', 'round'),
    };
    this.dropOnHover = true;
  }
}

export { DropdownSettings }