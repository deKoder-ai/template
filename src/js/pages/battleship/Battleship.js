'use strict';

import { F } from '../../classes/Functions';
import html from './battleship.html';
import './battleship.css';
import { Player } from './Player.js';
import { Ship } from './Ship.js';
import { GameOver } from './GameOver.js';
import { ComputerLogic } from './ComputerLogic.js';

class Battleship {
  constructor() {
    this.html = html;
    this.size = 10;
    document.addEventListener('DOMContentLoaded', this.build);
    this.build = () => {
      this.player1 = new Player('human', this.size);
      this.player2 = new Player('computer', this.size);
      this.logic = new ComputerLogic(this.size);
      this.board1 = document.getElementById('board-1');
      this.board2 = document.getElementById('board-2');
      this.buildBoardDisplay(this.board1, 'human');
      this.buildBoardDisplay(this.board2, 'computer');
      this.currentPlayer = this.initFirstPlayer();
      if (this.currentPlayer === 'computer') {
        this.pauseBeforeShot();
      }
      document.addEventListener('click', this.playerShotEvent);
    };
  }
  buildBoardDisplay = (container, player) => {
    const squares = this.size;
    for (let x = 0; x < squares; x++) {
      for (let y = 0; y < squares; y++) {
        let square;
        if (player === 'human') {
          let id = `hum-${x}-${y}`;
          square = F.htmlElement('div', '', 'gb-square', id);
        } else {
          let id = `comp-${x}-${y}`;
          square = F.htmlElement('div', '', 'gb-square', id);
        }
        container.appendChild(square);
        // if square is ship and player is human
        // then change background-color to ship
        if (this.player1.gb.board[x][y] instanceof Ship && player == 'human') {
          square.classList.add('ship');
        }
      }
    }
  };
  initFirstPlayer = () => {
    const firstPlayer = Math.floor(Math.random() * 2) + 1;
    if (firstPlayer === 1) {
      return 'human';
    } else {
      return 'computer';
    }
  };
  playerShotEvent = (e) => {
    // check it is the human turn
    if (this.currentPlayer === 'human') {
      const id = e.target.id;
      const split = id.split('-');
      if (split[0] === 'comp') {
        // define coordinates from element id
        const x = Number(split[1]);
        const y = Number(split[2]);
        const targetSquare = document.getElementById(`comp-${x}-${y}`);
        const attack = this.player2.gb.receiveAttack(x, y);
        const attackResult = attack.result;
        // adjust display for hit or miss and manage turn
        if (attackResult === false) {
          this.miss(targetSquare);
        } else if (attackResult === true) {
          this.hit(x, y, targetSquare, attack);
        }
      }
    }
  };
  pauseBeforeShot = async () => {
    // simulated thinking time
    // const ms = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    const ms = 0;
    await new Promise((resolve) => setTimeout(resolve, ms));
    this.computerShotEvent();
  };
  computerShotEvent = async () => {
    const xy = this.logic.computerShot();
    const x = xy.x;
    const y = xy.y;
    console.log(this.logic.targetStack);

    const targetSquare = document.getElementById(`hum-${x}-${y}`);
    const attack = this.player1.gb.receiveAttack(x, y);
    const attackResult = attack.result;
    if (attackResult === false) {
      this.logic.updateHistory(x, y, false, null);
      this.miss(targetSquare);
    } else if (attackResult === true) {
      this.logic.updateHistory(x, y, true, attack.ship.type);
      this.hit(x, y, targetSquare, attack);
    } else {
      // square already targeted, try again
      // can probably remove this after new logic completed
      this.computerShotEvent();
    }
  };
  toggleCurrentPlayer = () => {
    if (this.currentPlayer === 'human') {
      this.currentPlayer = 'computer';
    } else {
      this.currentPlayer = 'human';
    }
  };
  miss = (targetSquare) => {
    targetSquare.classList.add('miss');
    this.toggleCurrentPlayer();
    if (this.currentPlayer === 'computer') {
      this.pauseBeforeShot();
    }
  };
  hit = (x, y, targetSquare, attack) => {
    if (this.currentPlayer === 'human') targetSquare.classList.add('ship');
    targetSquare.classList.add('hit');
    if (attack.ship.checkSunk()) {
      const ship = document.getElementById(`${attack.ship.type}-${this.currentPlayer}`);
      ship.classList.add('sunk');
      if (this.currentPlayer === 'computer') this.logic.sunkEvent(attack.ship.type);
    }
    if (this.currentPlayer === 'human') {
      if (this.player2.gb.checkWin()) {
        this.gameOver();
      }
    } else {
      if (this.player1.gb.checkWin()) {
        this.gameOver();
      } else {
        this.pauseBeforeShot();
      }
    }
  };
  revealComputerShips = () => {
    const squares = this.size;
    for (let x = 0; x < squares; x++) {
      for (let y = 0; y < squares; y++) {
        const square = document.getElementById(`comp-${x}-${y}`);
        if (this.player2.gb.board[x][y] instanceof Ship) {
          square.classList.add('ship');
        }
      }
    }
  };
  gameOver = async () => {
    const winner = this.currentPlayer.toUpperCase();
    const winContainer = document.querySelector('.win-container');
    winContainer.classList.add('flex');
    const message = document.getElementById('win-message');
    message.innerText = `${winner} WINS!!!`;
    const button = document.getElementById('new-game-btn');
    const countdown = document.getElementById('countdown');
    if (winner === 'COMPUTER') {
      this.revealComputerShips();
    }
    const newGame = async () => {
      winContainer.classList.remove('flex');
      countdown.style.display = 'block';
      countdown.innerText = '5';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.innerText = '4';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.innerText = '3';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.innerText = '2';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.innerText = '1';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.classList.add('red');
      countdown.innerText = '0';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      countdown.style.display = 'none';
      countdown.classList.remove('red');
      const board1 = document.getElementById('board-1');
      const board2 = document.getElementById('board-2');
      board1.innerHTML = '';
      board2.innerHTML = '';
      this.player1 = undefined;
      this.player2 = undefined;
      const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
      const players = ['human', 'computer'];
      for (let player of players) {
        for (let ship of ships) {
          let icon = document.getElementById(`${ship}-${player}`);
          icon.classList.remove('sunk');
        }
      }
      this.build();
      button.removeEventListener('click', newGame);
    };
    button.addEventListener('click', newGame);
  };
}

export { Battleship };

// to do
// - repeat sink class to icon for computer hits ✓
// - add html and logic to reset game after win ✓
// - advanced targeting logic ✓
//   - keep an array of previous shots and their results
//   - before taking a shot, search the array for a hit square
//     whose ship is not sunk that has an empty square adjacent
//     target one of these squares
// - wait x seconds before displaying ship icons and battleship
//     title to ensure font is loaded. Can check with js?
// - keep score for multiple games
// - reveal computer's ships if computer wins ✓ >>bug
// - move gameover to a separate class and build new game when promise returned
//     from click
// - fix bug when displaying the computer's ships at the end of the game ✓
// - randomise ship placement at start of game

// to commit

// Committed
// Battleship updates

// - update computer strategy algorithm
// - fix bug when displaying the computer's ships at gameover
// - create asyncPause and arrayObjectSort scripts

// Committed
// Battleship update

// - merge branch
// - start planning for more intelligent targeting
// - remove number of shots tracking from logic - not needed

// Committed
// Battleship computer logic updates

// - add method to reveal computer's ships if computer wins
// - if computer sinks boat, update all historical hits of that ship type to sunk
// - update squares adjacent to sunk boat to false so they are not targeted as we
//   know there cannot be a ship there
// - add Logic.shot to track whether it is the first shot of the round or a repeat
// - begin building logic to determine likely future hits and storing them in a stack
// - remove potential targets from stack if related boat is sunk
// - add logic to choose random shot or targeted from stack

// Committed
// Battleship updates

//  - create ComputerLogic class
//  - logic - create random coordinates method
//  - logic - build shot history graph
//  - update shot history object with result of attack for miss
//  - refactor Battleship to merge hit & computerHit methods to avoid repetition
//  - update shot history object for hit { hit: true, target: (ship type)}
