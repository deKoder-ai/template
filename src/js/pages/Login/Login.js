'use strict';

import { F } from '../../Functions.js';
import { Mask } from '../../Classes/Mask.js';
import { ss } from '../../siteSettings.js';
import html from './login.html';
import './login.css';

import { users } from './users';

class Login {
  constructor() {
    this.mask = new Mask('#000000', 0.85, false, false);
    this.container = F.htmlElement('div', '', '', 'login-container');
    this.users = users;
    this.usernameValue = '';
    this.usernameValid = false;
    this.passwordValid = false;
    this.hashedPass = 0;
    this.show = 0;
    this.loggedIn = false;
    return this;
  }
  showForm = () => {
    this.mask.create();
    this.appendHtml();
    this.focusFirstInput();
    this.eventHandlers();
  }
  appendHtml() {
    this.container.innerHTML = html;
    this.mask.mask.appendChild(this.container);
    this.form = document.getElementById('input');
    this.userInput = document.getElementById('login-user');
    this.passwordInput = document.getElementById('login-password');
    this.showPassBtn = document.getElementById('login-show-password-btn');
    this.usernameError = document.getElementById('username-error');
    this.passwordError = document.getElementById('password-error');
    this.submitBtn = document.getElementById('login-submit');
  }
  focusFirstInput() {
    this.userInput.focus();
  }
  submitClickEvent = (e) => {
    this.submit(e);
  };
  enterKeyEvent = (e) => {
    if (e.key === 'Enter') {
      this.submit(e);
    }
  };
  eventHandlers = () => {
    document.addEventListener('mousedown', this.handleCloseEvents);
    document.addEventListener('keydown', this.handleCloseEvents);
    this.userInput.addEventListener('blur', this.checkUsername);
    this.userInput.addEventListener('focus', this.clearUsernameErrors);
    this.passwordInput.addEventListener('blur', this.checkPassword);
    this.passwordInput.addEventListener('focus', this.clearPasswordErrors);
    this.showPassBtn.addEventListener('click', this.showPassword);
    document.addEventListener('keydown', this.enterKeyEvent);
    this.submitBtn.addEventListener('click', this.submitClickEvent);
  };
  removeEventHandlers = () => {
    document.removeEventListener('mousedown', this.handleCloseEvents);
    document.removeEventListener('keydown', this.handleCloseEvents);
    this.userInput.removeEventListener('blur', this.checkUsername);
    this.userInput.removeEventListener('focus', this.clearUsernameErrors);
    this.passwordInput.removeEventListener('blur', this.checkPassword);
    this.passwordInput.removeEventListener('focus', this.clearPasswordErrors);
    this.showPassBtn.removeEventListener('click', this.showPassword);
    document.removeEventListener('keydown', this.enterKeyEvent);
    this.submitBtn.removeEventListener('click', this.submitClickEvent);
  };
  checkUsername = () => {
    this.usernameValue = this.userInput.value.toLowerCase();
    if (this.usernameValue in this.users) {
      this.usernameValid = true;
      this.usernameError.innerText = '';
      this.userInput.classList.remove('input-error');
      this.userInput.setCustomValidity('');
      this.username = this.usernameValue;
      this.usernameError.style.marginBottom = '0rem';
    } else if (this.userInput.validity.valueMissing) {
      this.usernameError.innerText = 'Please enter your username';
      this.userInput.classList.add('input-error');
      this.usernameValid = false;
      this.userInput.setCustomValidity('Please enter your username');
      this.usernameError.style.marginBottom = '-2.9rem';
    } else {
      this.usernameError.innerText = 'Username is not registered';
      this.userInput.classList.add('input-error');
      this.usernameValid = false;
      this.userInput.setCustomValidity('Username is not registered');
      this.usernameError.style.marginBottom = '-2.9rem';
    }
  };
  clearUsernameErrors = () => {
    this.userInput.classList.remove('input-error');
    this.usernameError.innerText = '';
    this.usernameError.style.marginBottom = '0rem';
  };
  hash = (key) => {
    let hashCode = 0;
    const primeNumber = 11;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  };
  checkPassword = () => {
    const storedHash = users[this.username];
    this.hashedPass = this.hash(this.passwordInput.value);
    if (this.usernameValid === true) {
      if (this.hashedPass === storedHash) {
        this.passwordValid = true;
        this.passwordInput.setCustomValidity('');
      } else if (this.passwordInput.validity.valueMissing) {
        this.passwordError.innerText = 'Please enter your password';
        this.passwordInput.classList.add('input-error');
        this.passwordValid = false;
        this.passwordInput.setCustomValidity('Please enter your password');
      } else {
        this.passwordError.innerText = 'Incorrect password';
        this.passwordInput.classList.add('input-error');
        this.passwordValid = false;
        this.passwordInput.setCustomValidity('Incorrect password');
      }
    }
  };
  clearPasswordErrors = () => {
    this.passwordInput.classList.remove('input-error');
    this.passwordError.innerText = '';
  };
  showPassword = () => {
    if (this.show === 0) {
      this.show = 1;
      this.showPassBtn.classList.remove('login-show');
      this.showPassBtn.classList.add('login-hide');
      this.passwordInput.type = 'text';
    } else {
      this.show = 0;
      this.showPassBtn.classList.remove('login-hide');
      this.showPassBtn.classList.add('login-show');
      this.passwordInput.type = 'password';
    }
  };
  handleCloseEvents = (e) => {
    if (e.target.id === 'mask') {
      this.close();
    } else if (e.key === 'Escape') {
      this.close();
    }
  };
  close = () => {
    this.clearUsernameErrors();
    this.clearPasswordErrors();
    this.removeEventHandlers();
    this.mask.mask.innerHTML = '';
    this.mask.mask.remove();
  };
  // post = () => {
  //   const url = 'https://httpbin.org/post';
  //   const data = {
  //     username: `${this.username}`,
  //     password: `${this.hashedPass}`,
  //   };

  //   fetch(url, {
  //     mode: 'cors',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // }
  submit = (e) => {
    e.preventDefault();
    this.checkUsername();
    this.checkPassword();
    if (this.usernameValid && this.passwordValid) {
      this.clearUsernameErrors();
      this.clearPasswordErrors();
      console.log('submit');
      // this.post();
      this.loggedIn = true;
      ss.set('loggedIn', true);

      // temp code to trigger events after login
      this.changeStatus();
      this.close();
    } else {
      console.log('no');
    }
  };
  // temp code to trigger events after login
  changeStatus = () => {
    const status = document.getElementById('logged-in');
    status.innerText = this.loggedIn;
  }
}

export { Login };
