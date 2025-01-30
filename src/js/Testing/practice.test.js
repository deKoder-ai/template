import p from './practice.js';

test('adds 1 + 2 to equal 3', () => {
  expect(p.sum(1, 2)).toBe(3);
  expect(p.sum(3, 4)).toBe(7);
  expect(p.sum(-1, 4)).toBe(3);
});

test('capitalizes the first letter of a string', () => {
  expect(p.capitalize('hello, my friend')).toBe('Hello, my friend');
  expect(p.capitalize('')).toBe('');
  expect(p.capitalize('23')).toBe('23');
  expect(p.capitalize('HELLO')).toBe('HELLO');
});

test('reverse a string', () => {
  expect(p.reverseString('monkey')).toBe('yeknom');
  expect(p.reverseString('123456')).toBe('654321');
  expect(p.reverseString('hello, ma amiga')).toBe('agima am ,olleh');
});

test('calculator', () => {
  expect(p.add(1, 2)).toBe(3);
  expect(p.subtract(1, 2)).toBe(-1);
  expect(p.divide(1, 2)).toBe(0.5);
  expect(p.multiply(0, 2)).toBe(0);
});

test('caesar cypher', () => {
  expect(p.caesarCypher('hello', 3)).toBe('khoor');
  // wrap end
  expect(p.caesarCypher('aBc 123!!!', -3)).toBe('xYz 123!!!');
  // wrap start
  expect(p.caesarCypher('XyZ #!*@$% 77', +3)).toBe('AbC #!*@$% 77');
});

test('analyze array', () => {
  expect(p.analyzeArray([1, 2, 3, 4, 5, 6, 7, 8])).toEqual({
    average: 4.5,
    min: 1,
    max: 8,
    length: 8,
  })
  expect(p.analyzeArray([0, 2, 4])).toEqual({
    average: 2,
    min: 0,
    max: 4,
    length: 3,
  })
})