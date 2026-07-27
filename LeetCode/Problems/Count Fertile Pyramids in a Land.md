# 2088. Count Fertile Pyramids in a Land

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-fertile-pyramids-in-a-land](https://leetcode.com/problems/count-fertile-pyramids-in-a-land)
**Companies:** Google

---

## 1. Problem Description

Given a binary matrix, count the number of **pyramidal** and **inverse pyramidal** plots. A pyramid of height `h` has its apex at `(r,c)`, with row `i` having `2i+1` consecutive 1s centered at column `c`.

---

## 2. Key Insight

> DP: `dp[r][c]` = largest pyramid height with apex at `(r,c)`. Compute for both upward (pyramidal) and downward (inverse pyramidal). Use prefix sums of each row to quickly check if a range is all 1s.

---

## 3. Approach: DP with Prefix Sums — O(m × n) ✅

```
FUNCTION countPyramids(grid):
    m, n = dimensions
    
    FUNCTION count(grid):
        dp = copy(grid)
        total = 0
        FOR r FROM 1 TO m-1:
            FOR c FROM 1 TO n-2:
                IF grid[r][c] == 1:
                    dp[r][c] = MIN(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1]) + 1
                    total += dp[r][c] - 1  // pyramids of height 2,3,...
        RETURN total
    
    // Count pyramids (top-down) and inverse pyramids (bottom-up)
    RETURN count(grid) + count(reversed(grid))
```

| Time | Space |
|------|-------|
| O(m × n) | O(m × n) |

---

## Key Takeaway

> Pyramid counting via DP: the height at each apex depends on the three cells above (or below for inverse). Reverse the grid to reuse the same logic for inverse pyramids.
