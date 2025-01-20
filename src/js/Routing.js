'use strict';
import { Home } from './pages/Home.js';
import { SignUp } from './pages/SignUp/SignUp.js';
import { Login } from './pages/Login/Login.js';
import { NavSwitch } from './pages/Login/switchNavBar.js';

class Routing {
  constructor(content, logging) {
    this.content = content;
    this.logging = logging;
    this.listeners = () => {
      document.addEventListener('click', this.clickHandler);
      document.addEventListener('keydown', this.keydownHandler);
    };
    this.clickHandler = (e) => {
      const target = e.target;
      if (this.logging === true) {
        let targetString = target.outerHTML;
        if (targetString.length > 137) {
          targetString = `${targetString.substring(0, 137)}...`;
        }
        console.log(targetString);
      }
      const login = new Login();
      switch (target.id) {
        case 'home-btn':
          const home = new Home(content);
          content.appendChild(home);
        case 'nav-bar-about':
        case 'dropdown-item-1':
          console.log('About');
          break;
        case 'nav-bar-2':
        case 'dropdown-item-2':
          console.log('Nav Link 2');
          break;
        case 'nav-bar-login':
        case 'dropdown-item-3':
          login.showForm();
          console.log('Login');
          break;
        case 'nav-bar-sign-up':
          new SignUp(content);
          console.log('Sign Up');
          break;
        case 'navbar-dd-sign-out':
          const logOut = new NavSwitch();
          logOut.logOut();
          console.log('Sign Out');
          break;
        case 'sign-up-login':
          login.showForm();
          break;
        default:
          break;
      }
    };
    this.keydownHandler = (e) => {
      if (this.logging === true) {
        console.log(e.key);
      }
    };
    // build
    this.listeners();
  }
}

export { Routing };
