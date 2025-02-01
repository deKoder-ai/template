'use strict';

import { Gameboard } from './Gameboard';

class Player {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.min = 0;
    this.max = size - 1;
    this.gb = new Gameboard(this.size);
  }
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
    if (newX > this.max || newY > this.max || newX < 0 || newY < 0) {
      return this.postHitShot(x, y);
    } else {
      console.log('post hit');
      return { x: newX, y: newY };
    }
  };
}

export { Player };

// advanced targeting logic
// - keep an array of previous shots and their results
// - false = miss
// - null = no shot yet
// - true = hit
// - 'S' = sunk already
// - before taking a shot, search the array for a hit (but not sunk)
// - check the squares around - above, right, below, left
// - if one of these is also a hit, the target the opposite side
// - eg.
