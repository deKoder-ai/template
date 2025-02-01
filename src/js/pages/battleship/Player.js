'use strict';

import { Gameboard } from './Gameboard';

class Player {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.gb = new Gameboard(this.size);
  }
}

export { Player };
