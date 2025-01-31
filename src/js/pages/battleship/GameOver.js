'use strict';

class GameOver {
  constructor(winner) {
    this.winner = winner;
  }
  gameover = async () => {
    const winContainer = document.querySelector('.win-container');
    winContainer.classList.add('flex');
    const message = document.getElementById('win-message');
    message.innerText = `${this.winer} WINS!!!`;
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
      const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
      const players = ['human', 'computer'];
      for (let player of players) {
        for (let ship of ships) {
          let icon = document.getElementById(`${ship}-${player}`);
          icon.classList.remove('sunk');
        }
      }
      button.removeEventListener('click', newGame);
    };
    button.addEventListener('click', newGame);
  };
}

export { GameOver };

// async function handleClick() {
//   return new Promise((resolve) => {
//     document.getElementById('myButton').addEventListener('click', function(event) {
//       // Perform some action here
//       resolve('Action completed');
//     });
//   });
// }

// async function main() {
//   try {
//     const result = await handleClick();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();
