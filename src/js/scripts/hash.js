'use strict';

const hash = (key) => {
  let hashCode = 0;
  const primeNumber = 11;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }
  return hashCode;
};

export { hash };
