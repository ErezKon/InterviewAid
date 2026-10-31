# 110. Balanced Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 53.0%
**LeetCode:** https://leetcode.com/problems/balanced-binary-tree
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Viasat, Visa
---

## Problem Description
Given a binary tree, determine if it is **height-balanced**.

(A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.)

**Constraints:**
- The number of nodes in the tree is in the range `[0, 5000]`.
- `-10⁴ ≤ Node.val ≤ 10⁴`

## Examples
```
Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: true

Example 2:
  Input: root = [1,2,2,3,3,null,null,4,4]
  Output: false

Example 3:
  Input: root = []
  Output: true
```

## Approach
Use a bottom-up depth-first search that returns the subtree height, or `-1` as a sentinel indicating an unbalanced subtree. If any child returns `-1` or the height difference exceeds 1, propagate `-1` upward.

```text
FUNCTION isBalanced(root):
    RETURN height(root) != -1

FUNCTION height(node):
    IF node == NULL:
        RETURN 0
    left ← height(node.left)
    IF left == -1:
        RETURN -1
    right ← height(node.right)
    IF right == -1:
        RETURN -1
    IF ABS(left - right) > 1:
        RETURN -1
    RETURN 1 + MAX(left, right)
```

## Walkthrough
For the tree `[1,2,2,3,3,null,null,4,4]`:
1. Compute heights of deepest leaves (4) → 1.
2. Their parents (3) get height 2, difference 0.
3. At node 2 (left side), left height 3, right height 2 → diff 1, ok.
4. At root, left height 4, right height 2 → diff 2 → returns `-1`.
Thus the tree is unbalanced.

## Complexity Analysis
*Time*: O(n) – each node visited once.
*Space*: O(h) recursion stack, where h is tree height (O(log n) for balanced, O(n) worst case).

## Follow-Up Questions
1. How would you implement the check iteratively using a stack?
2. Can you modify the algorithm to return the size of the largest balanced subtree?
3. What changes are needed if the tree is a multi-way tree instead of binary?

## Key Takeaway
A post-order DFS that propagates a sentinel `-1` efficiently detects imbalance while computing heights in a single pass.
