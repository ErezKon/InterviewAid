# 1373. Maximum Sum BST in Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-bst-in-binary-tree](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a **binary tree** `root`, return *the maximum sum of all keys of **any** sub-tree which is also a Binary Search Tree (BST)*.

Assume a BST is defined as follows:

- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 4 * 10^4]`.
- `-4 * 10^4 <= Node.val <= 4 * 10^4`

## Examples

**Example 1:**
```
Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: Maximum sum in a valid Binary search tree is obtained in root node with key equal to 3.
```

**Example 2:**
```
Input: root = [4,3,null,1,2]
Output: 2
Explanation: Maximum sum in a valid Binary search tree is obtained in a single root node with key equal to 2.
```

**Example 3:**
```
Input: root = [-4,-2,-5]
Output: 0
Explanation: All values are negatives. Return an empty BST.
```

## Approach
Perform a post‑order DFS that returns for each node:
1. Whether the subtree is a BST.
2. Minimum and maximum values in the subtree.
3. Sum of all node values.
If both left and right subtrees are BSTs and `left.max < node.val < right.min`, the current subtree is a BST; update the global maximum sum.

```text
FUNCTION maxSumBST(root):
    maxSum ← 0
    FUNCTION dfs(node):
        IF node IS NULL:
            RETURN (TRUE, +∞, -∞, 0)
        leftIsBST, leftMin, leftMax, leftSum ← dfs(node.left)
        rightIsBST, rightMin, rightMax, rightSum ← dfs(node.right)
        IF leftIsBST AND rightIsBST AND leftMax < node.val AND node.val < rightMin:
            curSum ← leftSum + rightSum + node.val
            maxSum ← MAX(maxSum, curSum)
            curMin ← MIN(leftMin, node.val)
            curMax ← MAX(rightMax, node.val)
            RETURN (TRUE, curMin, curMax, curSum)
        ELSE:
            RETURN (FALSE, 0, 0, 0)
    dfs(root)
    RETURN maxSum
```

## Walkthrough
Consider the subtree rooted at the node with value `3` in Example 1.
| Node | left.max | right.min | BST? | Subtree sum |
|------|----------|-----------|------|-------------|
| 2 (leaf) | -∞ | +∞ | Yes | 2 |
| 4 (leaf) | -∞ | +∞ | Yes | 4 |
| 3 | 2 | 4 | Yes (2 < 3 < 4) | 2+4+3 = 9 |
The algorithm propagates these values upward, eventually finding the larger BST rooted at the right child of the root with sum 20.

## Complexity Analysis
*Time*: Each node is visited once → `O(n)` where `n` is the number of tree nodes.
*Space*: Recursion stack depth `O(h)` where `h` is tree height (worst‑case `O(n)`).

## Follow‑Up Questions
1. How would you modify the algorithm to also return the root of the maximum‑sum BST?
2. Can the solution be adapted to count the number of BST subtrees instead of the maximum sum?
3. How would the approach change for an n‑ary tree where BST property is defined on child ordering?

## Key Takeaway
A post‑order traversal that aggregates BST validity, min/max bounds, and sums enables an `O(n)` solution to find the maximum‑sum BST subtree.
