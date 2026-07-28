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

Given the root of a BST, return the minimum absolute difference between values of any two nodes.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `root = [4,2,5,1,3]` | `1` | Inorder traversal yields `[1,2,3,4,5]`. Minimum difference is between `1` and `2` (or any consecutive pair) → `1`.
| `root = [1,null,3,2]` | `1` | Sorted values `[1,2,3]`; smallest gap is `1` between `1` and `2`.

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