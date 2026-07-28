# 3426. Manhattan Distances of All Arrangements of Pieces

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Rubrik

---

## 1. Problem Description

Given an `m × n` board and an integer `k`, place `k` indistinguishable pieces on distinct cells. For each arrangement, compute the sum of Manhattan distances between every pair of pieces. Return the total sum of these distances over all possible arrangements.

Constraints: `1 ≤ m, n ≤ 10⁴`, `1 ≤ k ≤ m·n`.

---

## 2. Approach: Combinatorics — Decompose X and Y Contributions ✅

The Manhattan distance between two cells `(x₁, y₁)` and `(x₂, y₂)` equals `|x₁‑x₂| + |y₁‑y₂|`. The total contribution can be split into independent X‑axis and Y‑axis parts.

1. Compute the sum of absolute differences for all pairs of row indices.
2. Compute the sum for all pairs of column indices.
3. Multiply each sum by the number of ways to choose the remaining `k‑2` pieces from the other cells: `C(m·n‑2, k‑2)`.

Both axis sums are obtained in O(m) and O(n) using prefix‑sum style accumulation.

---

## 3. Examples

| Input | Output |
|-------|--------|
| `m=2, n=2, k=2` | `8` |
| `m=1, n=3, k=2` | `4` |

*Explanation*: For a 2×2 board with 2 pieces, there are 6 possible placements. Summing Manhattan distances of each pair yields 8.

---

## 4. Walkthrough

Consider `m=2, n=2, k=2`.

1. Row indices: `[0,1]`. Pairwise |Δx| sum = `|0‑1| = 1`.
2. Column indices: `[0,1]`. Pairwise |Δy| sum = `1`.
3. Total axis sum = `1 + 1 = 2`.
4. Number of ways to choose remaining pieces: `C(4‑2, 0) = 1`.
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
