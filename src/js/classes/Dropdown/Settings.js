'use strict';

import { hamburger } from '../Hamburger.js';
import { chevrons } from '../Chevrons.js';

class Settings {
  constructor(container) {
    this.id = 'whatever'; // id for the dropdown button
    this.text = ''; // button text
    // calculates the size of the dropdown menu to match the parent container and offsets the menu
    this.size = { width: container.offsetWidth, height: container.offsetHeight };
    // aligns the dropdown menu to the right or left of the button
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
    // optional svg icons for the button state. May be set to 'none' if using text instead
    this.images = {
      initial: hamburger(true, '#ffffff', 'none', '2', 'round'),
      hover: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      focus: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      open: chevrons(true, 'down', 'double', '#ffffff', 'none', '2', 'round'),
    };
    this.dropOnHover = false;
  }
}

export { Settings };
