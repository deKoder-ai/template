'use strict';

import { F } from '../Functions';
import './dropdown.css';

class Dropdown {
  constructor(settings) {
    this.hover = function (e) {
      if (this.status === 0) {
        this.button.style.backgroundImage = settings.images.hover;
        if (settings.dropOnHover === true && e.target.id === settings.id) {
          this.openMenu();
        }
      }
    };
    this.createMenu = function () {
      this.menuId = `${settings.id}-menu`;
      this.menu = F.htmlElement('div', '', 'dropdown-menu', `${this.menuId}`);
      this.styleMenu();
      for (let i = 0; i < settings.menuItems.length; i++) {
        let item = F.htmlElement(
          'button',
          `${settings.menuItems[i]}`,
          'dropdown-menu-item',
          `${this.menuId}-item-${i}`,
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
    this.styleMenu = function () {
      this.menu.style.width = `${settings.menuWidth}px`;
      this.menu.style.top = `${settings.size.height}px`;
      if (settings.alignment === 'right') {
        this.menu.style.left = `${(settings.menuWidth - settings.size.width) * -1}px`;
      } else {
        this.menu.style.left = `0px`;
      }
    };
    this.openMenu = function () {
      this.status = 1;
      this.button.style.backgroundImage = settings.images.open;
      this.menu.style.display = 'block';
      this.menu.classList.remove('slide-out');
      this.menu.classList.add('slide-down');
      function displayMenuItems() {
        for (let child of this.menuChildren) {
          child.style.opacity = '1';
        }
      }
      setTimeout(displayMenuItems.bind(this), 99);
    };
    this.closeMenu = function () {
      this.status = 0;
      this.button.style.backgroundImage = settings.images.initial;
      this.menu.classList.remove('slide-down');
      this.menu.classList.add('slide-out');
      function noText() {
        this.menu.style.display = 'none';
        for (let child of this.menuChildren) {
          child.style.opacity = '0';
        }
      }
      setTimeout(noText.bind(this), 99);
    };
    this.click = function (e) {
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
    document.addEventListener('mouseover', (e) => {
      this.hover(e);
    });
    return this.button;
  }
}

export { Dropdown };