# 1038. Binary Search Tree to Greater Sum Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree)
**Companies:** Amazon, Google, Microsoft, Sap

---

## Problem Description
Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a *binary search tree* is a tree that satisfies these constraints:

- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 100]`.
- `0 ≤ Node.val ≤ 100`
- All the values in the tree are **unique**.

**Note:** This question is the same as 538: https://leetcode.com/problems/convert-bst-to-greater-tree/

## Examples
```
Example 1:
  Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
  Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

Example 2:
  Input: root = [0,null,1]
  Output: [1,null,1]
```

## Approach
**Reverse Inorder Traversal** – Perform a reverse inorder (right → node → left) while maintaining a running sum of visited node values. Update each node with the current sum.

```text
FUNCTION bstToGst(root):
    SET total ← 0
    FUNCTION reverseInorder(node):
        IF node IS NULL: RETURN
        CALL reverseInorder(node.right)
        SET total ← total + node.val
        SET node.val ← total
        CALL reverseInorder(node.left)
    CALL reverseInorder(root)
    RETURN root
```

## Walkthrough
For BST `[2,1,3]`:
1. Visit right child `3`: total=3, node.val=3.
2. Visit root `2`: total=3+2=5, node.val=5.
3. Visit left child `1`: total=5+1=6, node.val=6.
Resulting tree values in inorder: `6,5,3`.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

## Follow-Up Questions
- How would you implement the transformation iteratively without recursion?
- Can you adapt the algorithm for a tree that is not a BST?
- What changes are needed to perform the conversion in-place for a threaded binary tree?

## Key Takeaway
A reverse inorder traversal accumulates the sum of larger keys, allowing each node to be updated to the required greater-sum value in linear time.