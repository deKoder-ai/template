'use strict';

import { F } from '../Functions';
import styles from './dropdown.css';
// import './dropdown.css';

/**
 * Create a dropdown menu with adjustable settings.
 * @param {Object} settings - An object containing the styling and link list for the dropdown menu. See settings.js for an example
 * @returns {Object} The generated HTML button element for the dropdown menu
 */
class Dropdown {
  constructor(settings) {
    this.hover = (e) => {
      if (this.status === 0) {
        this.button.style.backgroundImage = settings.images.hover;
        if (settings.dropOnHover === true && e.target.id === settings.id) {
          this.openMenu();
        }
      }
    };
    this.createMenu = () => {
      this.menuId = `${settings.id}`;
      this.menu = F.htmlElement('div', '', 'dropdown-menu', `${this.menuId}`);
      this.styleMenu();
      for (let i = 0; i < settings.menuItems.length; i++) {
        let item = F.htmlElement(
          'button',
          `${settings.menuItems[i]}`,
          'dropdown-menu-item',
          `${this.menuId}-${settings.menuItems[i].replace(/ /g, '-').toLowerCase()}`,
        );
        let separator = F.htmlElement('div', '', 'dropdown-menu-line');
        this.menu.appendChild(item);
        if (i < settings.menuItems.length - 1) {
          this.menu.appendChild(separator);
        }
      }
      this.menuChildren = this.menu.children;
      this.button.appendChild(this.menu);
    };
    this.styleMenu = () => {
      this.menu.style.width = `${settings.menuWidth}px`;
      this.menu.style.top = `${settings.size.height}px`;
      if (settings.alignment === 'right') {
        this.menu.style.left = `${(settings.menuWidth - settings.size.width) * -1}px`;
      } else {
        this.menu.style.left = `0px`;
      }
    };
    this.openMenu = () => {
      this.status = 1;
      this.button.style.backgroundImage = settings.images.open;
      this.menu.style.display = 'block';
      this.menu.classList.remove('dd-slide-out');
      this.menu.classList.add('dd-slide-down');
      function displayMenuItems() {
        for (let child of this.menuChildren) {
          child.style.opacity = '1';
        }
      }
      setTimeout(displayMenuItems.bind(this), 99);
    };
    this.closeMenu = () => {
      this.status = 0;
      this.button.style.backgroundImage = settings.images.initial;
      this.menu.classList.remove('dd-slide-down');
      this.menu.classList.add('dd-slide-out');
      function noText() {
        this.menu.style.display = 'none';
        for (let child of this.menuChildren) {
          child.style.opacity = '0';
        }
      }
      setTimeout(noText.bind(this), 99);
    };
    this.click = (e) => {
      if (e.target.id === settings.id && this.status === 0) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    };
    // build
    this.button = F.htmlElement(
      'button',
      `${settings.text}`,
      'dropdown-button',
      `${settings.id}`,
    );
    this.button.style.backgroundImage = settings.images.initial;
    this.createMenu();
    document.addEventListener('click', (e) => {
      this.click(e);
    });
    document.addEventListener('mouseover', this.hover);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.status === 1) {
        this.closeMenu();
      }
    });
    return this.button;
  }
}

export { Dropdown };
