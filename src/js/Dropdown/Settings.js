'use strict'

class DropdownSettings {
  constructor(container) {
    id = 'navbar-dropdown'; // id for the dropdown button
    text = ''; // button text
    // calculates the size of the dropdown menu to match the parent container and offsets the menu
    size = { width:container.offsetWidth, height: container.offsetHeight };
    // aligns the dropdown menu to the right or left of the button
    alignment = 'right';
    menuWidth = 200; // px
    menuItems = [
      `About`,
      `Contact`,
      `Gallery`,
      `Menu`,
      `Backup`,
      `Login`,
      `Sign Up`,
    ];
    // optional svg icons for the button state. May be set to 'none' if using text instead
    images = {
      initial: hamburger(true, '#ffffff', 'none', '2', 'round'),
      hover: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      focus: hamburger(true, '#ffffff', 'none', '2.5', 'square'),
      open: chevrons(true, 'down', 'double', '#ffffff', 'none', '2', 'round'),
    };
    dropOnHover = false;
  }
}