'use strict';

import { Ship } from './Ship.js';

class Gameboard {
  constructor(size) {
    this.size = size;
    this.shipsSunk = 0;
    this.numberOfShips = 5;
    // create ships
    this.carrier = new Ship('carrier', 5);
    this.battleship = new Ship('battleship', 4);
    this.cruiser = new Ship('cruiser', 3);
    this.submarine = new Ship('submarine', 3);
    this.destroyer = new Ship('destroyer', 2);
    // build game board
    this.createBoard();
    this.positionShip(this.carrier, 9, 0, 0);
    this.positionShip(this.battleship, 0, 5, 1);
    this.positionShip(this.cruiser, 3, 3, 1);
    this.positionShip(this.submarine, 1, 1, 0);
    this.positionShip(this.destroyer, 4, 9, 1);
  }
  setSize = (size) => {
    if (size !== this.size) {
      this.size = size;
      this.createBoard(this.size);
    }
  };
  createBoard = () => {
    const board = [];
    for (let i = 0; i < this.size; i++) {
      board[i] = [];
      for (let j = 0; j < this.size; j++) {
        board[i][j] = null;
      }
    }
    this.board = board;
    return this.board;
  };
  positionShip = (ship, x, y, orientation) => {
    // orientation: 0 = vertical | 1 = horizontal
    if (orientation === 0) {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
  };
  receiveAttack = (x, y) => {
    // temp bug fix???
    // if (x === undefined || y === undefined) {
    //   return { result: null, ship: null };
    // }
    //
    const target = this.board[x][y];
    if (!target) {
      // miss
      this.board[x][y] = 'O';
      return { result: false, ship: null };
    } else if (target instanceof Ship) {
      // hit
      this.board[x][y].addHit();
      if (target.sunk) this.shipsSunk++;
      this.board[x][y] = 'X';
      return { result: true, ship: target };
    } else {
      // already targeted
      return { result: null, ship: null };
    }
  };
  checkWin = () => {
    return this.shipsSunk === this.numberOfShips ? true : false;
  };
}

export { Gameboard };
