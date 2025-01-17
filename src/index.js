'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import { F, HtmlElement } from './js/Functions.js';
import { NavigationBar } from './js/NavigationBar/NavigationBar.js';
import { Routing } from './js/Routing.js';

// pages
import { Home } from './js/pages/Home.js';
import { SignUp } from './js/pages/SignUp/SignUp.js';

import { Slideshow } from './js/Slideshow/Slideshow.js';
import { ImageArray } from './js/Slideshow/ImageArray.js';
import { Dropdown } from './js/Dropdown/Dropdown.js';
import { Settings } from './js/Dropdown/Settings.js';

// dev
function dev() {
  F.addOutlineToAllElements(false);
  (function logCLicks(x = true) {
    if (x === true) {
      document.addEventListener('click', (e) => {
        console.log(e.target);
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  dev();

  console.log('DOM fully loaded and parsed.');
  

  // get page elements
  const html = document.querySelector('html');
  const baseFontSize = Number(
    window.getComputedStyle(html).fontSize.match(/\d+/g),
  );
  const page = document.getElementById('page');
  const content = document.getElementById('content');
  // handle events
  const routing = new Routing(content, false);

  // header navigation
  const navBtns = ['Home', 'About', 'Whatever', 'Login', 'Sign Up'];
  const navigationBar = new NavigationBar(5, navBtns, true, baseFontSize);
  page.appendChild(navigationBar);
  content.style.marginTop = `${5}rem`; // offset content by the height of navbar

  // load home content
  const home = new Home(content);
  content.appendChild(home);

  // newdropdown button
  // const ddcont = F.htmlElement();
  // ddcont.style.width = '7rem';
  // ddcont.style.height = '7rem';
  // ddcont.style.position = 'relative';
  // const seti = new Settings(ddcont);
  // const dd = new Dropdown(seti);
  // ddcont.appendChild(dd);
  // content.appendChild(ddcont);

  // new F.EventHandler(clickEvents, 'click');
  // new F.EventHandler(keydownEvents, 'keydown');
});

// Todo
//  - Fix menu alignment bug in Dropdown.js. Check NavigationBar for solution

//  - Add Routing.js
//  - Lay the foundations for sign up page template
