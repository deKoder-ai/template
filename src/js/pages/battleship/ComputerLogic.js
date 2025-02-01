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
    this.targetStack = this.arrayObjectSort(this.targetStack, 'priority', true);
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
        a = { priority: 1, type: 'a', x: x + 1, y: y, target: target };
      }
    }
    if (x - 1 >= this.min) {
      square = this.shotHistory[x - 1][y];
      if (square.hit === null) {
        b = { priority: 1, type: 'b', x: x - 1, y: y, target: target };
      }
    }
    if (y + 1 < this.max) {
      square = this.shotHistory[x][y + 1];
      if (square.hit === null) {
        c = { priority: 1, type: 'c', x: x, y: y + 1, target: target };
      }
    }
    if (y - 1 >= this.min) {
      square = this.shotHistory[x][y - 1];
      if (square.hit === null) {
        d = { priority: 1, type: 'd', x: x, y: y - 1, target: target };
      }
    }
    this.decideBestTargets(a, b, c, d);
  };
  decideBestTargets = (a, b, c, d, x, y) => {
    let line = false;
    // a: x + 1 | b: x - 1 | x: y + 1 | d: y - 1
    if (a && a.x - 2 >= this.min && this.shotHistory[a.x - 2][a.y].hit === true) {
      console.log('aaaa');
      a.priority += 2;
      if (b) b.priority += 1;
    } else if (b && b.x + 2 < this.max && this.shotHistory[b.x + 2][b.y].hit === true) {
      console.log('bbbb');
      b.priority += 2;
      if (a) a.priority += 1;
    } else if (c && c.y - 2 >= this.min && this.shotHistory[c.x][c.y - 2].hit === true) {
      console.log('cccc');
      c.priority += 2;
      if (d) d.priority += 1;
    } else if (d && d.y + 2 < this.max && this.shotHistory[d.x][d.y + 2].hit === true) {
      console.log('dddd');
      d.priority += 2;
      if (c) c.priority += 1;
    }
    // if a hit but next a is out of range, find old b in stack and raise priority
    // if last hit = a and no new a, find old b and raise priority

    if (a) this.targetStack.push(a);
    if (b) this.targetStack.push(b);
    if (c) this.targetStack.push(c);
    if (d) this.targetStack.push(d);

    this.targetStack = this.arrayObjectSort(this.targetStack, 'priority', true);
    console.log(this.targetStack);
  };
  arrayObjectSort = (array, key, order) => {
    if (order) {
      array.sort((a, b) => a[key] - b[key]);
    } else {
      array.sort((a, b) => b[key] - a[key]);
    }
    return array;
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

// sort array by object key
// const arr = [
//   { id: 1, name: "John", age: 41 },
//   { id: 2, name: "Zack", age: 35 },
//   { id: 3, name: "Peter", age: 47 }
// ];

// arr.sort((a, b) => a.age - b.age);

// sort in descending order to allow for pop of higher priority
// arr.sort((a, b) => b.age - a.age);

// const arrayObjectSort = (array, key, order) => {
//   key = key;
//   if (order) {
//     array.sort((a, b) => a.key - b.key);
//   } else {
//     array.sort((a, b) => b.key - a.key);
//   }
// }

export { ComputerLogic };
