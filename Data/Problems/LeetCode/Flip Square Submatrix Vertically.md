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

```text
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

## Examples

**Example 1:**
```
Input: grid = [[0,1,0],[1,0,1],[0,1,0]], k = 2
Output: 5
Explanation: Flipping the top‑left 2×2 submatrix vertically yields
[[1,0,0],[0,1,1],[0,1,0]] which contains 5 ones, the maximum possible.
```

**Example 2:**
```
Input: grid = [[1,1],[1,1]], k = 2
Output: 4
Explanation: The matrix is already all ones; any flip keeps 4 ones.
```

---

## Walkthrough

| Step | Action | Grid State |
|------|--------|------------|
| 1 | Original grid | [[0,1,0],[1,0,1],[0,1,0]] |
| 2 | Choose submatrix (0,0) size 2 → rows 0‑1, cols 0‑1 | |
| 3 | Flip vertically (swap row0↔row1 within submatrix) | [[1,0,0],[0,1,1],[0,1,0]] |
| 4 | Count ones = 5 (maximum) | |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n·k) – enumerate all positions and flip each k×k submatrix |
| **Space** | O(1) extra – modifications are in‑place |

---

## Follow‑Up Questions

1. How would you optimize for larger grids where brute‑force is too slow?
2. Can the problem be extended to rectangular submatrices?
3. What if flips could be performed multiple times on overlapping submatrices?

---

## Key Takeaway

> Try all possible submatrices, flip vertically, count improvement. With small grids, brute force simulation is sufficient.
