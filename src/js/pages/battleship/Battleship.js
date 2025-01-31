'use strict';

import { F } from '../../classes/Functions';
import html from './battleship.html';
import './battleship.css';
import { Player } from './Player.js';
import { Ship } from './Ship.js';
// import { GameOver } from './GameOver.js';

class Battleship {
  constructor() {
    this.html = html;
    this.size = 10;
    document.addEventListener('DOMContentLoaded', this.build);
    this.build = () => {
      this.player1 = new Player('human', this.size);
      this.player2 = new Player('computer', this.size);
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
  // this needs two methods, one for the computer, one for human
  // or run twice with a parameter set between human and computer
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
          this.hit(targetSquare, attack);
        }
      }
    }
  };
  pauseBeforeShot = async (x, y, repeat) => {
    // simulated thinking time
    const ms = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    await new Promise((resolve) => setTimeout(resolve, ms));
    this.computerShotEvent(x, y, repeat);
  };
  computerShotEvent = async (x, y, repeat) => {
    // check if target stack has targets, if so pop and use
    const stackLength = this.player2.targetStack.length;
    if (this.player2.targetStack[stackLength - 1]) {
      console.log(this.player2.targetStack);
      const xy = this.player2.targetStack.pop();
      x = xy.x;
      y = xy.y;
    } else {
      // if (!repeat) {
      // if fresh shot, get random coordinates
      const xy = this.player2.computerShot();
      x = xy.x;
      y = xy.y;
    }
    // temp remove old secondary targeting logic
    // else {
    //   // if shot follows hit, use secondary strike logic
    //   const xy = this.player2.postHitShot(x, y);
    //   x = xy.x;
    //   y = xy.y;
    // }
    const targetSquare = document.getElementById(`hum-${x}-${y}`);
    const attack = this.player1.gb.receiveAttack(x, y);
    const attackResult = attack.result;

    if (attackResult === false) {
      // update atl array
      this.player2.shotHistory[x][y] = false;

      this.miss(targetSquare);
    } else if (attackResult === true) {
      this.computerHit(targetSquare, attack, x, y);
    } else {
      // square already targeted, try again
      this.computerShotEvent();
    }

    // check atl array
    // console.log(this.player2.shotHistory);
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
  hit = (targetSquare, attack) => {
    targetSquare.classList.add('ship');
    targetSquare.classList.add('hit');
    console.log(attack.ship.type);
    if (attack.ship.checkSunk()) {
      const ship = document.getElementById(`${attack.ship.type}-computer`);
      ship.classList.add('sunk');
    }
    if (this.player2.gb.checkWin()) {
      this.gameOver('HUMAN');
      // alert(`You Wins!`);
    }
  };
  computerHit = (targetSquare, attack, x, y) => {
    targetSquare.classList.add('ship');
    targetSquare.classList.add('hit');
    if (attack.ship.checkSunk()) {
      // update atl array for sunk ship
      this.player2.shotHistory[x][y] = `SUNK-${attack.ship.type}`;
      console.log(this.player2.shotHistory);
      this.player2.updateSunkenHits(x, y, `SUNK-${attack.ship.type}`);
      this.player2.clearSunkFromStack(attack.ship.type);
      this.player2.falsifyAdjacentToSunk();

      const ship = document.getElementById(`${attack.ship.type}-human`);
      ship.classList.add('sunk');
    } else {
      // update atl array for hit
      this.player2.shotHistory[x][y] = { hit: true, type: attack.ship.type };
      this.player2.getAdjacentTargets(x, y, attack.ship.type);
    }
    if (this.player1.gb.checkWin()) {
      this.gameOver('COMPUTER');
      // alert(`Computer Wins!`);
    } else {
      this.pauseBeforeShot(x, y, true);
    }
  };

  gameOver = async (winner) => {
    const winContainer = document.querySelector('.win-container');
    winContainer.classList.add('flex');
    const message = document.getElementById('win-message');
    message.innerText = `${winner} WINS!!!`;
    const button = document.getElementById('new-game-btn');
    const countdown = document.getElementById('countdown');
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
// repeat sink class to icon for computer hits ✓
// add html and logic to reset game after win ✓
// advanced targeting logic
// - keep an array of previous shots and their results
// - before taking a shot, search the array for a hit square
//   whose ship is not sunk that has an empty square adjacent
//   target one of these squares
// wait x seconds before displaying ship icons and battleship
//   title to ensure font is loaded. Can check with js?
// keep score for multiple games
// reveal computer's ships if computer wins
// move gameover to a separate class and build new game when promise returned
// from click
