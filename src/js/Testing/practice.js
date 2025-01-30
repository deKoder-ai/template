'use strict';

class Practice {
  sum = (a, b) => {
    return a + b;
  };
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  reverseString = (string) => {
    return string.split('').reverse().join('');
  };
  add = (a, b) => {
    return a + b;
  };
  subtract = (a, b) => {
    return a - b;
  };
  divide = (a, b) => {
    return a / b;
  };
  multiply = (a, b) => {
    return a * b;
  };
  caesarCypher = (string, key) => {
    const isLower = (character) => {
      if (/[a-z]/.test(character)) {
        return true;
      } else {
        return false;
      }
    };
    const array = [];
    for (let char of string) {
      let lowerCase = isLower(char);
      char = char.toUpperCase();
      if (/[A-Z]/.test(char)) {
        char = char.charCodeAt(0) + key;
        if (char > 90) {
          char -= 26;
        } else if (char < 65) {
          char += 26;
        }
        char = String.fromCharCode(char);
        if (lowerCase) {
          char = char.toLowerCase();
        }
      }
      array.push(char);
    }
    return array.join('');
  };
  analyzeArray = (array) => {
    const sum = (acc, val) => {
      return acc + val;
    }
    const arrayAverage = array.reduce(sum, 0) / array.length;
    return {
      average: arrayAverage,
      min: Math.min(...array),
      max: Math.max(...array),
      length: array.length,
    };
  };
}

const p = new Practice();

export default p;
