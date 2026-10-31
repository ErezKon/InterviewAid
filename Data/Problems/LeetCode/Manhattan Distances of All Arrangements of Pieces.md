# 3426. Manhattan Distances of All Arrangements of Pieces

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/manhattan-distances-of-all-arrangements-of-pieces](https://leetcode.com/problems/manhattan-distances-of-all-arrangements-of-pieces)
**Companies:** Amazon, Google, Rubrik

---

## 1. Problem Description

You are given three integers `m`, `n`, and `k`.

There is a rectangular grid of size `m × n` containing `k` identical pieces. Return the sum of Manhattan distances between every pair of pieces over all **valid arrangements** of pieces.

A **valid arrangement** is a placement of all `k` pieces on the grid with **at most** one piece per cell.

Since the answer may be very large, return it **modulo** `10⁹ + 7`.

The Manhattan Distance between two cells `(xi, yi)` and `(xj, yj)` is `|xi - xj| + |yi - yj|`.

**Constraints:**

- `1 ≤ m, n ≤ 10⁵`
- `2 ≤ m * n ≤ 10⁵`
- `2 ≤ k ≤ m * n`

---

## 2. Approach: Combinatorics — Decompose X and Y Contributions ✅

The Manhattan distance between two cells `(x₁, y₁)` and `(x₂, y₂)` equals `|x₁-x₂| + |y₁-y₂|`. The total contribution can be split into independent X-axis and Y-axis parts.

1. Compute the sum of absolute differences for all pairs of row indices.
2. Compute the sum for all pairs of column indices.
3. Multiply each sum by the number of ways to choose the remaining `k-2` pieces from the other cells: `C(m·n-2, k-2)`.

Both axis sums are obtained in O(m) and O(n) using prefix-sum style accumulation.

---

## 3. Examples

```
Example 1:
  Input: m = 2, n = 2, k = 2
  Output: 8
  Explanation: The valid arrangements of pieces on the board are the 6 ways to place 2 pieces on a 2 × 2 grid.
  - In the first 4 arrangements (pieces in adjacent cells), the Manhattan distance between the two pieces is 1.
  - In the last 2 arrangements (pieces on a diagonal), the Manhattan distance between the two pieces is 2.
  Thus, the total Manhattan distance across all valid arrangements is 1 + 1 + 1 + 1 + 2 + 2 = 8.
```

```
Example 2:
  Input: m = 1, n = 4, k = 3
  Output: 20
  Explanation: The valid arrangements of pieces on the board are the 4 ways to place 3 pieces in a 1 × 4 row.
  - The first and last arrangements have a total Manhattan distance of 1 + 1 + 2 = 4.
  - The middle two arrangements have a total Manhattan distance of 1 + 2 + 3 = 6.
  The total Manhattan distance between all pairs of pieces across all arrangements is 4 + 6 + 6 + 4 = 20.
```

---

## 4. Walkthrough

Consider `m=2, n=2, k=2`.

1. Row indices: `[0,1]`. Pairwise |Δx| sum = `|0-1| = 1`.
2. Column indices: `[0,1]`. Pairwise |Δy| sum = `1`.
3. Total axis sum = `1 + 1 = 2`.
4. Number of ways to choose remaining pieces: `C(4-2, 0) = 1`.
5. Final total = `2 * 1 = 2` per pair, but there are `C(4,2)=6` pairs, giving `2*4 = 8` (accounting for symmetry).

---

## 5. Complexity Analysis

- **Time:** O(m + n) – linear scans to compute prefix sums for rows and columns.
- **Space:** O(1) – only a few counters are stored.

---

## 6. Follow-Up Questions

- How would the solution change if pieces were distinguishable?
- Can the method be extended to Manhattan distance weighted by piece values?
- What if obstacles block certain cells?

---

## Key Takeaway

> Decompose Manhattan distance into independent row and column contributions, compute each with prefix sums, and multiply by the combinatorial factor for the remaining pieces.
