'use strict'

import { F } from '../../Functions';
import './DropdownSearch.css';

class DropdownSearch {
  constructor(container, list, buttonText, placeholder) {
    this.container = container;
    this.list = list;
    this.buttonText = buttonText;
    this.placeholder = placeholder;
    // build
    this.createHtml();
    this.events();
    return this;
  }
  createHtml = () => {
    this.html = F.htmlElement('div', '', 'dropdown-search');
    this.button = F.htmlElement('button', `${this.buttonText}`, 'dropdown-search-btn');
    this.content = F.htmlElement('div', '', 'dropdown-search-content-div');
    this.search = F.htmlElement('input', '', 'dropdown-search-input');
    this.search.type = "text";
    this.search.placeholder = `${this.placeholder}`;
    this.content.appendChild(this.search);
    this.addList();
    this.html.appendChild(this.button);
    this.html.appendChild(this.content);
    this.container.appendChild(this.html);
  }
  addList = () => {
    for (let item of this.list) {
      let button = F.htmlElement(`button`, `${item}`, '', `ddsearch-${item}`)
      this.content.appendChild(button);
    }
  }
  toggleList = () => {
    this.content.classList.toggle("show");
  }
  filterContents = () => {
    let filter = this.search.value.toUpperCase();
    let button = this.content.getElementsByTagName("button");
    for (let i = 0; i < button.length; i++) {
      let txtValue = button[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        button[i].style.display = "";
      } else {
        button[i].style.display = "none";
      }
    }
  }
  events = () => {
    this.button.addEventListener('click', this.toggleList);
    this.search.addEventListener('keyup', this.filterContents);
  }
}

export { DropdownSearch }