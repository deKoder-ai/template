import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

const gb = new Gameboard(8, 'human');
const ship = new Ship(5);

test('check carrier', () => {
  expect(gb.carrier).toBeInstanceOf(Ship);
  expect(gb.carrier.length).toBe(5);
});

test('gameboard creation', () => {
  gb.createBoard();
  expect(gb.board.length).toBe(8);
  expect(gb.board[0].length).toBe(8);
  expect(gb.board[7].length).toBe(8);
})

test('set gb size', () => {
  gb.setSize(10);
  expect(gb.size).toBe(10);
  expect(gb.board.length).toBe(10);
  expect(gb.board[0].length).toBe(10);
  expect(gb.board[9].length).toBe(10);
});

test('position ship vertically', () => {
  expect(gb.board[1][1]).toBe(gb.submarine);
  expect(gb.board[1][2]).toBe(gb.submarine);
  expect(gb.board[1][3]).toBe(gb.submarine);
  expect(gb.board[1][4]).toBe(null);
})

test('position ship horizontally', () => {
  expect(gb.board[3][3].length).toBe(3);
  expect(gb.board[3][3]).toBe(gb.cruiser);
  expect(gb.board[4][3]).toBe(gb.cruiser);
  expect(gb.board[5][3]).toBe(gb.cruiser);
  expect(gb.board[6][3]).toBe(null);
})

test('receive attack miss', () => {
  expect(gb.board[4][5]).toBe(null);
  expect(gb.receiveAttack(4, 5)).toBe(false);
  expect(gb.board[4][5]).toBe('O');
  expect(gb.receiveAttack(4, 5)).toBe(null);
  expect(gb.board[4][5]).toBe('O');
})

test('receive attack hit', () => {
  expect(gb.board[3][3]).toBe(gb.cruiser);
  expect(gb.receiveAttack(3, 3)).toBe(true);
  expect(gb.board[3][3]).toBe('X');
  expect(gb.receiveAttack(3, 3)).toBe(null);
  expect(gb.board[3][3]).toBe('X');
  expect(gb.cruiser.hits).toBe(1);
})

test('sink boat', () => {
  expect(gb.shipsSunk).toBe(0);
  expect(gb.receiveAttack(4, 3)).toBe(true);
  expect(gb.receiveAttack(5, 3)).toBe(true);
  expect(gb.cruiser.hits).toBe(3);
  expect(gb.cruiser.sunk).toBe(true);
  expect(gb.shipsSunk).toBe(1);
  expect(gb.checkWin()).toBe(false);
  // console.log(gb.board)
})

