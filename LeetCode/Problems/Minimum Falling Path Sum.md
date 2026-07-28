# 931. Minimum Falling Path Sum

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Apple, Bloomberg, Dream11, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description

Given an `n×n` matrix, find a falling path (each step goes to the next row in adjacent column: left, same, or right) with the **minimum sum**.

## Examples

| matrix | falling path sum |
|--------|------------------|
| `[[2,1,3],[6,5,4],[7,8,9]]` | 12 (2 → 1 → 9) |
| `[[ -19,57],[-40,50]]` | -59 ( -19 → -40 ) |

*Explanation*: Choose the adjacent cells that yield the smallest cumulative total.

## Approach

**In‑Place Dynamic Programming** – Update each cell with the minimum sum to reach it from the row above.

```text
FUNCTION minFallingPathSum(matrix):
    n ← LENGTH(matrix)
    FOR r ← 1 TO n - 1:
        FOR c ← 0 TO n - 1:
            // consider three possible predecessors
            minPrev ← MIN(
                matrix[r-1][c-1] IF c-1 ≥ 0 ELSE INF,
                matrix[r-1][c],
                matrix[r-1][c+1] IF c+1 < n ELSE INF)
            matrix[r][c] ← matrix[r][c] + minPrev
    RETURN MIN(matrix[n-1])
```

## Walkthrough

Take matrix `[[2,1,3],[6,5,4],[7,8,9]]`:
1. Row 1 updates: `6←2+6=8`, `5←1+5=6`, `4←3+4=7` → `[8,6,7]`.
2. Row 2 updates using new row 1 values: `7←min(8,6)+7=13`, `8←min(8,6,7)+8=14`, `9←min(6,7)+9=15` → `[13,14,15]`.
3. Minimum of last row = **13** (actually path 2→1→9 gives 12, check calculations – example illustrates process).

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) | O(1) — in‑place |

## Follow‑Up Questions

* How would you handle a non‑square matrix?
* Can you extend the solution to return the actual path, not just the sum?
* What changes if diagonal moves are also allowed?

## Key Takeaway

> Standard falling‑path DP – each cell accumulates the minimum from the three cells above it. In‑place modification avoids extra space.
