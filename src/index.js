'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import { F, HtmlElement } from './js/Functions.js';
import { ss } from './js/siteSettings.js';
import { NavigationBar } from './js/NavigationBar/NavigationBar.js';
import { Routing } from './js/Routing.js';
import { NavSwitch } from './js/pages/Login/switchNavBar.js';

import { DevTools } from './js/Functions.js';

// pages
import { Home } from './js/pages/Home.js';
import { SignUp } from './js/pages/SignUp/SignUp.js';

import { Slideshow } from './js/Classes/Slideshow/Slideshow.js';
import { ImageArray } from './js/Classes/Slideshow/ImageArray.js';
import { Dropdown } from './js/Dropdown/Dropdown.js';
import { Settings } from './js/Dropdown/Settings.js';


// dev
const dt = new DevTools(1);
dt.addOutlineToAllElements(0);
dt.logClicks(0, 123);

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed.');

  // const ss = siteSettings;

  // siteSettings.set('html', document.querySelector('html'));
  // siteSettings.set('baseFontSize', Number(
  //   window.getComputedStyle(html).fontSize.match(/\d+/g),
  // ));

  // get page elements
  const html = document.querySelector('html');
  ss.set('html', html);
  const baseFontSize = Number(
    window.getComputedStyle(html).fontSize.match(/\d+/g),
  );
  ss.set('baseFontSize', baseFontSize);
  const page = document.getElementById('page');
  const content = document.getElementById('content');
  // handle events
  const routing = new Routing(content, false);


  console.log(ss.get('x'));
  ss.set('x', 456);
  console.log(ss.get('x'));

  // temp code to handle login status by monitoring for changes in a div

  // header navigation
  // const navBtns = ['Home', 'About', 'Whatever', 'Login', 'Sign Up'];
  // const navigationBar = new NavigationBar(5, navBtns, true, baseFontSize);
  // page.appendChild(navigationBar);
  content.style.marginTop = `${5}rem`; // offset content by the height of navbar

  const navSwitch = new NavSwitch();
  navSwitch.logOut();

  // load home content
  const home = new Home(content);
  content.appendChild(home);

  const logInStatus = document.querySelector('#logged-in');
  // Create a new MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    // Trigger some code when the element changes
    if (logInStatus.innerText === 'true') {
      console.log('Logged In');
      console.log(ss.get('loggedIn'));
      navSwitch.logIn();
    } else if (logInStatus.innerText === 'true') {
      console.log('Logged Out');
    }
  });

  // Start observing the element for changes
  observer.observe(logInStatus, {
    childList: true, // observe changes to the element's children
    // subtree: true, // observe changes to the element's children and their children
    // attributes: true, // observe changes to the element's attributes
    // characterData: true // observe changes to the element's text content
  });

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

// last commit
//  - Add Routing.js
//  - Lay the foundations for sign up page template

// next commit
//  - Create Mask.js
//  - Create Login.js
