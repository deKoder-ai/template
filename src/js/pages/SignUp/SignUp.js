'use strict';

import { F } from '../../Functions';
import signUpHtml from './signUp.html';
import './signUp.css';

class SignUp {
  constructor(content) {
    content.innerHTML = '';
    console.log('sign up mfer');
    this.parser = new DOMParser();
    this.html = this.parser.parseFromString(signUpHtml, 'text/html');
    this.html = this.html.body.firstChild;
    console.log(this.html);
    return this.html;
  }
}

export { SignUp };
