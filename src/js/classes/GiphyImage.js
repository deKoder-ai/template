'use strict';

import { F } from './Functions';

/**
 * Create an html container that fetches random images from the Giphy API.
 *
 * https://developers.giphy.com/docs/
 * @param {boolean} toggleSearch - Toggle search input
 * @param {boolean} logUrl - Toggle logging of img url to terminal
 * @returns {Object} An html div element containing the image and optional search box
 */
class GiphyImage {
  constructor(toggleSearch, logUrl) {
    this.toggleSearch = toggleSearch;
    this.logUrl = logUrl;
    this.url = 'https://api.giphy.com/v1/gifs/search?';
    this.key = 'c5PTTbRxY1Wth7jYtEHAjasnsXjjmAVu';
    this.imgWidth = '500px';
    this.query = 'cats'; // search topic
    this.limit = 50; // maximum number of records to return
    this.offset = 23; // starting position of results 0 -> 4999(?)
    this.rating = 'r'; // g / pg / pg-13 / r
    this.lang = 'en'; // en / uk / ja / for regional content; use a 2-letter ISO 639-1 language code
    this.errors = 0;

    this.build();
    this.buildRequest();
    this.handleEvents();
    this.fetchImage();
    return this.container;
  }
  build = () => {
    this.container = F.htmlElement('div');
    this.img = F.htmlElement('img');
    this.searchInput = F.htmlElement('input', '', '', 'giphy-search');
    this.style();
    this.container.appendChild(this.img);
    if (this.toggleSearch) {
      this.container.appendChild(this.searchInput);
    }
  };
  buildRequest = () => {
    this.imgIndex = this.randomNumber(0, this.limit - 1);
    this.offset = this.randomNumber(0, 499);
    this.request = `${this.url}api_key=${this.key}&q=${this.query}&limit=${this.limit}&offset=${this.offset}&rating=${this.rating}&lang=${this.lang}&bundle=messaging_non_clips`;
  };
  handleEvents = () => {
    this.searchInput.addEventListener('focus', this.searchEvent);
    this.searchInput.addEventListener('blur', this.removeSearchEvent);
  };
  style = () => {
    this.container.style.width = this.imgWidth;
    this.img.style.width = '100%';
    this.img.style.height = 'auto';
    this.searchInput.name = 'giphy-search';
    this.searchInput.placeholder = 'Search image...';
    this.searchInput.style.width = '100%';
    this.searchInput.style.padding = '0.5rem 1rem';
    this.searchInput.style.fontSize = '1.4rem';
    this.searchInput.style.textAlign = 'right';
  };
  searchEvent = () => {
    document.addEventListener('keydown', this.checkEnter);
  };
  removeSearchEvent = () => {
    document.removeEventListener('keydown', this.checkEnter);
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.search();
    }
  };
  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  search = () => {
    console.log('Searching Giphy...');
    this.query = this.searchInput.value;
    this.buildRequest();
    this.imgIndex = this.randomNumber(0, this.limit - 1);
    // console.log(this.imgIndex);
    this.fetchImage();
  };
  fetchImage = async () => {
    try {
      const response = await fetch(this.request, { method: 'GET', mode: 'cors' });
      const imgArray = await response.json();
      console.log(imgArray);
      this.imgIndex = Math.min(this.imgIndex, imgArray.data.length);
      const src = imgArray.data[this.imgIndex].images.original.url;
      this.img.src = src;
      if (this.logUrl) {
        console.log(src);
      }
      this.errors = 0;
    } catch (err) {
      console.log(err);
      if (this.errors < 5) {
        this.search();
        this.errors++
      }
    }
  };
}

export { GiphyImage };