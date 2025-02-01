'use strict';

class ComputerLogic {
  constructor(size) {
    this.size = size;
    this.min = 0;
    this.max = this.size - 1;
    this.shotHistory = this.createShotHistoryGraph();
    this.targetStack = [];
  }
  createShotHistoryGraph = () => {
    const shotHistory = [];
    for (let i = 0; i < this.size; i++) {
      shotHistory[i] = [];
      for (let j = 0; j < this.size; j++) {
        shotHistory[i][j] = { hit: null, target: null };
      }
    }
    return shotHistory;
  };
  computerShot = () => {
    let xy;
    if (!this.targetStack.length) {
      xy = this.randomCoordinates();
      // console.log('random');
    } else {
      const nextTarget = this.targetStack.pop();
      xy = { x: nextTarget.x, y: nextTarget.y };
      // console.log('targeted');
    }
    return xy;
  };
  randomCoordinates = () => {
    const x = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    const y = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    // recursively generate new coordinates until untargeted square if found,
    // then return generated coordinates
    if (this.shotHistory[x][y].hit !== null) {
      return this.randomCoordinates();
    } else {
      return { x: x, y: y };
    }
  };
  updateHistory = (x, y, result, target) => {
    // target is null if miss
    if (result === false) {
      target = null;
    }
    // update history
    this.shotHistory[x][y] = { hit: result, target: target };
    // create new prospective targets if hit
    if (result === true) {
      this.addNewTargets(x, y, target);
    }
  };
  addNewTargets = (x, y, target) => {
    // check adjacent squares
    let square, a, b, c, d;
    // get possible targets
    if (x + 1 < this.max) {
      square = this.shotHistory[x + 1][y];
      if (square.hit === null) {
        a = { x: x + 1, y: y, target: target };
      }
    }
    if (x - 1 >= this.min) {
      square = this.shotHistory[x - 1][y];
      if (square.hit === null) {
        b = { x: x - 1, y: y, target: target };
      }
    }
    if (y + 1 < this.max) {
      square = this.shotHistory[x][y + 1];
      if (square.hit === null) {
        c = { x: x, y: y + 1, target: target };
      }
    }
    if (y - 1 >= this.min) {
      square = this.shotHistory[x][y - 1];
      if (square.hit === null) {
        d = { x: x, y: y - 1, target: target };
      }
    }
    this.decideBestTargets(a, b, c, d);
  };
  decideBestTargets = (a, b, c, d, x, y) => {
    let line = false;
    // potential for using something like a binary search tree here
    // add nodes up to depth 5 (length) of carrier) in the four directions
    // these nodes contain the known information about squares
    // if a branch has a hit, may be more likely to contain others
    // if carrier sunk, delete all nodes at depth 5, etc
    // check for lines
    if (a && b && this.shotHistory[b.x][b.y].hit === true) {
      this.targetStack.push(a);
      line = true;
    } else if (a && x + 2 < this.max && this.shotHistory[x + 2][y].hit === true) {
      this.targetStack.push(a);
      line = true;
    }
    if (a && b && this.shotHistory[a.x][a.y].hit === true) {
      this.targetStack.push(b);
      line = true;
    } else if (b && x - 2 >= this.min && this.shotHistory[x - 2][y].hit === true) {
      this.targetStack.push(b);
      line = true;
    }
    if (c && d && this.shotHistory[d.x][d.y].hit === true) {
      this.targetStack.push(c);
      line = true;
    } else if (c && y + 2 < this.max && this.shotHistory[x][y + 2].hit === true) {
      this.targetStack.push(c);
      line = true;
    }
    if (c && d && this.shotHistory[c.x][c.y].hit === true) {
      this.targetStack.push(d);
      line = true;
    } else if (d && y - 2 >= this.min && this.shotHistory[x][y - 2].hit === true) {
      this.targetStack.push(d);
      line = true;
    }
    // if no lines, add all valid possible targets to the stack
    //line logic not working!>?!?!?!?!?
    if (!line) {
      if (a) this.targetStack.push(a);
      if (b) this.targetStack.push(b);
      if (c) this.targetStack.push(c);
      if (d) this.targetStack.push(d);
    }
    // console.log(line);
    console.log(this.targetStack);
  };
  sunkEvent = (type) => {
    const sunkArray = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.shotHistory[i][j].target === type) {
          this.shotHistory[i][j].hit = 'sunk';
          sunkArray.push({ x: i, y: j });
        }
      }
    }
    this.updateSunkAdjacentToFalse(sunkArray);
    this.removeSunkFromTargetStack(type);
  };
  updateSunkAdjacentToFalse = (array) => {
    while (array.length) {
      let square;
      const xy = array.pop();
      const x = xy.x;
      const y = xy.y;
      if (x + 1 < this.max) {
        square = this.shotHistory[x + 1][y];
        if (square.hit === null) square.hit = false;
      }
      if (x - 1 >= this.min) {
        square = this.shotHistory[x - 1][y];
        if (square.hit === null) square.hit = false;
      }
      if (y + 1 < this.max) {
        square = this.shotHistory[x][y + 1];
        if (square.hit === null) square.hit = false;
      }
      if (y - 1 >= this.min) {
        square = this.shotHistory[x][y - 1];
        if (square.hit === null) square.hit = false;
      }
    }
  };
  removeSunkFromTargetStack = (sunk) => {
    const newStack = [];
    for (let target of this.targetStack) {
      if (target.target !== sunk) {
        newStack.push(target);
      }
    }
    this.targetStack = newStack;
  };
}
// { hit: null, target: null }

// if boat is sunk:
// - update all hits of that type to sunk ✓
// - update adjacent squares to false (ships cannot be adjacent) ✓
// - remove potential shots targeting that ship type form stack ✓

//            ?
//            ?
//            ?
//            ?
//            ?
//  ? ? ? ? ? H ? ? ? ? ?
//            ?
//            ?
//            ?
//            ?
//            ?
// the length of the array should be that of the longest survivng ship
// or the edge of the board, whichever is shorter
// generate 4 arrays, 1 for each possible direction from hit
// arrays contain known historical information about squares

// if array contains a miss, only add the adjacent square to the stack
// if an array contains a hit, make it the most likely direction to follow
// if adjacent shot is miss, delete array
//            ?
//            ?
//            ?
//            M
//            ?
//  ? ? ? ? ? H ? H ? ? ?
//            M
//            ?/
//            ?/
//            ?/
//            ?/

// this will need a more complicated stack structure and planning, but should
// result in more intelligent targeting

// hit creates this object:
// {type: submarine, up: [], right: [], down: [], left: []}

export { ComputerLogic };
