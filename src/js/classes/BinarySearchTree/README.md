To commit:
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

- buildTree() ✓
- insert(value) ✓
- delete(value) ✓
- find(value) ✓
- levelOrder(callback) x
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