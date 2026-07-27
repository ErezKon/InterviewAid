# 931. Minimum Falling Path Sum

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Apple, Bloomberg, Dream11, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description

Given an `n×n` matrix, find a falling path (each step goes to the next row in adjacent column: left, same, or right) with the **minimum sum**.

## Key Insight

> Classic DP: `matrix[r][c] += min(matrix[r-1][c-1], matrix[r-1][c], matrix[r-1][c+1])`. Process top to bottom, answer is `min(last row)`.

## Approach: In-Place DP — O(n²) ✅

```
FUNCTION minFallingPathSum(matrix):
    FOR r ← 1 TO n - 1:
        FOR c ← 0 TO n - 1:
            matrix[r][c] += MIN(matrix[r-1][max(0,c-1):c+2])
    RETURN MIN(matrix[-1])
```

| Time | Space |
|------|-------|
| O(n²) | O(1) — in-place |

## Key Takeaway

> Standard falling path DP — each cell accumulates the minimum from the 3 cells above it. In-place modification avoids extra space.
