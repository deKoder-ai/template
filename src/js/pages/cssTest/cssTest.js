'use strict';

import html from './cssTest.html';
import './cssTest.css';

class cssTest {
  constructor(container) {
    this.container = container;
    this.html = html;
    this.container.innerHTML = '';
    console.log(this.html);
    this.container.innerHTML = this.html;
  }
}

export { cssTest };
