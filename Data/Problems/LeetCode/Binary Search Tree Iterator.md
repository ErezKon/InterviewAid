# 173. Binary Search Tree Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-iterator](https://leetcode.com/problems/binary-search-tree-iterator)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Problem Description
Implement the `BSTIterator` class that represents an iterator over the **in-order traversal** of a binary search tree (BST):

- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10⁵]`.
- `0 ≤ Node.val ≤ 10⁶`
- At most `10⁵` calls will be made to `hasNext`, and `next`.

**Follow up:**
- Could you implement `next()` and `hasNext()` to run in average `O(1)` time and use `O(h)` memory, where `h` is the height of the tree?

## Examples
```
Example 1:
  Input
  ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
  [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
  Output
  [null, 3, 7, true, 9, true, 15, true, 20, false]

  Explanation
  BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
  bSTIterator.next();    // return 3
  bSTIterator.next();    // return 7
  bSTIterator.hasNext(); // return True
  bSTIterator.next();    // return 9
  bSTIterator.hasNext(); // return True
  bSTIterator.next();    // return 15
  bSTIterator.hasNext(); // return True
  bSTIterator.next();    // return 20
  bSTIterator.hasNext(); // return False
```

## Approach
**Controlled Inorder with Stack** – Push all left descendants of the current node onto a stack. `next()` pops the top node, processes its value, then pushes the left chain of its right child. This yields the next in-order element.

```text
CLASS BSTIterator:
    CONSTRUCTOR(root):
        SET stack ← []
        CALL pushLeft(root)

    FUNCTION next():
        SET node ← POP(stack)
        CALL pushLeft(node.right)
        RETURN node.val

    FUNCTION hasNext():
        RETURN stack IS NOT EMPTY

    FUNCTION pushLeft(node):
        WHILE node IS NOT NULL:
            PUSH(node) TO stack
            SET node ← node.left
```

## Walkthrough
For BST `[3,1,4]`:
1. Constructor pushes 3 then 1 → stack `[3,1]`.
2. `next()` pops 1, pushes left of 1.right (null). Returns 1.
3. `next()` pops 3, pushes left of 3.right → pushes 4. Returns 3.
4. `hasNext()` true, `next()` pops 4, returns 4. Stack empty.

## Complexity Analysis
- **Time:** O(1) average per `next()`/`hasNext()`; each node is pushed/popped once.
- **Space:** O(h) for the stack, where h is tree height.

## Follow-Up Questions
- How would you modify the iterator to support `prev()` for reverse inorder?
- Can you implement the iterator without extra space using Morris traversal?
- How does the design change for a balanced BST vs. a skewed tree?

## Key Takeaway
A stack of left ancestors enables lazy inorder traversal, giving O(1) amortized time per element while using only O(h) auxiliary space.