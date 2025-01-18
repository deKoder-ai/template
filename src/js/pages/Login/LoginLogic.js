'use strict';
import { users } from './users';

class LoginLogic {
  constructor(nodes) {
    this.users = users;
    this.userInput = undefined;
    this.usernameError = undefined;
    this.passwordInput = undefined;
    this.passwordError = undefined;
    this.validUser = false;
    this.validPassword = false;

    // build
    // this.userInput.addEventListener('focus', this.clearUsernameErrors);
    // this.userInput.addEventListener('blur', this.checkUsername);

    // const passwordInputDiv = document.getElementById('login-password-div');
    return this;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 11;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }
  setNodes() {
    this.userInput = document.getElementById('login-user');
    this.usernameError = document.getElementById('username-error');
    this.passwordInput = document.getElementById('login-password');
    this.passwordError = document.getElementById('password-error');
    console.log(this.userInput);
    console.log(this.usernameError);
    console.log(this.passwordInput);
    console.log(this.passwordError);
  }
  // eventListeners() {
    
  // }

  checkUsername() {
    let usernameValue = this.userInput.value.toLowerCase();
    if (usernameValue in this.users) {
      this.validUser = true;
      this.usernameError.innerText = '';
      this.userInput.classList.remove('input-error');
    } else if (usernameValue === '') {
      this.validUser = false;
      this.usernameError.innerText = 'Please enter your username';
      this.userInput.classList.add('input-error');
    } else {
      this.validUser = false;
      this.usernameError.innerText = 'Username is not registered';
      this.userInput.classList.add('input-error');
    }
    return this.validUser;
  }
  // this.clearUsernameErrors = function() {
  //   this.userInput.classList.remove('input-error');
  //   this.usernameError.innerText = '';
  // }


}

export { LoginLogic };
