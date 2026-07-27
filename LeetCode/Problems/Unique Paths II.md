# 63. Unique Paths II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-paths-ii](https://leetcode.com/problems/unique-paths-ii)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia, Pinterest, Tcs, Tiktok, Zepto

---

## Approach: DP — O(m·n) ✅

```
FUNCTION uniquePathsWithObstacles(grid):
    IF grid[0][0] == 1: RETURN 0
    m, n = dimensions
    dp = m × n matrix of zeros
    dp[0][0] = 1

    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            IF grid[i][j] == 1:
                dp[i][j] = 0
            ELSE:
                IF i > 0: dp[i][j] += dp[i-1][j]
                IF j > 0: dp[i][j] += dp[i][j-1]

    RETURN dp[m-1][n-1]
```

Same as Unique Paths but set `dp[i][j] = 0` at obstacles.
