# 2088. Count Fertile Pyramids in a Land

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-fertile-pyramids-in-a-land](https://leetcode.com/problems/count-fertile-pyramids-in-a-land)
**Companies:** Google

---

## 1. Problem Description

Given a binary matrix `grid` of size `m × n`, count all **pyramidal** and **inverse pyramidal** plots formed entirely of `1`s. A pyramid of height `h` has its apex at cell `(r,c)` and for each level `i` (0‑based) the row `r+i` must contain `2i+1` consecutive `1`s centered at column `c`. An inverse pyramid is defined similarly but grows upward from its apex.

---

## 2. Approach: DP with Prefix Sums — O(m × n) ✅

```text
FUNCTION countPyramids(grid):
    m, n ← dimensions of grid
    // Helper to count pyramids in one direction
    FUNCTION countDirection(mat):
        dp ← matrix of zeros with size m × n
        total ← 0
        FOR r FROM 1 TO m-1:
            FOR c FROM 1 TO n-2:
                IF mat[r][c] == 1:
                    // Check that the three cells below form a larger base
                    dp[r][c] ← MIN(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1]) + 1
                    // Subtract height 1 because a single cell is not a pyramid
                    total ← total + dp[r][c] - 1
        RETURN total
    // Count pyramids (apex at top) and inverse pyramids (apex at bottom)
    RETURN countDirection(grid) + countDirection(REVERSE_ROWS(grid))
```

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,0],[1,1,1],[1,1,1]]
Output: 2
Explanation: One pyramid of height 2 with apex (0,1) and one inverse pyramid of height 2 with apex (2,1).
```

**Example 2:**
```
Input: grid = [[1,1,1,1],[1,1,1,1],[1,1,1,1]]
Output: 6
Explanation: Three pyramids and three inverse pyramids of height 2.
```

---

## Walkthrough

For the first example:
| Cell (r,c) | dp value | Reason |
|------------|----------|--------|
| (1,1) | 1 | Base of height 1 (single cell) |
| (2,1) | 2 | Minimum of three cells above (1,0),(1,1),(1,2) is 1 → +1 |
The contribution `dp-1` adds 1 pyramid of height 2. The same process on the reversed grid yields the inverse pyramid.

---

## Complexity Analysis

- **Time:** O(m × n) – each cell is visited a constant number of times.
- **Space:** O(m × n) for the DP table (can be reduced to O(n) with rolling arrays).

---

## Follow-Up Questions

1. How would you modify the algorithm to count only pyramids (or only inverse pyramids)?
2. Can the DP be optimized to O(1) extra space?
3. What if the matrix contains values other than 0/1, and a pyramid requires all cells ≥ a threshold?

---

## Key Takeaway

> DP captures the maximal pyramid height at each apex by looking at the three cells directly below (or above). Summing `height‑1` across the grid yields the total number of pyramids and inverse pyramids.
