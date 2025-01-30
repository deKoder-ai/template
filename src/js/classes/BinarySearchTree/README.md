To commit:





Committed
BinarySearchTree.js updates

 - Add levelOrder() method using an iterative approach to avoid potential stack overflows with large, unbalanced trees and utilising a linked list for the queue to avoid the overheads of the built in shift() method (O(1) over O(n) for dequeueing)
 - Add levelOrderCB(callback, modify) to apply a callback function to each value using the same approach as above


Committed
BinarySearchTree.js updates

 - add depth(node) method
 - add delete(value) method


Committed 29/01/25 17:10
BinarySearchTree.js updates

 - add no callback error handling to callback methods
 - add modify parameter to allow choice between modifying the original tree and returning 
   an array to build a new tree
 - Refactor callback methods to avoid code repetition

Committed 29/01/25 16:15
BinarySearchTree.js updates

 - add find(value) method to BST
 - add in/pre/post order callback methods
 - fix bug where lowest value of array is missing from tree
 - add isBalanced() method
 - switch from using my mergesort implementation to the native .sort((a, b) => a - b) method to make use of the optimisations made to the native methods



Bugs:

To Do:
 - Modify the in/pre/post order callback functions to give the option between directly modifying the tree or returning an array of modified values that could be used to build a new tree


Methods:

- buildTree() ✓✓
- insert(value) ✓✓
- delete(value) ✓
- find(value) ✓
- levelOrder(callback) ✓
- inOrderCB(callback) ✓
- preOrderCB(callback) ✓
- postOrderCB(callback) ✓
- getHeight(node) ✓
- getDepth(node) ✓
- isBalanced() ✓
- rebalance ✓
- prettyPrint() ✓



An iterative deletion method in a binary search tree does not generally have a smaller time complexity compared to the recursive approach. The time complexity for both recursive and iterative approaches for deleting a node in a binary search tree is O(h), where h is the height of the tree.

Why Iterative and Recursive Deletion Have the Same Time Complexity
Searching for the Node:

Both methods will traverse the tree to find the node to delete.
This search operation takes O(h) time, where h is the height of the tree (which can be O(log n) for balanced trees and O(n) for skewed trees).
Deletion Process:

Once the node is found, handling the three cases (leaf, one child, two children) still requires either recursive or iterative steps to maintain the tree structure.
Whether you're handling the node's deletion and adjustment of the tree recursively or iteratively, the number of operations remains the same in terms of time complexity.
Iterative vs. Recursive Deletion
Recursive:

The recursive deletion method uses the call stack for traversing the tree.
The depth of the recursion can grow as large as the height of the tree.
While this is usually fine for trees that are not deeply unbalanced, it can lead to stack overflow in extreme cases of deep recursion.
Iterative:

The iterative method avoids deep recursion by using an explicit stack or a while-loop to traverse the tree.
This is generally considered a safer option for avoiding stack overflow.
In terms of complexity, the time complexity is still O(h), but the space complexity can be improved in some cases by avoiding the extra space used by the recursion stack.
Summary
Time Complexity: Both iterative and recursive methods have a time complexity of O(h) for deletion.
Space Complexity: The recursive method uses O(h) space due to the recursion stack, while the iterative method can be more space-efficient in some cases (by avoiding deep recursion).
So, while an iterative method may offer better space efficiency and avoid potential stack overflow issues, it does not change the overall time complexity compared to the recursive approach.


Breadth First Search
Yes, an iterative approach using a linked list as the queue is indeed one of the most efficient options for level-order traversal in terms of both time complexity and space complexity.

Why is this the most efficient option?
Queue Operations (Efficient Enqueue/Dequeue):

Enqueueing (adding an element to the queue) and dequeuing (removing an element from the queue) operations are both O(1) with a linked list.
In contrast, if you use an array, the shift() operation (removing the first element) is O(n) because it involves shifting all the other elements. Using a linked list, this inefficiency is avoided because removing the front element (head) is a constant-time operation.
Time Complexity:

The iterative approach visits each node once, and the queue operations (whether enqueue or dequeue) are O(1).
The overall time complexity of the level-order traversal will be O(n) where n is the number of nodes in the tree. You process each node exactly once, and each enqueue/dequeue operation is constant time.
Space Complexity:

The space complexity remains O(n) because you still need to store each node at least once in the queue.
However, with a linked list, you avoid the additional overhead caused by resizing or copying arrays (if the array implementation was dynamically resizing).
The linked list approach uses exactly the space it needs, which could make it slightly more space-efficient, though the overall space complexity still remains O(n).
When would a linked list for the queue be advantageous?
When the tree has a large number of nodes: If you're dealing with a binary tree that could potentially have a large number of nodes (in the range of millions, for example), using a linked list as a queue can offer improved performance for large-scale trees because it avoids the cost of resizing or shifting elements in an array.

When you need guaranteed constant-time dequeue operations: Since arrays in JavaScript (and many other languages) have O(n) time complexity for dequeue operations (because shift() shifts all the other elements down), a linked list is preferred when you need to perform these operations efficiently.

Summary: Is this the most efficient option?
Yes—the iterative approach using a linked list for the queue is efficient in both time and space.
Time complexity: O(n)
Space complexity: O(n)
Constant-time enqueue/dequeue: Achieved with a linked list as the queue.
If you want to optimize further, this method provides a good balance for large trees or cases where you expect the tree to grow significantly in size.


Sure! The idea behind checking the height only for the affected nodes (or the path where the insertion/deletion occurred) is to focus your checks and updates on the parts of the tree that are actually impacted by the operation, rather than recalculating the height for the entire tree.

Let me break it down with examples:

### After Insertion:
- When you insert a node, you're potentially adding a new leaf to the tree, which could affect the heights of the ancestors of that node. 
- Instead of recalculating the height for the entire tree, you can start at the inserted node and move upwards toward the root, updating the height of each node as you go.
- **Why it works**: In a binary search tree (BST), adding a node to a specific subtree only affects the height of that subtree and its ancestors, not the entire tree.

**Example**:
1. Insert a node in the left subtree.
2. Update the height of the node where the insertion occurred.
3. Move up the tree to the parent node, check if the height difference between the left and right subtrees is greater than 1 (which indicates imbalance).
4. Keep moving upward until you reach the root or the point where the height difference no longer exceeds the threshold for rebalancing.

By only checking the path from the inserted node to the root, you minimize the number of nodes whose height you need to update and check.

### After Deletion:
- Deletion can be trickier because removing a node can either reduce the height (if the node had children) or leave the height unchanged (if the node was a leaf).
- Similar to insertion, you can start by adjusting the heights of the nodes that were affected by the deletion.
- If you delete a node and its child has only one subtree (left or right), the height may change for the parent node and its ancestors.
- **Why it works**: Just like with insertion, deleting a node only affects the heights of the nodes along the path from the deleted node up to the root.

**Example**:
1. Delete a node.
2. If the node had no children, move up the tree and update the height of the parent node.
3. If the node had one child, adjust the parent to bypass the deleted node, and then update heights accordingly.
4. If the node had two children (for which you're doing more complex rebalancing), the rebalance might affect a broader section of the tree, but still focus on the path from the deleted node’s parent to the root.

### How this looks in code:

When performing an insertion or deletion, you'd adjust the height of the node you just modified and continue updating the height for each ancestor node:

```javascript
updateHeight = (node) => {
  if (!node) return 0; // Base case: null node height is 0
  const leftHeight = this.getHeight(node.left);
  const rightHeight = this.getHeight(node.right);
  node.height = Math.max(leftHeight, rightHeight) + 1;
  return node.height;
};

insert = (value, node = this.root) => {
  if (node === null) {
    return new Node(value);
  }
  if (value < node.value) {
    node.left = this.insert(value, node.left);
  } else if (value > node.value) {
    node.right = this.insert(value, node.right);
  }

  // Update the height and balance the tree if necessary
  this.updateHeight(node);

  // Check if the tree is unbalanced (by checking the height difference)
  if (Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) > 1) {
    // Rebalance if needed
    return this.rebalance(node);
  }

  return node;
};
```

In this case, the **updateHeight** function starts with the modified node and recursively updates the height of its ancestors. If the height difference between the left and right subtrees exceeds the allowed threshold (e.g., 1), the tree is unbalanced, and you'd trigger rebalancing.

### Summary:
- **Focus on affected path**: After an insertion or deletion, only check and update the heights of the affected nodes (the path from the modified node up to the root).
- **Efficient rebalancing**: Instead of recalculating the height of the whole tree, you reduce the number of operations by focusing only on the relevant portion of the tree.
- **Minimize unnecessary work**: This avoids the overhead of checking every node, especially if the tree remains balanced or nearly balanced after the operation.

Let me know if you'd like to dive deeper into any part of this!