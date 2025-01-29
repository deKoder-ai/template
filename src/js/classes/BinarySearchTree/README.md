To commit

 - add find(value) method to BST
 - add in/pre/post order callback methods
 - fix bug where lowest value of array is missing from tree
 - add isBalanced() method
 - switch from using my mergesort implementation to the native .sort((a, b) => a - b) method to make use of the optimisations made to the native methods



Bugs:

To Do
 - Modify the in/pre/post order callback functions to give the option between directly modifying the tree or returning an array of modified values that could be used to build a new tree


Methods

isBalanced() - Checks if the tree is balanced