'use strict';

import { ss } from '../../objects/siteSettings.js';
import { NavigationBar } from '../../classes/NavigationBar/NavigationBar.js';
import { F } from '../../classes/Functions';

class NavSwitch {
  constructor() {
    this.html = ss.get('html');
    this.baseFontSize = ss.get('baseFontSize');
    return this;
  }
  logOut = () => {
    this.removeHeader();
    const navBtns = ['Home', 'About', 'Login', 'Sign Up'];
    const navBar = new NavigationBar(5, navBtns, false, this.baseFontSize);
    page.appendChild(navBar);
  };
  logIn = () => {
    this.removeHeader();
    const navBtns = ['Home', 'About', 'Whatever', 'Notifications', 'Cats'];
    const navBar = new NavigationBar(5, navBtns, true, this.baseFontSize);
    page.appendChild(navBar);
    console.log(ss.get('x'));
  };
  removeHeader = () => {
    const header = document.querySelector('header');
    if (header) {
      header.remove();
    }
  }


}

export { NavSwitch };

// const navBtns = ['Home', 'About', 'Whatever', 'Login', 'Sign Up'];