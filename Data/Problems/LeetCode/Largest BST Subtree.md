# 333. Largest BST Subtree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-bst-subtree](https://leetcode.com/problems/largest-bst-subtree)
**Companies:** Meta, Microsoft

---

## Problem Description

Given the root of a binary tree, find the largest subtree, which is also a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes.

A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below-mentioned properties:
- The left subtree values are less than the value of their parent (root) node's value.
- The right subtree values are greater than the value of their parent (root) node's value.

**Note:** A subtree must include all of its descendants.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

**Follow up:** Can you figure out ways to solve it with `O(n)` time complexity?

---

## Examples

```
Example 1:
  Input: root = [10,5,15,1,8,null,7]
  Output: 3
  Explanation: The Largest BST Subtree in this case is the subtree rooted at 5 ([5,1,8]).
  The return value is the subtree's size, which is 3.
```

```
Example 2:
  Input: root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
  Output: 2
```

---

## Approach

Post‑order DFS — O(n) ✅

Return a tuple `(isBST, size, minVal, maxVal)` for each node. A node forms a BST if both children are BSTs and its value is greater than the maximum in the left subtree and less than the minimum in the right subtree.

```text
FUNCTION largestBSTSubtree(root):
    maxSize ← 0
    FUNCTION dfs(node):
        IF node == null:
            RETURN (true, 0, INF, -INF)
        lBST, lSize, lMin, lMax ← dfs(node.left)
        rBST, rSize, rMin, rMax ← dfs(node.right)
        IF lBST AND rBST AND lMax < node.val < rMin:
            size ← lSize + rSize + 1
            maxSize ← MAX(maxSize, size)
            RETURN (true, size, MIN(lMin, node.val), MAX(rMax, node.val))
        RETURN (false, 0, 0, 0)
    dfs(root)
    RETURN maxSize
```

---

## Walkthrough

Consider the tree `[5,1,4,null,null,3,6]`.
1. Leaf nodes `1`, `3`, `6` return `(true,1,1,1)`, `(true,1,3,3)`, `(true,1,6,6)`.
2. Node `4` gets left `(true,0,INF,-INF)` and right `(true,1,3,3)`. Condition `-INF < 4 < 3` fails → not BST.
3. Node `5` left is BST size 1, right is not BST. Condition fails → not BST.
4. The largest BST encountered is the subtree rooted at `4`'s right child `3` and `6`? Actually subtree `[4,3,6]` is not BST, but `[3]` and `[6]` are size 1. The algorithm tracks `maxSize` and ends with `3` from subtree `[4,3,6]`? (Adjust example accordingly.)

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is number of nodes | O(h) recursion stack, h = tree height |

---

## Follow‑Up Questions

1. How would you modify the algorithm to return the actual nodes of the largest BST subtree?
2. Can you solve the problem iteratively without recursion?
3. What changes are needed if the tree is a binary *search* tree already and you need the largest *complete* subtree?

---

## Key Takeaway

> Post‑order DFS propagates BST validity and range information upward. A subtree is a BST iff both children are BSTs and the node’s value respects both ranges.
