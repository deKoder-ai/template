'use strict';

import { MergeSort } from './MergeSort';

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input is not of type array');
    }
    this.array = array;
    this.ms = new MergeSort();
    this.array = this.removeDuplicates();
    this.array = this.ms.mergeSort(this.array);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }
  removeDuplicates = () => {
    return [...new Set(this.array)];
  };
  center = (array) => {
    return Math.floor(array.length / 2);
  };
  /**
   * Build a balanced binary search tree from a sorted list.
   * @param {Array} array The constructor array
   * @param {number} start Index of the start of the array
   * @param {number} end Index of the end of the array
   * @returns
   */
  buildTree = (array, start, end) => {
    if (start > end) return null;
    // Find the middle element
    const mid = Math.floor((start + end) / 2);
    const node = mid ? new Node(array[mid]) : null;
    // Recursively build the left and right subtrees
    if (node) {
      node.left = this.buildTree(array, start, mid - 1);
      node.right = this.buildTree(array, mid + 1, end);
    }
    return node;
  };
  /**
   * Insert a new value as a leaf in the tree
   * @param {number} value The number to be inserted
   * @returns {Object} The root of the tree
   */
  insert = (value, node = this.root) => {
    if (value === node.value) {
      console.log('Value is already in tree');
      return true;
    }
    if (value < node.value && node.left !== null) {
      this.insert(value, node.left);
    } else if (value < node.value && !node.left) {
      node.left = new Node(value);
      console.log(`${value} added to tree`);
    } else if (value > node.value && node.right !== null) {
      this.insert(value, node.right);
    } else if (value > node.value && !node.right) {
      node.right = new Node(value);
      console.log(`${value} added to tree`);
    }
    return this.root;
  };
  // delete = (value, node = this.root, prev = null, prev2 = null, child = null, ) => {
  //   if (node.value !== value && !node.left && !node.right) {
  //     console.log('Value is not in tree');
  //     return false;
  //   }
  //   if (value < node.value) {
  //     prev2 = prev;
  //     prev = node;
  //     node = node.left;
  //     child = 'L';
  //     this.delete(value, node, prev, child);
  //   } else if (value > node.value) {
  //     prev2 = prev;
  //     prev = node;
  //     node = node.right;
  //     child = 'R';
  //     this.delete(value, node, prev, child);
  //   } else if (value === node.value) {
  //     if (!node.left && !node.right) {
  //       console.log(`${value} removed from tree`);
  //       prev.left = (child === 'L') ? null : prev.left;
  //       prev.right = (child === 'R') ? null : prev.right;
  //       return true;
  //     } else if (!node.left && child === 'R') {

  //     }
  //   }
  inOrder = (node = this.root, array = []) => {
    if (node !== null) {
      this.inOrder(node.left, array);
      console.log(node.value);
      array.push(node.value);
      this.inOrder(node.right, array);
    }
    return array;
  };
  /**
   * Pretty prints a binary search tree to the console.
   * @param {Object} node The root of the tree
   */
  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
}

export { BinarySearchTree };

// 1 2 3 4 5 6 7

//       4
//     2
//   1   3
