To commit:
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

isBalanced() - Checks if the tree is balanced