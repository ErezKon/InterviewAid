# 2435. Paths in Matrix Whose Sum Is Divisible by K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k](https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k)
**Companies:** Amazon, Apple, Google, Microsoft

---

```
FUNCTION numberOfPaths(grid, k):
    MOD = 10^9 + 7
    m, n = dimensions
    dp = m × n × k zeros
    dp[0][0][grid[0][0] % k] = 1

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            FOR rem ← 0 TO k - 1:
                newRem = (rem + grid[r][c]) % k
                IF r > 0: dp[r][c][newRem] += dp[r-1][c][rem]
                IF c > 0: dp[r][c][newRem] += dp[r][c-1][rem]

    RETURN dp[m-1][n-1][0] % MOD
```
