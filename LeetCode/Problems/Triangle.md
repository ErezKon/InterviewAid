# 120. Triangle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/triangle](https://leetcode.com/problems/triangle)
**Companies:** Agoda, Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Meta, Microsoft, Oracle, Upstart, Walmart Labs

---

## Approach: Bottom-Up DP — O(n²), O(n) ✅

```
FUNCTION minimumTotal(triangle):
    dp = copy of last row

    FOR row ← len(triangle) - 2 DOWN TO 0:
        FOR col ← 0 TO row:
            dp[col] = triangle[row][col] + MIN(dp[col], dp[col + 1])

    RETURN dp[0]
```

Bottom-up: at each cell, choose the cheaper child. Only need one row of DP.
