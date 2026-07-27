# 3643. Flip Square Submatrix Vertically

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/flip-square-submatrix-vertically](https://leetcode.com/problems/flip-square-submatrix-vertically)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Simulation — O(m · n · k) ✅](#2-approach-simulation)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a binary matrix and a square submatrix size, flip elements vertically within the submatrix and count the maximum number of 1s achievable.

---

## 2. Approach: Simulation — O(m · n · k) ✅

```
FUNCTION flipSquareSubmatrix(grid, k):
    // Try all k×k submatrices
    // For each, flip vertically (reverse rows within the submatrix)
    // Track maximum 1s in the resulting grid
    // With small constraints, brute force works

    maxOnes ← count1s(grid)
    FOR each k×k submatrix at (r, c) DO
        Flip vertically, count 1s, update maxOnes
        Undo flip
    RETURN maxOnes
```

---

## 3. Key Takeaway

> Try all possible submatrices, flip vertically, count improvement. With small grids, brute force simulation is sufficient.
