'use strict';

import { F } from '../../Functions';
import html from './signUp.html';
import './signUp.css';

class SignUp {
  constructor(content) {
    this.content = content;
    this.html = html;
    this.content.innerHTML = '';
    console.log('sign up mfer');
    this.content.innerHTML = html;
    return this.html;
  }
}

export { SignUp };
