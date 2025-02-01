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
