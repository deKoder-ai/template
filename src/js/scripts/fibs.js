'use strict';

const fibs = (n, x = 0) => {
  let array = [];
  for (let i = 0; i < n; i++) {
    if (array.length < 2) {
      array.push(i);
      x++;
    } else {
      array.push(array[i - 1] + array[i - 2]);
      x++;
    }
  }
  let out = `${x} steps`;
  return { array, out };
};

// fib = fib[i - 1] + fib[i - 2];

const fibsR = (n, i = 2, x = 0, array = [0, 1]) => {
  if (i === n) {
    x++;
    let out = `${x} steps`;
    return { array, out };
  }
  x++;
  array.push(array[i - 1] + array[i - 2]);
  return fibsR(n, i + 1, x, array);
};

const fibsX = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibsX(n - 1) + fibsX(n - 2);
};

console.log(fibs(8));
console.log(fibsR(8));
console.log(fibsX(6));
