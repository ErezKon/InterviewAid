# 3128. Right Triangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/right-triangles](https://leetcode.com/problems/right-triangles)
**Companies:** Google, Mitsogo

---

## Problem Description

Given an `m × n` binary grid, count the number of **right triangles** formed by 3 cells containing `1` where two cells share a row and two share a column (one cell is the right-angle vertex).

---

## Key Insight

> For each cell `(i,j)` with value 1, it can be the right-angle vertex. Count = `(rowCount[i] - 1) * (colCount[j] - 1)` — choose one other 1 in the same row and one other 1 in the same column.

---

## Approach

```
FUNCTION numberOfRightTriangles(grid):
    m, n ← dimensions
    rowCount ← [SUM(row) for row in grid]
    colCount ← [SUM(grid[r][c] for r in range(m)) for c in range(n)]

    total ← 0
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            IF grid[i][j] == 1:
                total += (rowCount[i] - 1) * (colCount[j] - 1)
    RETURN total
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(m·n) — precompute counts + iterate all cells |
| Space  | O(m + n) — row and column counts |

---

## Key Takeaway

> For counting right triangles on a grid, the right-angle vertex determines the triangle — it contributes `(row_ones - 1) × (col_ones - 1)` triangles.
