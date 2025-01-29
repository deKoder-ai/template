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
    // this.ms = new MergeSort();
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
  /**
   * Delete the node with the provided value from the tree.
   * 
   * Handles three cases:
   * 1. The node is a leaf (has no children).
   * 2. The node has only one child.
   * 3. The node has two children (replaces it with its in-order successor).
   *
   * @param {number} value - The value to delete from the tree
   * @returns {Object|null} - The updated subtree after deletion, or null if the tree becomes empty.
   */
  delete = (value, node = this.root) => {
    if (node === null) return null; // Value not found, return null
    // Traverse the tree
    if (value < node.value) {
      node.left = this.delete(value, node.left); // Update left subtree
    } else if (value > node.value) {
      node.right = this.delete(value, node.right); // Update right subtree
    } else {
      // Node found
      // Case 1: Leaf node (no children)
      if (!node.left && !node.right) {
        return null; // Remove the node
      }
      // Case 2: One child (left)
      else if (node.left && !node.right) {
        return node.left; // Bypass node
      }
      // Case 2: One child (right)
      else if (node.right && !node.left) {
        return node.right; // Bypass node
      }
      // Case 3: Two children (not handled yet)
      else {
        // Find the in-order successor (smallest in the right subtree)
        const getSuccessor = (node) => {
          if (node.left === null) return node;
          return getSuccessor(node.left);
        };
        let successor = getSuccessor(node.right);
        // Replace the value of the node to be deleted with the successor's value
        node.value = successor.value;
        // Delete the successor from the right subtree
        node.right = this.delete(successor.value, node.right);
      }
    }
    return node; // Return modified subtree
  };
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
  levelOrder = () => {
    return;
  };
  levelOrderCB = () => {
    return;
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
   * Apply a callback function to each node value of the tree in in-order - LNR.
   * @param {function} callback The function to apply
   * @param {boolean} modify If true, modifies the values of the original tree. If false, returns an array of modified values that can be used to construct a new tree
   * @returns The root of the tree (if modify is true) or an array of modified values (if modify is false)
   */
  inOrderCB = (callback, modify = false, node = this.root, array = []) => {
    if (typeof callback !== 'function') {
      throw new Error('Please provide a callback function');
    }
    if (node !== null) {
      this.inOrderCB(callback, modify, node.left, array);
      if (modify) {
        node.value = callback(node.value); // Modify value in tree
      } else {
        array.push(callback(node.value)); // Add modified value to the array
      }
      this.inOrderCB(callback, modify, node.right, array);
    }
    return modify ? this.root : array;
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
   * Apply a callback function to each node value of the tree in pre-order - NLR.
   * @param {function} callback The function to apply
   * @param {boolean} modify If true, modifies the values of the original tree. If false, returns an array of modified values that can be used to construct a new tree
   * @returns The root of the tree (if modify is true) or an array of modified values (if modify is false)
   */
  preOrderCB = (callback, modify = false, node = this.root, array = []) => {
    if (typeof callback !== 'function') {
      throw new Error('Please provide a callback function');
    }
    if (node !== null) {
      if (modify) {
        node.value = callback(node.value); // Modify value in tree
      } else {
        array.push(callback(node.value)); // Add modified value to the array
      }
      this.preOrderCB(callback, modify, node.left, array);
      this.preOrderCB(callback, modify, node.right, array);
    }
    return modify ? this.root : array;
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
   * Apply a callback function to each node value of the tree in post-order - LRN.
   * @param {function} callback The function to apply
   * @param {boolean} modify If true, modifies the values of the original tree. If false, returns an array of modified values that can be used to construct a new tree
   * @returns The root of the tree (if modify is true) or an array of modified values (if modify is false)
   */
  postOrderCB = (callback, modify = false, node = this.root, array = []) => {
    if (typeof callback !== 'function') {
      throw new Error('Please provide a callback function');
    }
    if (node !== null) {
      this.postOrderCB(callback, modify, node.left, array); // Traverse left subtree
      this.postOrderCB(callback, modify, node.right, array); // Traverse right subtree
      if (modify) {
        node.value = callback(node.value); // Modify value in tree
      } else {
        array.push(callback(node.value)); // Add modified value to the array
      }
    }
    return modify ? this.root : array;
  };
  /**
   * Get the height of a given node in the binary search tree.
   *
   * Height is defined as the number of edges on the longest path from the node to a leaf.
   * @param {Object} node The node whose height is to be determined (defaults to root).
   * @returns {number} The height of the given node.
   *         - A single-node tree has a height of 0.
   *         - An empty tree has a height of -1.
   */
  getHeight = (node = this.root) => {
    if (node === null) return -1; // Base case: empty tree has height -1
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1; // Add 1 for current node
  };
  /**
   * Get the depth of a given node in the binary search tree.
   * Depth is defined as the number of edges from the root to the given node.
   * @param {Object} node The node whose depth is to be determined.
   * @param {Object} current The current node in traversal (defaults to root).
   * @param {number} depth The accumulated depth (starts from 0).
   * @returns {number} The depth of the given node, or -1 if not found.
   */
  getDepth = (node, current = this.root, depth = 0) => {
    if (!node || !current) return -1; // If node is null or tree is empty
    if (node === current) return depth;
    if (node.value < current.value) {
      return this.getDepth(node, current.left, depth + 1);
    } else if (node.value > current.value) {
      return this.getDepth(node, current.right, depth + 1);
    }
    return -1; // Node not found
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
  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
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
