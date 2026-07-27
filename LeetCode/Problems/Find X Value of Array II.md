# 3525. Find X Value of Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-x-value-of-array-ii](https://leetcode.com/problems/find-x-value-of-array-ii)
**Companies:** Rubrik

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Segment Tree on Remainder Transitions — O((n + q) · k²) ✅](#3-approach-segment-tree-on-remainder-transitions)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Part I but with point updates and range queries on the array. Count subsequences with product mod k = x after updates.

**Constraints:**
- `1 <= n, q <= 10⁵`
- `1 <= k <= 5`

---

## 2. Key Insight

> Each element's multiplication transforms a remainder vector. Use a segment tree where each node stores a k×k remainder transition matrix. Combining segments = matrix multiplication. Point updates modify a single leaf.

---

## 3. Approach: Segment Tree on Remainder Transitions — O((n + q) · k²) ✅

```
FUNCTION buildSegTree():
    // Each leaf = transition matrix for one element
    // Internal nodes = matrix product of children
    // Query: multiply transitions over range, read result row

    FOR update (index, newVal) DO
        Update leaf at index
        Propagate matrix products up

    FOR query (l, r, x) DO
        Combine transition matrices in [l, r]
        Answer = result[x]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((n + q) · k² · log n) |
| **Space** | O(n · k²) |

---

## 5. Key Takeaway

> **Segment tree with matrix nodes** handles product-remainder queries with updates. Since k ≤ 5, the k×k matrices are tiny (5×5), making matrix multiplication cheap.
