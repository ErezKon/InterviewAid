# 1569. Number of Ways to Reorder Array to Get Same BST

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst](https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst)
**Companies:** De Shaw, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Divide & Conquer + Combinatorics — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count reorderings of `nums` that produce the same BST when inserted in order. Return (count - 1) mod 10⁹+7.

---

## 2. Key Insight

> Root is fixed (first element). Elements < root go to left subtree, > root go to right subtree. The interleaving of left and right subsequences is C(L+R, L). Recurse on each subtree.

---

## 3. Approach: Divide & Conquer + Combinatorics — O(n²) ✅

```
FUNCTION numOfWays(nums):
    FUNCTION count(arr):
        IF len(arr) <= 2: RETURN 1
        root = arr[0]
        left = [x for x in arr if x < root]
        right = [x for x in arr if x > root]
        RETURN C(len(left)+len(right), len(left)) * count(left) * count(right)
    RETURN (count(nums) - 1) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) for Pascal's triangle |

---

## 5. Key Takeaway

> **BST structure = interleaving of left/right subtrees.** Root is fixed. Count interleavings via combinations. Recurse on subtrees. Multiply results.
