'use strict';

import { F } from '../../Functions';
import { Mask } from '../../Mask';
import { LoginLogic } from './LoginLogic';
import loginHtml from './login.html';
import './login.css';

import { users } from './users';

class Login {
  constructor() {
    this.mask = new Mask('#000000', 0.7);
    this.container = F.htmlElement('div', '', '', 'login-container');

    return this;
  }
  appendInputHtml = function (mask, submit) {
    const getHtml = new Promise(function (resolve, reject) {
      const parser = new DOMParser();
      let html = parser.parseFromString(loginHtml, 'text/html');
      html = html.body.firstChild;
      const container = F.htmlElement('div', '', '', 'login-container');
      container.appendChild(html);
      mask.appendChild(container);
      if (html != false) {
        resolve('input.html appended');
      } else {
        reject('Failure to append input.html');
      }
    });
    getHtml.then(function () {
      const logic = new LoginLogic();

      // Prevent default error bubbles from appearing
      document.getElementById('login').addEventListener("invalid", function(event) {
        event.preventDefault(); 
      }, true);

      // get nodes
      const userInput = document.getElementById('login-user');
      const usernameError = document.getElementById('username-error');
      const passwordInput = document.getElementById('login-password');
      const passwordError = document.getElementById('password-error');

      // focus first input on load
      const submitButton = document.getElementById('login-submit');
      userInput.focus();

      // show/hide password
      const showPassBtn = document.getElementById('login-show-password-btn');
      let eyeStatus = 0;
      function switchEye() {
        if (eyeStatus === 0) {
          eyeStatus = 1;
          showPassBtn.classList.remove('login-show');
          showPassBtn.classList.add('login-hide');
          passwordInput.type = 'text';
        } else {
          eyeStatus = 0;
          showPassBtn.classList.remove('login-hide');
          showPassBtn.classList.add('login-show');
          passwordInput.type = 'password';
        }
      }
      showPassBtn.addEventListener('click', switchEye);

      // check username validity
      let usernameValid = false;
      function checkUsername() {
        let usernameValue = userInput.value.toLowerCase();
        if (usernameValue in users) {
          usernameValid = true;
          usernameError.innerText = '';
          userInput.classList.remove('input-error');
          userInput.setCustomValidity('');
          return true;
        } else if (userInput.validity.valueMissing) {
          usernameError.innerText = 'Please enter your username';
          userInput.classList.add('input-error');
          usernameValid = false;
          userInput.setCustomValidity('Please enter your username');
          return false;
        } else {
          usernameError.innerText = 'Username is not registered';
          userInput.classList.add('input-error');
          usernameValid = false;
          userInput.setCustomValidity('Username is not registered');
          return false;
        }
      }
      function clearUsernameErrors() {
        userInput.classList.remove('input-error');
        usernameError.innerText = '';
      }
      userInput.addEventListener('focus', clearUsernameErrors);
      userInput.addEventListener('blur', checkUsername);

      // check password
      let passwordValid = false;
      function checkPassword(test) {
        if (usernameValid === true) {
          const username = userInput.value.toLowerCase();
          const storedPassword = users[username];
          const passwordValue = logic.hash(passwordInput.value);
          if (passwordValue === storedPassword) {
            passwordInput.classList.remove('input-error');
            passwordError.innerText = '';
            passwordValid = true;
            submitButton.disabled = false;
            passwordInput.setCustomValidity('');
            return true;
          } else if (passwordInput.validity.valueMissing) {
            passwordError.innerText = 'Please enter your password';
            passwordInput.classList.add('input-error');
            passwordValid = false;
            passwordInput.setCustomValidity('Please enter your password');
            return false;
          } else {
            passwordError.innerText = 'Incorrect password';
            passwordInput.classList.add('input-error');
            passwordValid = false;
            passwordInput.setCustomValidity('Incorrect password');
            return false;
          }
        }
      }
      const clearPasswordErrors = function () {
        passwordInput.classList.remove('input-error');
        passwordError.innerText = '';
      };
      passwordInput.addEventListener('focus', clearPasswordErrors);
      passwordInput.addEventListener('blur', checkPassword);

      // submit form
      submitButton.addEventListener('submit', (e) => {
        const pv = checkPassword();
        const uv = checkUsername();
        if (!pv || !uv) {
          e.preventDefault();
        }
      })

    });
  };
  create() {
    this.mask.create();
    this.appendInputHtml(this.mask.mask, this.submit, this.usernameBlur);
  }
}

export { Login };
