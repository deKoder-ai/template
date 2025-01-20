'use-strict';
import { F } from '../Functions.js';
import { Dropdown } from '../Dropdown/Dropdown.js';
import { NavDdSettings } from './NavDdSettings.js';
import './navigationBar.css';
import '../Dropdown/dropdown.css';

/**
 * Create a header navigation bar with optional link buttons and/or dropdown menu.
 * @param {number} height - The height of the navigation bar in rem
 * @param {Array} buttons - An array of strings to provide the text for the link buttons
 * @param {boolean} ddToggle - If true, adds a dropdown menu to the nav bar. The style and content can be adjusted in dropdownSettings.js
 * @param {number} baseFontSize - The base font size of the website in rem
 * @returns {Object} The generated HTML for the nav element
 */
class NavigationBar {
  constructor(height, buttons, ddToggle, baseFontSize) {
    this.baseFontSize = baseFontSize;
    this.header = F.htmlElement('header');
    this.nav = F.htmlElement('nav', '', '', 'navigation-bar');
    this.home = F.htmlElement('button', `${buttons[0]}`, '', 'home-btn');
    this.gap = F.htmlElement('div');
    this.addNavButtons = (buttons) => {
      if (buttons.length > 0) {
        for (let i = 1; i < buttons.length; i++) {
          let element = F.htmlElement(
            'button',
            `${buttons[i]}`,
            'nav-bar-btn',
            `nav-bar-${buttons[i].replace(/ /g,"-").toLowerCase()}`,
          );
          this.nav.appendChild(element);
        }
      }
    };
    this.columns = (buttons, ddToggle) => {
      let columns = '1fr 2.5fr';
      if (buttons.length > 0) {
        for (let i = 1; i < buttons.length; i++) {
          columns += ' 1fr';
        }
      }
      if (ddToggle === true) {
        columns += ` calc(${height}rem + 3px`;
      }
      return columns;
    };
    this.dropdownContainer = (height, ddToggle) => {
      if (ddToggle) {
        const container = F.htmlElement('div');
        const settings = new NavDdSettings(height, baseFontSize);
        const dropdown = new Dropdown(settings);
        container.appendChild(dropdown);
        container.style.width = `${height}rem`;
        container.style.height = `calc(${height}rem - 2px`;
        this.nav.appendChild(container);
      }
    };
    // build
    this.nav.style.height = `${height}rem`;
    this.nav.style.gridTemplateColumns = this.columns(buttons, ddToggle);
    this.nav.appendChild(this.home);
    this.nav.appendChild(this.gap);
    this.addNavButtons(buttons);
    this.dropdownContainer(height, ddToggle);
    this.header.appendChild(this.nav);
    return this.header;
  }
}

export { NavigationBar };
