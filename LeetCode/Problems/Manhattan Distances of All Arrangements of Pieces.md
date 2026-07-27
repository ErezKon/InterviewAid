# 3426. Manhattan Distances of All Arrangements of Pieces

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Rubrik

---

## 1. Problem Description

Compute the sum of Manhattan distances across all ways to place `k` pieces on an `m×n` board.

---

## 2. Approach: Combinatorics — O(m·n) ✅

```
// Decompose Manhattan distance into x and y components independently
// For each pair of cells, contribution = |x1-x2| + |y1-y2| × C(m·n-2, k-2)
// Sum |x1-x2| over all pairs, multiply by C(m·n-2, k-2)
```

| Time | Space |
|------|-------|
| O(m + n + precompute factorials) | O(m·n) |

---

## 3. Key Takeaway

> Decompose into independent x and y contributions. Each pair of positions contributes its Manhattan distance × the number of ways to place remaining pieces. Use prefix sums for efficient absolute-difference sums.
