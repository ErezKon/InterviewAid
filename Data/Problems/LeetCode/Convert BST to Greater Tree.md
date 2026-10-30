# 538. Convert BST to Greater Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-bst-to-greater-tree](https://leetcode.com/problems/convert-bst-to-greater-tree)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a *binary search tree* is a tree that satisfies these constraints:

- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`
- All the values in the tree are **unique**.
- `root` is guaranteed to be a valid binary search tree.

**Note:** This question is the same as 1038: [https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/)

## Examples
```
Example 1:
  Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
  Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```
```
Example 2:
  Input: root = [0,null,1]
  Output: [1,null,1]
```

## Approach
Perform a reverse in‑order traversal (right → node → left) while maintaining a running sum of visited node values. For each visited node, add its original value to the running sum and update the node's value to this sum.

**Pseudocode**
```text
FUNCTION convertBST(root):
    SET total ← 0
    FUNCTION reverseInorder(node):
        IF node IS NULL: RETURN
        reverseInorder(node.right)
        SET total ← total + node.val
        SET node.val ← total
        reverseInorder(node.left)
    reverseInorder(root)
    RETURN root
```

## Walkthrough
For the subtree rooted at node `4`:
| Step | Node visited | total before | total after | node.val set |
|------|--------------|--------------|-------------|--------------|
|1|7|0|7|7|
|2|6|7|13|13|
|3|5|13|18|18|
|4|4|18|22|22|
The traversal continues leftwards, updating each node accordingly.

## Complexity Analysis
- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack where h is tree height (O(log n) for balanced, O(n) worst case).

## Follow‑Up Questions
1. How would you implement the conversion iteratively without recursion?
2. Can the algorithm be adapted to work on a threaded BST to achieve O(1) extra space?
3. What changes are needed if the tree is not a BST but you still need to replace each node with the sum of greater values in the whole tree?

## Key Takeaway
A reverse in‑order traversal naturally visits nodes from largest to smallest, allowing a running sum to produce the required greater‑tree values.
