'use strict';

import { F } from '../Functions';
import './dropdown.css';

const dropdown = {
  id: '',
  text: '',
  size: {},
  menuWidth: '',
  menuItems: [],
  images: {},
  dropOnHover: false,
  button: undefined,
  menu: undefined,
  status: 0,
  menuChildren: [],
  createBtn() {
    this.button = F.htmlElement(
      'div',
      `${this.text}`,
      'dropdown-button',
      `${this.id}`,
    );
  },
  initialStyle() {
    this.button.style.backgroundImage = this.images.initial;
  },
  hover(e) {
    if (this.status === 0) {
      this.button.style.backgroundImage = this.images.hover;
    }
    if (this.dropOnHover === true && this.status === 0) {
      this.openMenu(e);
    }
  },
  mouseout(e) {
    if (this.status === 0) {
      this.button.style.backgroundImage = this.images.initial;
    }
    if (this.dropOnHover === true && this.status === 1) {
      this.openMenu(e);
    }
  },
  openMenu(e) {
    if (e.target.id === this.id && this.status === 0) {
      this.status = 1;
      this.button.style.backgroundImage = this.images.open;
      this.menu.style.display = 'block';
      this.menu.classList.remove('slide-out');
      this.menu.classList.add('slide-down');
      function displayMenuItems() {
        for (let child of this.menuChildren) {
          child.style.opacity = '1';
        }
      }
      setTimeout(displayMenuItems.bind(this), 99);
    } else {
      this.status = 0;
      this.button.style.backgroundImage = this.images.initial;
      this.menu.classList.remove('slide-down');
      this.menu.classList.add('slide-out');
      function none() {
        dropdown.menu.style.display = 'none';
        for (let child of this.menuChildren) {
          child.style.opacity = '0';
        }
      }
      setTimeout(none.bind(this), 99);
    }
  },
  createMenu() {
    this.menu = F.htmlElement('div', '', 'dropdown-menu', `${this.id}-menu`);
    this.styleMenu();
    for (let i = 0; i < this.menuItems.length; i++) {
      let item = F.htmlElement(
        'button',
        `${this.menuItems[i]}`,
        'dropdown-menu-item',
        `${this.id}-menu-item-${i}`,
      );
      let separator = F.htmlElement('div', '', 'dropdown-menu-line');
      this.menu.appendChild(item);
      if (i < this.menuItems.length - 1) {
        this.menu.appendChild(separator);
      }
    }
    this.menuChildren = this.menu.children;
    this.button.appendChild(this.menu);
  },
  styleMenu() {
    this.menu.style.width = `${this.menuWidth}px`;
    this.menu.style.top = `${this.size.height}px`;
    if (this.alignment === 'right') {
      this.menu.style.left = `${(this.menuWidth - this.size.width) * -1}px`
    } else {
      this.menu.style.left = `0px`;
    }
  },
  eventListeners() {
    document.addEventListener('click', (e) => { this.openMenu(e) });
    this.button.addEventListener('mouseover', (e) => { this.hover(e) });
    this.button.addEventListener('mouseout', (e) => { this.mouseout(e) });

  },
};

class Dropdown {
  constructor(settings) {
    dropdown.id = settings.id;
    dropdown.text = settings.text;
    dropdown.size = settings.size;
    dropdown.alignment = settings.alignment;
    dropdown.menuWidth = settings.menuWidth;
    dropdown.menuItems = settings.menuItems;
    dropdown.images = settings.images;
    dropdown.dropOnHover = settings.dropOnHover;
    dropdown.createBtn();
    dropdown.initialStyle();
    dropdown.createMenu('xyz');
    dropdown.eventListeners();
    return dropdown.button;
  }
}

export { Dropdown };

// create a style status to check so that restyling does not keep firing unnecessarily
// fix dropdown animation text --
// add event listener to highlight background -- done in css
// consider how to make more reusable --
// add option to drop on hover --
// focus event listener
// move most button assignments to css --
// fix menu id to match button --
