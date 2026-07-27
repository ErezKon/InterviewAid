# 576. Out of Boundary Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/out-of-boundary-paths](https://leetcode.com/problems/out-of-boundary-paths)
**Companies:** Amazon, Baidu, Bloomberg

---

```
FUNCTION findPaths(m, n, maxMove, startRow, startColumn):
    MOD = 10^9 + 7
    dp = m × n zeros
    dp[startRow][startColumn] = 1
    count = 0

    FOR move ← 1 TO maxMove:
        newDp = m × n zeros
        FOR r, c where dp[r][c] > 0:
            FOR (nr, nc) IN neighbors:
                IF out of bounds: count = (count + dp[r][c]) % MOD
                ELSE: newDp[nr][nc] = (newDp[nr][nc] + dp[r][c]) % MOD
        dp = newDp

    RETURN count
```
