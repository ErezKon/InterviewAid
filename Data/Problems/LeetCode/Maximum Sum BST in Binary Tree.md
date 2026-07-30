# 1373. Maximum Sum BST in Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-bst-in-binary-tree](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree, find the maximum sum of values of any subtree that is also a Binary Search Tree (BST). A subtree includes a node and all its descendants. Return the largest sum among all BST subtrees; if none exist, return `0`.

## Examples
**Example 1**
```
Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: The subtree rooted at node 3 is a BST with sum 3+2+4+5+6 = 20.
```
**Example 2**
```
Input: root = [4,3,null,1,2]
Output: 2
Explanation: The largest BST subtree is the leaf node with value 2.
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
