'use strict';
import { Home } from './pages/Home.js';
import { SignUp } from './pages/SignUp/SignUp.js';

class Routing {
  constructor(content, logging) {
    this.logging = logging;
    this.listeners = function () {
      document.addEventListener('click', (e) => {
        this.clickHandler(e);
      });
      document.addEventListener('keydown', (e) => {
        this.keydownHandler(e);
      });
    };
    this.clickHandler = function (e) {
      const target = e.target;
      if (this.logging === true) {
        let targetString = target.outerHTML;
        if (targetString.length > 137) {
          targetString = `${targetString.substring(0, 137)}...`;
        }
        console.log(targetString);
      }
      switch (target.id) {
        case 'home-btn':
          const home = new Home(content);
          content.appendChild(home);
        case 'nav-bar-btn-1':
        case 'dropdown-item-1':
          console.log('Nav Link 1');
          break;
        case 'nav-bar-btn-2':
        case 'dropdown-item-2':
          console.log('Nav Link 2');
          break;
        case 'nav-bar-btn-3':
        case 'dropdown-item-3':
          console.log('Nav Link 3');
          break;
        case 'nav-bar-btn-4':
          const signUp = new SignUp(content);
          content.appendChild(signUp);
          console.log('Nav Link 4 Reporting for business');
          break;
        default:
          break;
      }
    };
    this.keydownHandler = function (e) {
      if (this.logging === true) {
        console.log(e.key);
      }
    };
    // build
    this.listeners();
  }
}

export { Routing };
