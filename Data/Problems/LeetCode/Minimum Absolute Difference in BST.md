# 530. Minimum Absolute Difference in BST

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-in-bst](https://leetcode.com/problems/minimum-absolute-difference-in-bst)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the `root` of a Binary Search Tree (BST), return *the minimum absolute difference between the values of any two different nodes in the tree*.

**Constraints:**
- The number of nodes in the tree is in the range `[2, 10⁴]`.
- `0 <= Node.val <= 10⁵`

**Note:** This question is the same as 783: [Minimum Distance Between BST Nodes](https://leetcode.com/problems/minimum-distance-between-bst-nodes/)

---

## Examples

```
Example 1:
  Input: root = [4,2,6,1,3]
  Output: 1
  Explanation: Inorder traversal yields [1,2,3,4,6]; the smallest gap between consecutive values is 1.
```

```
Example 2:
  Input: root = [1,0,48,null,null,12,49]
  Output: 1
  Explanation: Inorder traversal yields [0,1,12,48,49]; the smallest gap is 1 (0→1 or 48→49).
```

---

## Key Insight

> BST **inorder traversal** yields sorted values. The minimum difference is always between consecutive values in sorted order.

---

## Approach: Inorder Traversal — O(n) ✅

```text
FUNCTION getMinimumDifference(root):
    prev ← -INFINITY
    minDiff ← INFINITY

    FUNCTION inorder(node):
        IF node = NULL THEN RETURN
        inorder(node.left)
        minDiff ← MIN(minDiff, node.val - prev)
        prev ← node.val
        inorder(node.right)

    inorder(root)
    RETURN minDiff
```

---

## Walkthrough

Consider the BST `[4,2,5,1,3]`.

1. Perform inorder traversal → visit nodes in order `1,2,3,4,5`.
2. Initialize `prev = -∞`, `minDiff = ∞`.
3. Visit `1`: `minDiff = min(∞, 1-(-∞)) = ∞` (ignore), `prev = 1`.
4. Visit `2`: `minDiff = min(∞, 2-1) = 1`, `prev = 2`.
5. Visit `3`: `minDiff = min(1, 3-2) = 1`, `prev = 3`.
6. Visit `4`: `minDiff = min(1, 4-3) = 1`, `prev = 4`.
7. Visit `5`: `minDiff = min(1, 5-4) = 1`, `prev = 5`.
8. Traversal ends, return `minDiff = 1`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Inorder traversal | **O(n)** | **O(h)** stack depth |

---

## Key Takeaway

> **BST inorder = sorted order** — minimum difference must be between consecutive sorted values. Track `prev` during inorder to compute differences in a single pass.

---