'use strict';

// import { MergeSort } from '../MergeSort';

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
    // this.array = this.ms.mergeSort(this.array);
    this.array = this.array.sort((a, b) => a - b);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }
  removeDuplicates = () => {
    return [...new Set(this.array)];
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
    const node = new Node(array[mid]);
    // Recursively build the left and right subtrees
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  };
  /**
   * Insert a new value as a leaf in the tree
   * @param {number} value The number to be inserted
   * @returns {Object} The root of the tree or null if value is already in tree
   */
  insert = (value, node = this.root) => {
    // If value already exists, do not insert
    if (value === node.value) return null;
    // Determine which subtree to go to
    if (value < node.value) {
      // If there's no left child, insert here
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        // Otherwise, recurse into left subtree
        this.insert(value, node.left);
      }
    } else {
      // If there's no right child, insert here
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        // Otherwise, recurse into right subtree
        this.insert(value, node.right);
      }
    }
    return this.root; // Return root of tree after insertion
  };

  delete = (value, node = this.root, prev = null, prev2 = null, child = null, ) => {
    if (node.value !== value && !node.left && !node.right) {
      console.log('Value is not in tree');
      return false;
    }
    if (value < node.value) {
      prev2 = prev;
      prev = node;
      node = node.left;
      child = 'L';
      this.delete(value, node, prev, child);
    } else if (value > node.value) {
      prev2 = prev;
      prev = node;
      node = node.right;
      child = 'R';
      this.delete(value, node, prev, child);
    } else if (value === node.value) {
      if (!node.left && !node.right) {
        console.log(`${value} removed from tree`);
        prev.left = (child === 'L') ? null : prev.left;
        prev.right = (child === 'R') ? null : prev.right;
        return true;
      } else if (!node.left && child === 'R') {

      }
    }
  }
  /**
   * Find the given value on the tree and return its node
   * @param {number} value The value to search the tree for
   * @returns Returns the node containing the value if found, null if not
   */
  find = (value, node = this.root) => {
    if (!node) return null;
    if (node.value === value) return node;
    return value < node.value
      ? this.find(value, node.left)
      : this.find(value, node.right);
  };
  /**
   * Return an array of values generated from an in-order traversal of the tree.
   * @returns {Array} The in-order array of tree values
   */
  inOrder = (node = this.root, array = []) => {
    if (node !== null) {
      this.inOrder(node.left, array);
      array.push(node.value);
      this.inOrder(node.right, array);
    }
    return array;
  };
  /**
   * Apply a callback function to each node value of the tree in inorder - LNR.
   * @param {function} callback The function to apply
   * @param {Object} node The root node of the tree
   * @returns The root of the tree
   */
  inOrderCB = (callback, node = this.root) => {
    if (node) {
      this.inOrderCB(callback, node.left);
      node.value = callback(node.value);
      this.inOrderCB(callback, node.right);
    }
    return this.root;
  };
  /**
   * Return an array of values generated from a pre-order traversal of the tree.
   * @returns {Array} The pre-order array of tree values
   */
  preOrder = (node = this.root, array = []) => {
    if (node !== null) {
      console.log(node.value);
      array.push(node.value);
      this.preOrder(node.left, array);
      this.preOrder(node.right, array);
    }
    return array;
  };
  /**
   * Apply a callback function to each node value of the tree in preorder - NLR.
   * @param {function} callback The function to apply
   * @param {Object} node The root node of the tree
   * @returns The root of the tree
   */
  preOrderCB = (callback, node = this.root) => {
    if (node !== null) {
      node.value = callback(node.value);
      this.preOrderCB(callback, node.left);
      this.preOrderCB(callback, node.right);
    }
    return this.root;
  };
  /**
   * Return an array of values generated from a post-order traversal of the tree.
   * @returns {Array} The post-order array of tree values
   */
  postOrder = (node = this.root, array = []) => {
    if (node !== null) {
      this.postOrder(node.left, array);
      this.postOrder(node.right, array);
      console.log(node.value);
      array.push(node.value);
    }
    return array;
  };
  /**
   * Apply a callback function to each node value of the tree in postorder - LRN.
   * @param {function} callback The function to apply
   * @param {Object} node The root node of the tree
   * @returns The root of the tree
   */
  postOrderCB = (callback, node = this.root) => {
    if (node !== null) {
      this.postOrderCB(callback, node.left);
      this.postOrderCB(callback, node.right);
      node.value = callback(node.value);
    }
    return this.root;
  };
  /**
   * Get the height of the tree.
   * @returns {number} The height of the tree. A single node tree has a height of 0. If the tree is empty, the height is -1
   */
  getHeight = (node = this.root) => {
    if (node === null) return -1;
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };
  /**
   * Check if the tree is balanced
   * @returns {boolean} True if tree is balanced, false if not
   */
  isBalanced = (node = this.root) => {
    // Helper function to calculate height and check balance
    const checkHeight = (node) => {
      if (node === null) return 0; // Empty tree is balanced with height 0
      // Get the height of left and right subtrees
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
      // If a subtree is unbalanced, propagate -1 upwards
      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1; // Tree is unbalanced
      }
      // Return height of the current subtree
      return Math.max(leftHeight, rightHeight) + 1;
    };
    // If checkHeight returns -1, the tree is unbalanced
    return checkHeight(node) !== -1;
  };
  /**
   * Rebalance the tree
   * @returns {Object} The root of the rebalanced tree or null if tree is empty
   */
  rebalance = (node = this.root) => {
    if (!node) {
      console.log('Tree is empty, nothing to rebalance.');
      return null;
    }
    // Get the sorted array of node values using in-order traversal
    const array = this.inOrder(node);
    console.log('Rebalancing...');    
    // Rebuild the tree to make it balanced
    this.root = this.buildTree(array, 0, array.length - 1);
    return this.root;
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
