# 1252. Cells with Odd Values in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/cells-with-odd-values-in-a-matrix](https://leetcode.com/problems/cells-with-odd-values-in-a-matrix)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an `m × n` matrix initialized to 0 and `indices` where each `[r, c]` increments all cells in row `r` and column `c`, return the count of cells with **odd** values.

---

## 2. Approach: Count Row/Col Increments — O(m + n + |indices|) ✅

```
FUNCTION oddCells(m, n, indices):
    rowCount = [0] * m; colCount = [0] * n
    FOR r, c IN indices:
        rowCount[r] += 1; colCount[c] += 1
    
    // Cell (i,j) value = rowCount[i] + colCount[j], odd when exactly one is odd
    oddRows = SUM(1 for r in rowCount if r % 2 == 1)
    oddCols = SUM(1 for c in colCount if c % 2 == 1)
    RETURN oddRows * (n - oddCols) + oddCols * (m - oddRows)
```

| Time | Space |
|------|-------|
| O(m + n + k) | O(m + n) |

---

## Key Takeaway

> Don't simulate the matrix. A cell is odd when exactly one of (row increments, col increments) is odd. Count odd rows × even cols + even rows × odd cols.
