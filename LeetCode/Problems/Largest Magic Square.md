# 1895. Largest Magic Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-magic-square](https://leetcode.com/problems/largest-magic-square)
**Companies:** Amazon, Google, Wayfair

---

## 1. Problem Description

Find the largest `k × k` subgrid that is a **magic square** (all rows, columns, and both diagonals sum to the same value).

---

## 2. Approach: Prefix Sums + Brute Force — O(m·n·min(m,n)²) ✅

```
FUNCTION largestMagicSquare(grid):
    m, n = dimensions
    // Precompute row prefix sums and column prefix sums
    rowPre[r][c] = sum of grid[r][0..c]
    colPre[r][c] = sum of grid[0..r][c]

    FOR k ← MIN(m, n) DOWN TO 2:
        FOR r ← 0 TO m - k:
            FOR c ← 0 TO n - k:
                target = rowSum(r, c, k)
                IF all rows, cols, diags of k×k subgrid at (r,c) == target:
                    RETURN k
    RETURN 1
```

| Time | Space |
|------|-------|
| O(m·n·min(m,n)²) | O(m·n) |

---

## 3. Key Takeaway

> Precompute prefix sums for O(1) row/column sum queries. Check all subgrids from largest to smallest — first valid one is the answer.
