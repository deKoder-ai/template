import { Ship } from "./Ship";

const ship = new Ship('submarine', 3);

test('ship add hit', () => {
  expect(ship.addHit()).toBe(1);
  expect(ship.addHit()).toBe(2);
});

test('ship size', () => {
  expect(ship.length).toBe(3);
});

test('ship sunk', () => {
  expect(ship.sunk).toBe(false);
  ship.addHit();
  expect(ship.sunk).toBe(true);
  ship.addHit();
  expect(ship.sunk).toBe(true);
  expect(ship.hits).toBe(3);
})

