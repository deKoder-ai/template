'use strict';

class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  addHit = () => {
    if (!this.sunk) {
      this.hits++;
      this.checkSunk();
    }
    return this.hits;
  };
  checkSunk = () => {
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk;
  };
}

export { Ship };
