'use strict';

import html from './signUp.html';
import './signUp.css';
import { DropdownSearch } from '../../Classes/DropdownSearch/DropdownSearch.js';
import { countryCodes } from '../../objects/countryCodes.js';

class SignUp {
  constructor(container) {
    this.container = container;
    this.html = html;
    this.countryCodes = countryCodes;
    this.passwordMsgText = `To help keep your account secure your password should be at least 8 characters long, contain both uppercase and lowercase letters, a number, and ideally a special character or two`;
    this.show = 0;
    // build
    this.container.innerHTML = '';
    this.container.innerHTML = this.html;
    this.getInputs();
    this.getErrorMsgs();
    this.createCountryCodeDropdown();
    this.eventHandlers();
    this.getCheckMarks();

    return this;
  }
  getInputs = () => {
    this.signUpForm = document.getElementById('sign-up-form');
    this.firstNameInput = document.getElementById('sign-up-first-name');
    this.lastNameInput = document.getElementById('sign-up-last-name');
    this.emailInput = document.getElementById('sign-up-email');
    this.phoneInput = document.getElementById('sign-up-phone');
    this.password1Input = document.getElementById('sign-up-password-1');
    this.password2Input = document.getElementById('sign-up-password-2');
    this.password2Input.setCustomValidity('invalid');
    this.SignUpBtnInput = document.getElementById('sign-up-submit-btn');
    this.showPassBtn1 = document.getElementById('login-show-password-btn-1');
    this.showPassBtn1.setAttribute('tabindex', '-1');
    this.showPassBtn2 = document.getElementById('login-show-password-btn-2');
    this.showPassBtn2.setAttribute('tabindex', '-1');
    this.countryCodesDiv = document.getElementById('countryCodesDiv');
  };
  eventHandlers = () => {
    this.signUpForm.addEventListener('submit', this.preventFormSubmitDefault);
    this.firstNameInput.addEventListener('blur', this.checkFirstName);
    this.firstNameInput.addEventListener('focus', this.removeFirstNameErr);
    this.lastNameInput.addEventListener('blur', this.checkLastName);
    this.lastNameInput.addEventListener('focus', this.removeLastNameErr);
    this.emailInput.addEventListener('blur', this.checkEmail);
    this.emailInput.addEventListener('focus', this.removeEmailErr);
    this.phoneInput.addEventListener('blur', this.checkPhone);
    this.phoneInput.addEventListener('focus', this.removePhoneErr);
    this.password1Input.addEventListener('blur', this.checkPassword1);
    this.password2Input.addEventListener('blur', this.checkPassword2);
    this.SignUpBtnInput.addEventListener('click', this.submit);
    this.showPassBtn1.addEventListener('click', this.showPassword);
    this.showPassBtn2.addEventListener('click', this.showPassword);
    this.countryCodesSearch.content.addEventListener(
      'click',
      this.getCountryCode,
    );
  };
  getErrorMsgs = () => {
    this.firstNameErr = document.getElementById('sign-up-first-name-error');
    this.lastNameErr = document.getElementById('sign-up-last-name-error');
    this.emailErr = document.getElementById('sign-up-email-error');
    this.phoneErr = document.getElementById('sign-up-phone-error');
    this.passwordMsg = document.getElementById('password-instructions');
    this.passwordMsg.innerText = this.passwordMsgText;
  };
  getCheckMarks = () => {
    this.firstNameCheck = document.getElementById('sign-up-check-firstname');
    this.lastNameCheck = document.getElementById('sign-up-check-lastname');
    this.emailCheck = document.getElementById('sign-up-check-email');
    this.phoneCheck = document.getElementById('sign-up-check-phone');
    this.password1Check = document.getElementById('sign-up-check-password-1');
    this.password2Check = document.getElementById('sign-up-check-password-2');
  };
  preventFormSubmitDefault = (e) => {
    e.preventDefault();
  };
  checkFirstName = (e) => {
    this.firstname = this.firstNameInput.value;
    if (this.firstNameInput.validity.valid) {
      this.removeFirstNameErr();
      this.firstNameCheck.classList.add('sign-up-check-show');
      return this.firstname;
    } else {
      if (this.firstNameInput.validity.valueMissing) {
        this.firstNameErr.innerText = 'Please enter your first name';
      } else if (this.firstNameInput.validity.patternMismatch) {
        this.firstNameErr.innerText = 'No numbers or special characters';
      } else if (this.firstNameInput.validity.tooShort) {
        this.firstNameErr.innerText = `Name should be at least ${this.firstNameInput.minLength} characters`;
      }
      this.firstNameInput.classList.add('invalid');
      this.firstNameCheck.classList.remove('sign-up-check-show');
      return false;
    }
  };
  removeFirstNameErr = () => {
    this.firstNameErr.innerText = '';
    this.firstNameInput.classList.remove('invalid');
  };
  checkLastName = (e) => {
    this.lastname = this.lastNameInput.value;
    if (this.lastNameInput.validity.valid) {
      this.removeLastNameErr();
      this.lastNameCheck.classList.add('sign-up-check-show');
      return this.lastname;
    } else {
      if (this.lastNameInput.validity.valueMissing) {
        this.lastNameErr.innerText = 'Please enter your first name';
      } else if (this.lastNameInput.validity.patternMismatch) {
        this.lastNameErr.innerText = 'No numbers or special characters';
      } else if (this.lastNameInput.validity.tooShort) {
        this.lastNameErr.innerText = `Name should be at least ${this.lastNameInput.minLength} characters`;
      }
      this.lastNameInput.classList.add('invalid');
      this.lastNameCheck.classList.remove('sign-up-check-show');
      return false;
    }
  };
  removeLastNameErr = () => {
    this.lastNameErr.innerText = '';
    this.lastNameInput.classList.remove('invalid');
  };
  checkEmail = (e) => {
    this.email = this.emailInput.value;
    if (this.emailInput.validity.valid) {
      this.removeEmailErr();
      this.emailCheck.classList.add('sign-up-check-show');
      return this.email;
    } else {
      if (this.emailInput.validity.valueMissing) {
        this.emailErr.innerText = 'Please enter your email address';
      } else if (this.emailInput.validity.typeMismatch) {
        this.emailErr.innerText = 'Please enter a valid email address';
      } else if (this.emailInput.validity.tooShort) {
        this.emailErr.innerText = `Email should be at least ${this.emailInput.minLength} characters`;
      }
      this.emailInput.classList.add('invalid');
      this.emailCheck.classList.remove('sign-up-check-show');
      return false;
    }
  };
  removeEmailErr = () => {
    this.emailErr.innerText = '';
    this.emailInput.classList.remove('invalid');
  };
  checkPhone = (e) => {
    this.phone = this.code + this.phoneInput.value;
    if (this.code && this.phoneInput.validity.valid) {
      this.removePhoneErr();
      this.phoneCheck.classList.add('sign-up-check-show');
      return this.phone;
    } else {
      if (this.phoneInput.validity.valueMissing) {
        this.phoneErr.innerText = 'Please enter your phone number';
      } else if (this.phoneInput.validity.patternMismatch) {
        this.phoneErr.innerText = 'Phone number may only contain numbers';
      } else if (this.phoneInput.validity.tooShort) {
        this.phoneErr.innerText = `Number should have at least ${this.phoneInput.minLength} digits`;
      } else if (!this.code) {
        this.phoneErr.innerText = 'Please select your country code';
      }
      this.phoneInput.classList.add('invalid');
      this.phoneCheck.classList.remove('sign-up-check-show');
      return false;
    }
  };
  removePhoneErr = () => {
    this.phoneErr.innerText = '';
    this.phoneInput.classList.remove('invalid');
  };
  checkPassword1 = (e) => {
    this.password1 = this.password1Input.value;
    if (this.password1Input.validity.valid) {
      this.passwordMsg.innerText = '';
      this.passwordMsg.style.color = 'black';
      this.password1Input.classList.remove('invalid');
      this.password1Check.classList.add('sign-up-check-show');
      return this.password1;
    } else {
      if (this.password1Input.validity.valueMissing) {
        this.passwordMsg.innerText = 'Please enter a password';
      } else if (this.password1Input.validity.patternMismatch) {
        this.password2Input.setCustomValidity('invalid');
        this.passwordMsg.innerText = this.passwordMsgText;
      }
      this.password1Input.classList.add('invalid');
      this.passwordMsg.style.color = 'var(--red)';
      this.password1Check.classList.remove('sign-up-check-show');
      this.password2Check.classList.remove('sign-up-check-show');
      return false;
    }
  };
  checkPassword2 = (e) => {
    this.password2 = this.password2Input.value;
    if (
      this.password1Input.validity.valid &&
      this.password1 === this.password2
    ) {
      this.password2Input.setCustomValidity('');
      this.passwordMsg.innerText = '';
      this.passwordMsg.style.color = 'black';
      this.password2Input.classList.remove('invalid');
      this.password2Check.classList.add('sign-up-check-show');
      return true;
    } else if (this.password2Input.validity.valueMissing) {
      this.password2Input.setCustomValidity('invalid');
      this.passwordMsg.style.color = 'var(--red)';
      this.password2Input.classList.add('invalid');
      this.password2Check.classList.remove('sign-up-check-show');
      this.passwordMsg.innerText = 'Please confirm your password';
    } else if (this.password1Input.validity.valid) {
      this.password2Input.setCustomValidity('invalid');
      this.passwordMsg.innerText = 'Passwords do not match';
      this.passwordMsg.style.color = 'var(--red)';
      this.password2Input.classList.add('invalid');
      this.password2Check.classList.remove('sign-up-check-show');
      return false;
    } else {
      this.password2Input.setCustomValidity('invalid');
      this.passwordMsg.innerText = this.passwordMsgText;
      this.passwordMsg.style.color = 'var(--red)';
      this.password2Input.classList.add('invalid');
      this.password2Check.classList.remove('sign-up-check-show');
      return false;
    }
  };
  showPassword = () => {
    if (this.show === 0) {
      this.show = 1;
      this.showPassBtn1.classList.remove('login-show');
      this.showPassBtn1.classList.add('login-hide');
      this.showPassBtn2.classList.remove('login-show');
      this.showPassBtn2.classList.add('login-hide');
      this.password1Input.type = 'text';
      this.password2Input.type = 'text';
    } else {
      this.show = 0;
      this.showPassBtn1.classList.remove('login-hide');
      this.showPassBtn1.classList.add('login-show');
      this.showPassBtn2.classList.remove('login-hide');
      this.showPassBtn2.classList.add('login-show');
      this.password1Input.type = 'password';
      this.password2Input.type = 'password';
    }
  };
  createCountryCodeDropdown = () => {
    this.countries = Object.keys(this.countryCodes);
    this.countryCodesSearch = new DropdownSearch(
      this.countryCodesDiv,
      this.countries.sort(),
      '+--',
      'Country...',
    );
    this.countryCodesDiv.appendChild(this.countryCodesSearch.html);
  };
  getCountryCode = (e) => {
    let country = e.target.innerText;
    let code = this.countryCodes[country];
    if (code) {
      this.code = code;
      this.countryCodesSearch.button.innerText = this.code;
      this.countryCodesSearch.toggleList();
    }
  };
  removeEventHandlers = () => {
    this.signUpForm.removeEventListener(
      'submit',
      this.preventFormSubmitDefault,
    );
    this.firstNameInput.removeEventListener('blur', this.checkFirstName);
    this.firstNameInput.removeEventListener('focus', this.removeFirstNameErr);
    this.lastNameInput.removeEventListener('blur', this.checkLastName);
    this.lastNameInput.removeEventListener('focus', this.removeLastNameErr);
    this.emailInput.removeEventListener('blur', this.checkEmail);
    this.emailInput.removeEventListener('focus', this.removeEmailErr);
    this.phoneInput.removeEventListener('blur', this.checkPhone);
    this.phoneInput.removeEventListener('focus', this.removePhoneErr);
    this.password1Input.removeEventListener('blur', this.checkPassword1);
    this.password2Input.removeEventListener('blur', this.checkPassword2);
    this.SignUpBtnInput.removeEventListener('click', this.submit);
    this.showPassBtn1.removeEventListener('click', this.showPassword);
    this.showPassBtn2.removeEventListener('click', this.showPassword);
    this.countryCodesSearch.content.removeEventListener(
      'click',
      this.getCountryCode,
    );
  };
  submit = (e) => {
    let fn = this.checkFirstName();
    let ln = this.checkLastName();
    let em = this.checkEmail();
    let ph = this.checkPhone();
    let p1 = this.checkPassword1();
    let p2 = this.checkPassword2();
    if (fn && ln && em && ph && p1 && p2) {
      this.details = {
        firstName: fn,
        lastName: ln,
        email: em,
        phone: ph,
        password: p1,
      };
      console.log('submit');
      console.log(this.details);
    } else {
      console.log('no');
    }
  };
  close = () => {
    this.removeEventHandlers();
  };
}

export { SignUp };
