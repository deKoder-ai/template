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
    this.ships = [
      this.carrier,
      this.battleship,
      this.cruiser,
      this.submarine,
      this.destroyer,
    ];
    // build game board
    this.createBoard();
    this.placeShips();
  }
  createBoard = () => {
    const board = [];
    for (let x = 0; x < this.size; x++) {
      // x = columns
      board[x] = [];
      for (let y = 0; y < this.size; y++) {
        // y = rows
        board[x][y] = null;
      }
    }
    this.board = board;
    return this.board;
  };

  // createBoard = () => {
  //   const board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
  //   this.board = board;
  //   return this.board;
  // };
  isValidPlacement(ship, x, y, orientation) {
    const { length } = ship;
    for (let i = 0; i < length; i++) {
      let newX = orientation === 1 ? x + i : x;
      let newY = orientation === 0 ? y + i : y;
      if (newX >= this.size || newY >= this.size || this.board[newX][newY] !== null) {
        return false; // Out of bounds or overlapping
      }
      // Check adjacent squares, excluding out-of-bounds checks
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          let checkX = newX + dx;
          let checkY = newY + dy;
          // Ensure we only check in-bounds neighbors
          if (
            checkX >= 0 &&
            checkX < this.size &&
            checkY >= 0 &&
            checkY < this.size &&
            this.board[checkX][checkY] !== null
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }
  placeShips() {
    for (const ship of this.ships) {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * this.size);
        const y = Math.floor(Math.random() * this.size);
        const orientation = Math.random() < 0.5 ? 0 : 1; // 50% chance of horizontal or vertical
        if (this.isValidPlacement(ship, x, y, orientation)) {
          this.positionShip(ship, x, y, orientation);
          placed = true;
        }
      }
    }
  }
  positionShip(ship, x, y, orientation) {
    for (let i = 0; i < ship.length; i++) {
      let newX = orientation === 1 ? x + i : x;
      let newY = orientation === 0 ? y + i : y;
      this.board[newX][newY] = ship;
    }
  }
  // positionShip = (ship, x, y, orientation) => {
  //   // orientation: 0 = vertical | 1 = horizontal
  //   if (orientation === 0) {
  //     for (let i = 0; i < ship.length; i++) {
  //       this.board[x][y + i] = ship;
  //     }
  //   } else {
  //     for (let i = 0; i < ship.length; i++) {
  //       this.board[x + i][y] = ship;
  //     }
  //   }
  // };
  receiveAttack = (x, y) => {
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

// class BattleshipGame {
//   constructor(size = 10) {
//     this.size = size;
//     this.board = Array.from({ length: size }, () => Array(size).fill(null));
//     this.ships = [{ length: 5 }, { length: 4 }, { length: 3 }, { length: 3 }, { length: 2 }];
//   }

//   isValidPlacement(ship, x, y, orientation) {
//     const { length } = ship;
//     for (let i = 0; i < length; i++) {
//       let newX = orientation === 1 ? x + i : x;
//       let newY = orientation === 0 ? y + i : y;
//       if (newX >= this.size || newY >= this.size || this.board[newX][newY] !== null) {
//         return false; // Out of bounds or overlapping
//       }
//       // Check adjacent squares, excluding out-of-bounds checks
//       for (let dx = -1; dx <= 1; dx++) {
//         for (let dy = -1; dy <= 1; dy++) {
//           let checkX = newX + dx;
//           let checkY = newY + dy;
//           // Ensure we only check in-bounds neighbors
//           if (
//             checkX >= 0 && checkX < this.size &&
//             checkY >= 0 && checkY < this.size &&
//             this.board[checkX][checkY] !== null
//           ) {
//             return false;
//           }
//         }
//       }
//     }
//     return true;
//   }

//   placeShips() {
//     for (const ship of this.ships) {
//       let placed = false;
//       while (!placed) {
//         const x = Math.floor(Math.random() * this.size);
//         const y = Math.floor(Math.random() * this.size);
//         const orientation = Math.random() < 0.5 ? 0 : 1; // 50% chance of horizontal or vertical

//         if (this.isValidPlacement(ship, x, y, orientation)) {
//           this.positionShip(ship, x, y, orientation);
//           placed = true;
//         }
//       }
//     }
//   }

//   positionShip(ship, x, y, orientation) {
//     for (let i = 0; i < ship.length; i++) {
//       let newX = orientation === 1 ? x + i : x;
//       let newY = orientation === 0 ? y + i : y;
//       this.board[newX][newY] = ship;
//     }
//   }
// }

// const game = new BattleshipGame();
// game.placeShips();
// console.log(game.board);
