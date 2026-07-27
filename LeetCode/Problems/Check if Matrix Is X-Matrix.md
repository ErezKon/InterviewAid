# 2319. Check if Matrix Is X-Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-matrix-is-x-matrix](https://leetcode.com/problems/check-if-matrix-is-x-matrix)
**Companies:** Amazon, Google

---

## 1. Problem Description

A matrix is an **X-Matrix** if all diagonal elements are non-zero and all other elements are zero. Given a square matrix `grid`, check if it's an X-Matrix.

---

## 2. Approach: Check Each Cell — O(n²) ✅

```
FUNCTION checkXMatrix(grid):
    n = len(grid)
    FOR i FROM 0 TO n-1:
        FOR j FROM 0 TO n-1:
            onDiagonal = (i == j) OR (i + j == n - 1)
            IF onDiagonal AND grid[i][j] == 0: RETURN false
            IF NOT onDiagonal AND grid[i][j] != 0: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n²) | O(1) |

---

## Key Takeaway

> A cell is on a diagonal if `i == j` (main) or `i + j == n - 1` (anti). Check non-zero on diagonals, zero elsewhere.
