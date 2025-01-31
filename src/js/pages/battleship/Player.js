'use strict';

import { Gameboard } from './Gameboard';

class Player {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.min = 0;
    this.max = size - 1;
    this.gb = new Gameboard(this.size);
    this.shotHistory = [];
  }
  computerShot = (x, y, hit) => {
    if (hit === true) {
      const xy = this.postHitShot(x, y);
      x = xy.x;
      y = xy.y;
    } else {
      x = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      y = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    const shot = [x, y];
    // add in a random amount of thinking time
    // setTimeout(function () {
    //   return shot;
    // }, 5000);
    return shot;
  };
  postHitShot = (x, y) => {
    const xORy = Math.floor(Math.random() * 2);
    const pORm = Math.floor(Math.random() * 2);
    let newX, newY;
    const direction = pORm === 0 ? -1 : 1;
    if (xORy === 0) {
      newX = x + 1 * direction;
      newY = y;
    } else {
      pORm === 0 ? -1 : 1;
      newX = x;
      newY = y + 1 * pORm;
    }
    if (newX > this.max || newY > this.max) {
      return this.postHitShot(x, y);
    } else {
      console.log('post hit');
      return { x: x, y: y };
    }
  };
}

export { Player };
