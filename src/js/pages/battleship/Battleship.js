'use strict';

import { F } from '../../classes/Functions';
import html from './battleship.html';
import './battleship.css';
import { Player } from './Player.js';
import { Ship } from './Ship.js';

class Battleship {
  constructor() {
    this.html = html;
    this.size = 10;
    this.player1 = new Player('human', this.size);
    this.player2 = new Player('computer', this.size);
    document.addEventListener('DOMContentLoaded', this.build);
    this.build = () => {
      this.board1 = document.getElementById('board-1');
      this.board2 = document.getElementById('board-2');
      this.buildBoardDisplay(this.board1, 'human');
      this.buildBoardDisplay(this.board2, 'computer');
      this.initPlayerTurn();
      this.currentPlayer = this.player2; //
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
  initPlayerTurn = () => {
    // this.turn = Math.floor(Math.random() * 2) + 1;
    this.turn = 2;
  };
  playerShotEvent = (e) => {
    const id = e.target.id;
    const split = id.split('-');
    if (split[0] === 'comp') {
      // define coordinates from element id
      const x = Number(split[1]);
      const y = Number(split[2]);
      const target = document.getElementById(`comp-${x}-${y}`);
      const attack = this.player2.gb.receiveAttack(x, y);
      // adjust display for hit or miss and manage turn
      if (attack === false) {
        target.classList.add('miss');
        this.computerShotEvent();
        this.toggleTurn();
      } else if (attack === true) {
        target.classList.add('ship');
        target.classList.add('hit');
        if (this.player2.gb.checkWin()) {
          alert(`${this.player2} Wins!`);
        }
        // add ship class if computer board
        // target.classList.add('ship');
      }
    }
  };
  computerShotEvent = () => {
    const xy = this.player2.computerShot();
    const x = xy[0];
    const y = xy[1];
    const target = document.getElementById(`hum-${x}-${y}`);
    const attack = this.player1.gb.receiveAttack(x, y);
    if (attack === false) {
      target.classList.add('miss');
      this.toggleTurn();
    } else if (attack === true) {
      target.classList.add('ship');
      target.classList.add('hit');
      if (this.player1.gb.checkWin()) {
        alert(`${this.player1} Wins!`);
      } else {
        this.computerShotEvent();
        // const xy = this.player2.computerShot(x, y, true);
      }
    } else {
      this.computerShotEvent();
    }
  };
  toggleTurn = () => {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  };
}

export { Battleship };
