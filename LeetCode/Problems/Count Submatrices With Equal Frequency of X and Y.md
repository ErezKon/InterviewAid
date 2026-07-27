# 3212. Count Submatrices With Equal Frequency of X and Y

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 2D grid containing characters `'X'`, `'Y'`, and `'.'`, count submatrices anchored at `(0, 0)` (i.e., top-left corner) ending at `(i, j)` where the count of `'X'` equals the count of `'Y'` and both are > 0.

**Constraints:**
- `1 <= m, n <= 1000`

---

## Key Insight

Since all submatrices start at `(0, 0)`, use **2D prefix sums** for X count and Y count. For each cell `(i, j)`, compute `countX[i][j]` and `countY[i][j]` using the inclusion-exclusion formula, then check if they're equal and positive.

---

## Approach

```
FUNCTION countSubmatrices(grid):
    m, n = DIMENSIONS(grid)
    cntX = [[0]*(n+1) for _ in range(m+1)]
    cntY = [[0]*(n+1) for _ in range(m+1)]
    result = 0

    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            cntX[i][j] = cntX[i-1][j] + cntX[i][j-1] - cntX[i-1][j-1]
                         + (1 IF grid[i-1][j-1] == 'X' ELSE 0)
            cntY[i][j] = cntY[i-1][j] + cntY[i][j-1] - cntY[i-1][j-1]
                         + (1 IF grid[i-1][j-1] == 'Y' ELSE 0)
            IF cntX[i][j] == cntY[i][j] AND cntX[i][j] > 0:
                result += 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(m × n) for prefix sum arrays |

---

## Key Takeaway

> **When submatrices are anchored at (0,0), 2D prefix sums give O(1) query per cell. Maintain separate prefix sums for each character type and compare at each position.**
