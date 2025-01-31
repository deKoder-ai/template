'use strict';

import { Gameboard } from './Gameboard';

class Player {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.min = 0;
    this.max = size - 1;
    this.gb = new Gameboard(this.size);
    this.shotHistory = this.createShotHistoryArray();
    this.targetStack = [];
  }
  computerShot = (x, y, repeat) => {
    // random square if shot does not follow a hit
    if (!repeat) {
      x = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      y = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    } else {
      // if follows a hit, use secondary strike logic
      const xy = this.postHitShot(x, y);
      x = xy.x;
      y = xy.y;
    }
    const shot = { x: x, y: y };
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
    if (newX > this.max || newY > this.max || newX < 0 || newY < 0) {
      return this.postHitShot(x, y);
    } else {
      console.log('post hit');
      return { x: newX, y: newY };
    }
  };
  createShotHistoryArray = () => {
    const shotHistory = [];
    for (let i = 0; i < this.size; i++) {
      shotHistory[i] = [];
      for (let j = 0; j < this.size; j++) {
        shotHistory[i][j] = null;
      }
    }
    return shotHistory;
  };

  // advanced targeting logic
  updateSunkenHits = (x, y, sunk) => {
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        if (y + 1 < this.max) {
          const square = this.shotHistory[x][y + 1];
          if (square === true) this.shotHistory[x][y + 1] = sunk;
        }
      } else if (i === 1) {
        if (x + 1 < this.max) {
          const square = this.shotHistory[x + 1][y];
          if (square === true) this.shotHistory[x + 1][y] = sunk;
        }
      } else if (i === 2) {
        if (y - 1 >= this.min) {
          const square = this.shotHistory[x][y - 1];
          if (square === true) this.shotHistory[x][y - 1] = sunk;
        }
      } else if (i === 3) {
        if (x - 1 >= this.min) {
          const square = this.shotHistory[x - 1][y];
          if (square === true) this.shotHistory[x - 1][y] = sunk;
        }
      }
    }
    console.log(this.shotHistory);
  };
  // maybe irrelevant with the stack
  searchTargets = () => {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (shotHistory[i][j] === true) {
          // get adjacent
        }
      }
    }
  };
  getAdjacentTargets = (x, y, type) => {
    let above, right, below, left;
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        if (y + 1 < this.max) {
          above = this.shotHistory[x][y + 1];
          if (above === null) above = { x: x, y: y + 1, type: type };
        }
      } else if (i === 1) {
        if (x + 1 < this.max) {
          right = this.shotHistory[x + 1][y];
          if (right === null) right = { x: x + 1, y: y, type: type };
        }
      } else if (i === 2) {
        if (y - 1 >= this.min) {
          below = this.shotHistory[x][y - 1];
          if (below === null) below = { x: x, y: y - 1, type: type };
        }
      } else if (i === 3) {
        if (x - 1 >= this.min) {
          left = this.shotHistory[x - 1][y];
          if (left === null) left = { x: x - 1, y: y, type: type };
        }
      }
    }
    this.pushToStack(above, right, below, left);
  };
  pushToStack = (above, right, below, left) => {
    console.log(above);
    console.log(right);
    console.log(below);
    console.log(left);
    // will add better logic to check for lines and target those
    if (above && above !== true) this.targetStack.push(above);
    if (right && right !== true) this.targetStack.push(right);
    if (below && below !== true) this.targetStack.push(below);
    if (left && left !== true) this.targetStack.push(left);
  };
  clearSunkFromStack = (type) => {
    console.log(this.targetStack);
    for (let i = 0; i < this.targetStack.length; i++) {
      if (this.targetStack[i].type === type) {
        this.targetStack[i] = undefined;
      }
    }
    this.targetStack.sort();
    console.log('Clearing undefined');
    console.log(this.targetStack);
    this.clearUndefined();
  };
  clearUndefined = () => {
    const len = this.targetStack.length;
    if (this.targetStack[len - 1] || !len) return;
    if (this.targetStack[len - 1] === undefined) {
      this.targetStack.pop();
      this.clearUndefined();
    }
    console.log(this.targetStack);
  };
  falsifyAdjacentToSunk = () => {
    console.log(this.shotHistory);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (
          typeof this.shotHistory[i][j] === 'string' &&
          this.shotHistory[i][j].slice(0, 4) === 'SUNK'
        ) {
          console.log('wut');
        }
      }
    }
  };
}

export { Player };

// advanced targeting logic
// - keep an array of previous shots and their results ✓
// - false = miss
// - null = no shot yet
// - true = hit
// - 'S' = sunk already
// - before taking a shot, search the array for a hit (but not sunk)
// - check the squares around - above, right, below, left
// - if one of these is also a hit, the target the opposite side
// - eg.
// - keep a Stack of potential targets ✓
// - clear related targets from stack if ship sunk ✓
// - set all squares one away from sunk ship to false
// - check for lines
