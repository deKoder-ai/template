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
    for (let x = 0; x < this.size; x++) {
      shotHistory[x] = [];
      for (let y = 0; y < this.size; y++) {
        shotHistory[x][y] = { hit: null, target: null };
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
    console.log(this.targetStack);
    console.log(this.shotHistory);
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
  // from chat gpt
  addNewTargetsX = (x, y, target) => {
    let newTargets = [];

    // Check adjacent squares
    const adjacent = [
      { x: x + 1, y: y, direction: 'right' },
      { x: x - 1, y: y, direction: 'left' },
      { x: x, y: y + 1, direction: 'down' },
      { x: x, y: y - 1, direction: 'up' },
    ];

    for (let pos of adjacent) {
      if (
        pos.x >= this.min &&
        pos.x <= this.max &&
        pos.y >= this.min &&
        pos.y <= this.max
      ) {
        if (this.shotHistory[pos.x][pos.y].hit === null) {
          newTargets.push({
            priority: 1,
            x: pos.x,
            y: pos.y,
            direction: pos.direction,
            target: target,
          });
        }
      }
    }

    // Check if this hit aligns with a previous hit
    let alignedTargets = newTargets.filter((t) => {
      if (t.direction === 'left' || t.direction === 'right') {
        return (
          this.shotHistory[t.x][t.y]?.hit === true && this.shotHistory[x][y]?.hit === true
        );
      }
      if (t.direction === 'up' || t.direction === 'down') {
        return (
          this.shotHistory[t.x][t.y]?.hit === true && this.shotHistory[x][y]?.hit === true
        );
      }
      return false;
    });

    if (alignedTargets.length > 0) {
      // Prioritize extending in the determined direction
      this.targetStack = this.targetStack.filter((t) => t.target !== target); // Remove previous guesses
      this.targetStack.push(...alignedTargets.map((t) => ({ ...t, priority: 3 }))); // Higher priority for directional shots
    } else {
      // Add all four directions if no alignment is detected
      this.targetStack.push(...newTargets);
    }

    this.targetStack = this.arrayObjectSort(this.targetStack, 'priority', true);
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
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.shotHistory[x][y].target === type) {
          this.shotHistory[x][y].hit = 'sunk';
          sunkArray.push({ x: x, y: y });
        }
      }
    }
    this.updateSunkAdjacentToFalse(sunkArray);
    this.removeSunkFromTargetStack(type);
  };
  updateSunkAdjacentToFalse = (array) => {
    const sunkArray = array;
    while (array.length) {
      let square;
      const xy = array.pop();
      const x = xy.x;
      const y = xy.y;
      if (x + 1 < this.max) {
        square = this.shotHistory[x + 1][y];
        if (square.hit === null) this.shotHistory[x + 1][y].hit = false;
      }
      if (x - 1 >= this.min) {
        square = this.shotHistory[x - 1][y];
        if (square.hit === null) this.shotHistory[x - 1][y].hit = false;
      }
      if (y + 1 < this.max) {
        square = this.shotHistory[x][y + 1];
        if (square.hit === null) this.shotHistory[x][y + 1].hit = false;
      }
      if (y - 1 >= this.min) {
        square = this.shotHistory[x][y - 1];
        if (square.hit === null) this.shotHistory[x][y - 1].hit = false;
      }
      // diagonally adjacent
      if (x + 1 < this.max && y + 1 < this.max) {
        square = this.shotHistory[x + 1][y + 1];
        if (square.hit === null) this.shotHistory[x + 1][y + 1].hit = false;
      }
      if (x - 1 >= this.min && y - 1 >= this.min) {
        square = this.shotHistory[x - 1][y - 1];
        if (square.hit === null) this.shotHistory[x - 1][y - 1].hit = false;
      }
      if (x - 1 >= this.min && y + 1 < this.max) {
        square = this.shotHistory[x - 1][y + 1];
        if (square.hit === null) this.shotHistory[x - 1][y + 1].hit = false;
      }
      if (x + 1 < this.max && y - 1 >= this.min) {
        square = this.shotHistory[x + 1][y - 1];
        if (square.hit === null) this.shotHistory[x + 1][y - 1].hit = false;
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
