'use strict';

/**
 * Create a new node for a linked list.
 * @param {any} value - Value of the new node
 * @param {number} next - Reference to the next node in the list
 * @returns {Object} A new node
 */
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
    return this;
  }
}

/**
 * Create a linked list.
 *
 * Methods:
 *
 * push(value)
 *
 * pop()
 *
 * unshift(value)
 *
 * shift()
 *
 * getSize()
 *
 * getHead()
 *
 * getTail()
 *
 * getValueAt(index)
 *
 * contains(value)
 *
 * find(value)
 *
 * toString()
 * @param {boolean} log - If true, log actions to the console.
 * @param {Array=} array - Optional array to populate the list upon initialisation
 * @returns {Object} A new instance of LinkedList
 */
class LinkedList {
  constructor(log = false, array = []) {
    this.head = new Node('head', null);
    this.tail = this.head;
    this.size = 0;
    this.log = log;
    this.array = array;
    if (Array.isArray(this.array)) {
      this.array.forEach((item) => this.push(item));
    }
    return this;
  }
  /**
   * Add a node to the end of the list.
   * @param {any} value The value to be stored in the new node
   */
  push = (value) => {
    let newNode = new Node(value);
    if (!this.size) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    if (this.log) console.log(`${value} appended to list`);
    this.size++;
  };
  /**
   * Remove the last node from the list and return its value.
   * @returns {any} The value of the removed node
   */
  pop = (node = this.head, prev = null) => {
    if (this.empty()) return null;
    if (!node.next) {
      prev.next = null;
      this.tail = prev;
      if (this.log) console.log(`Removed: [${node.value}] from end of list`);
      this.size--;
      return node.value;
    }
    return this.pop(node.next, node);
  };
  /**
   * Insert a node at the start of the list.
   * @param {any} value The value to be stored in the new node
   */
  unshift = (value) => {
    let newNode = new Node(value);
    if (!this.size) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    if (this.log) console.log(`[${value}] inserted at start of list`);
    this.size++;
  };
  /**
   * Remove the first node from the list and return its value.
   * @returns {any} The value of the removed node
   */
  shift = () => {
    if (this.empty()) return null;
    let value = this.head.value;
    this.head = this.head.next;
    if (this.log) console.log(`Removed: [${value}] from start of list`);
    this.size--;
    return value;
  };
  /**
   * Insert a node at the specified index.
   * @param {any} value
   * @param {number} index
   */
  insertNodeAt = (value, index, node = this.head, i = 0) => {
    if (this.empty()) return null;
    if (index < 1 || index >= this.size) {
      if (this.log) console.log(`Index is out of range - min: 0 | max: ${this.size - 1}\nUse .unshift() to insert at the start or .push() to add to the end`);
      return null;
    }
    if (index - 1 === i) {
      let newNode = new Node(value, node.next);
      node.next = newNode;
      if (this.log) console.log(`[${value}] inserted at index: ${index}`);
      this.size++;
      return null;
    }
    i++;
    return this.insertNodeAt(value, index, node.next, i);
  };
  /**
   * Remove the node at the specified index.
   * @param {number} index The index of the node to remove
   * @returns {any} The value of the removed node
   */
  removeNodeAt = (index, node = this.head, prev = null, i = 0) => {
    if (this.empty()) return null;
    if (index < 0 || index >= this.size) {
      if (this.log) console.log(`Index is out of range - min: 0 | max: ${this.size - 1}`);
      return null;
    }
    if (index === i) {
      let value = node.value;
      if (node === this.tail) {
        prev.next = null;
        this.tail = prev;
        console.log('end');
      } else {
        node.value = node.next.value;
        node.next = node.next.next;
        console.log('not');
      }
      if (this.log) console.log(`[${value}] removed from index: ${index}`);
      this.size--;
      return value;
    }
    prev = node;
    i++;
    return this.removeNodeAt(index, node.next, prev, i);
  };
  /**
   * Return the size of the list.
   * @returns {number} The number of nodes in the list
   */
  getSize = () => {
    if (this.empty()) return null;
    if (this.log) console.log(`Size: ${this.size} nodes`);
    return this.size;
  };
  /**
   * Return the value of the first node in the list.
   * @returns {any} The value of the first node or null if list is empty
   */
  getHead = () => {
    if (this.empty()) return null;
    if (this.log) console.log(`Head: [${this.head.value}]`);
    return this.head.value;
  };
  /**
   * Return the value of the last node in the list.
   * @returns {any} The value of the final node or null if list is empty
   */
  getTail = () => {
    if (this.empty()) return null;
    if (this.log) console.log(`Tail: [${this.tail.value}]`);
    return this.tail.value;
  };
  /**
   * Returns the value of the node at a given index.
   * @param {number} i The node index
   * @returns {any} The value of the node at list[index]
   */
  getValueAt = (index, node = this.head, i = 0) => {
    if (this.empty()) return null;
    if (index < 0 || index >= this.size) {
      if (this.log) console.log(`Index is out of range - min: 0 | max: ${this.size - 1}`);
      return null;
    }
    if (i === index) {
      if (this.log) console.log(`Index: ${index} | Value: [${node.value}]`);
      return node.value;
    }
    i++;
    return this.getValueAt(index, node.next, i);
  };
  /**
   * Check if the list contains a specified value.
   * @returns {boolean} The value of the removed node
   */
  contains = (value, node = this.head) => {
    if (this.empty()) return null;
    if (value === node.value) {
      if (this.log) console.log(`[${value}] is in list`);
      return true;
    }
    if (!node.next) {
      if (this.log) console.log(`[${value}] is not in list`);
      return false;
    }
    return this.contains(value, node.next);
  };
  /**
   * Find the index of a value.
   * @returns {any} The index of the value or null if not in list
   */
  find = (value, node = this.head, i = 0) => {
    if (this.empty()) return null;
    if (value === node.value) {
      if (this.log) console.log(`[${value}] is at index ${i}`);
      return i;
    }
    if (!node.next) {
      if (this.log) console.log(`[${value}] is not in list`);
      return null;
    }
    i++;
    return this.find(value, node.next, i);
  };
  /**
   * Return the list as a string.
   * @returns {string} The linked list as a string
   */
  toString = (node = this.head, string = '') => {
    if (this.empty()) return null;
    if (string) string += ` => `;
    let val = node.value;
    if (val !== 'head') string += `[${String(val)}]`;
    if (!node.next) {
      string += ` => null`;
      if (this.log) console.log(string);
      return string;
    }
    return this.toString(node.next, string);
  };
  /**
   * Check if the list is empty.
   * @returns {boolean} True if the list is empty, false if list contains at least one node
   */
  empty = () => {
    if (!this.size) {
      if (this.log) console.log('List is empty');
      return true;
    } else {
      return false;
    }
  };
}

export { LinkedList };
