'use strict';

class ComputerLogic {
  constructor(size) {
    this.size = size;
    this.min = 0;
    this.max = this.size - 1;
    this.shotHistory = this.createShotHistoryGraph();
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
  randomCoordinates = () => {
    const x = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    const y = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    // generate new coordinates if square has already been targeted, else return coordinates
    if (this.shotHistory[x][y].hit !== null) {
      return this.randomCoordinates();
    } else {
      return { x: x, y: y };
    }
  };
  updateHistory = (x, y, result, target) => {
    if (result === false) target = null;
    this.shotHistory[x][y] = { hit: result, target: target };
    console.log(this.shotHistory);
  };
}

export { ComputerLogic };
