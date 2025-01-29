'use strict';

/**
 * Represents a node in a binary search tree.
 */
class Node {
  /**
   * Creates a new node with a value and optional left and right children.
   * @param {any} [value=null] - The value stored in the node.
   * @param {Node|null} [left=null] - Reference to the left child node.
   * @param {Node|null} [right=null] - Reference to the right child node.
   */
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * Implement a queue using a linked list.
 * This queue is used for breadth-first traversal of a binary search tree.
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.next = null;
    this.tail = null;
  }
  /**
   * Adds a node to the end of the queue.
   *
   * @param {Object} node - The node to enqueue.
   * @returns {void}
   */
  enqueue(node) {
    const newNode = { value: node, next: null };
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  }
  /**
   * Removes and returns the node from the front of the queue.
   * @returns {Object|null} The dequeued node, or `null` if the queue is empty.
   */
  dequeue() {
    if (!this.head) return null;
    const node = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return node;
  }
}

class BinarySearchTree {
  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input is not of type array');
    }
    this.nodes = 0;
    this.changes = 0;
    this.array = array;
    this.array = this.removeDuplicates();
    this.array = this.array.sort((a, b) => a - b);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }
  removeDuplicates = () => {
    return [...new Set(this.array)];
  };
  /**
   * Recursively constructs a balanced Binary Search Tree (BST) from a sorted array.
   * Ensures the resulting tree has minimal height.
   * @param {number[]} array - A **sorted** array of numbers (ascending order).
   * @param {number} start - The starting index of the array/subarray.
   * @param {number} end - The ending index of the array/subarray.
   * @returns {Node|null} The root of the balanced BST, or `null` if the input array is empty.
   * @throws {Error} If the input is not a valid sorted array.
   */
  buildTree = (array, start, end) => {
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error('Input must be a non-empty sorted array.');
    }
    if (start > end) return null;
    // Find the middle element (balanced root selection)
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    this.nodes++;
    // Recursively construct left and right subtrees
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  };
  /**
   * Inserts a new value into the Binary Search Tree (BST).
   * If the value already exists, the tree remains unchanged.
   * @param {number} value - The number to be inserted.
   * @param {Node} [node=this.root] - The current node (used for recursion).
   * @returns {Node} The root of the tree after insertion.
   * @throws {Error} If `value` is not a valid number.
   */
  insert = (value, node = this.root) => {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number.');
    }
    // Case 1: Tree is empty, set root
    if (!this.root) {
      this.root = new Node(value);
      this.nodes++;
      return this.root;
    }
    // Case 2: Prevent duplicate insertion
    if (value === node.value) return this.root;
    // Case 3: Traverse left or right subtree
    if (value < node.value) {
      if (!node.left) {
        this.nodes++;
        this.changes++;
        node.left = new Node(value); // Insert if left is null
      } else {
        this.insert(value, node.left);
      }
    } else {
      if (!node.right) {
        this.nodes++;
        this.changes++;
        node.right = new Node(value); // Insert if right is null
      } else {
        this.insert(value, node.right);
      }
    }

    return this.root;
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
      this.nodes--;
      this.changes++;
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
  /**
   * Perform a level-order (breadth-first) traversal of the binary search tree.
   * Visits nodes level by level from left to right. (BFS)
   * @returns {Array} An array containing the values of the tree nodes in level-order. Returns `null` if the tree is empty.
   * @description
   * - Uses a `LinkedList` as a queue for efficient enqueue and dequeue operations.
   * - The method ensures **O(n) time complexity** since each node is visited once.
   * - The space complexity is **O(n)** in the worst case, as all nodes might be stored in the queue at once.
   */
  levelOrder = () => {
    if (!this.root) return null;
    const queue = new LinkedList();
    queue.enqueue(this.root);
    const result = [];
    while (queue.head) {
      const node = queue.dequeue();
      result.push(node.value);
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }
    return result;
  };
  /**
   * Applies a callback function to each node value in level-order traversal.
   * @param {function} callback - The function to apply to each node value.
   * @param {boolean} [modify=false] - If true, modifies the node values in the tree; if false, returns an array of modified values.
   * @returns {Node|Array|null} The root of the tree (if modified) or an array of modified values (if not modified).
   * @throws {Error} If the provided callback is not a function.
   */
  levelOrderCB = (callback, modify = false) => {
    if (typeof callback !== 'function') {
      throw new Error('Please provide a callback function');
    }
    if (!this.root) return modify ? this.root : [];
    const queue = new LinkedList();
    queue.enqueue(this.root);
    if (modify) {
      // Directly modify tree in-place
      while (queue.head) {
        const node = queue.dequeue();
        node.value = callback(node.value);
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
      return this.root;
    } else {
      // Collect transformed values in an array
      const result = [];
      while (queue.head) {
        const node = queue.dequeue();
        result.push(callback(node.value));
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
      return result.length ? result : null;
    }
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

// Original BFS recursive implementation
// traverse the tree in level order
// get root node
// add its left and right to the queue
// process node value
// FIFO - push to add to the array, shift for next operation
// levelOrderX = (queue = [this.root], array = []) => {
//   if (this.root === null) return [];
//   if (!queue.length) {
//     return array;
//   } else {
//     const next = queue.shift();
//     array.push(next.value);
//     if (next.left) queue.push(next.left);
//     if (next.right) queue.push(next.right);
//     return this.levelOrder(queue, array);
//   }
// };

// Rebalancing
// So, I'm thinking I have a this.nodes = 0 in the constructor
// and increment it by one for each recursion of buildTree and
// every insertion. Decrement by 1 for each deletion.Does this
// sound like a good start? Or do you have a better idea on how
// to implemenet this?
// ChatGPT said:
// ChatGPT
// Memory updated
// Yes, that sounds like a solid approach! By tracking the number
// of nodes with a this.nodes counter, you can easily check if
// the tree's height exceeds the threshold (2 * log₂(N)) to
// decide when to rebalance. Here are some thoughts to help
// refine it:



// Potential rebalance trigger logic:
// class BinarySearchTree {
//   constructor() {
//     this.root = null;
//     this.changes = 0;
//     this.rebalanceThreshold = 20;  // Set initial value for x
//   }

//   insert(value) {
//     // Your insert logic here
//     this.changes++;
//     if (this.changes >= this.rebalanceThreshold) {
//       if (!this.isBalanced()) {
//         this.rebalance();
//       }
//       this.changes = 0;  // Reset the change counter after rebalancing
//     }
//   }

//   delete(value) {
//     // Your delete logic here
//     this.changes++;
//     if (this.changes >= this.rebalanceThreshold) {
//       if (!this.isBalanced()) {
//         this.rebalance();
//       }
//       this.changes = 0;  // Reset the change counter after rebalancing
//     }
//   }

//   isBalanced() {
//     // Your isBalanced logic here
//   }

//   rebalance() {
//     // Your rebalance logic here
//   }
// }
