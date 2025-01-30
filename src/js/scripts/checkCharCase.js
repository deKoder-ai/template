'use strict';

const checkCaseRegex = (character) => {
  if (/[a-z]/.test(character)) {
    return 'lower case';
  } else if (/[A-Z]/.test(character)) {
    return 'upper case';
  } else if (/[0-9]/.test(character)) {
    return 'numeric';
  }
};

export { checkCaseRegex };
