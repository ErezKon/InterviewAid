# 887. Super Egg Drop

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-egg-drop](https://leetcode.com/problems/super-egg-drop)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tiktok

---

## Approach: DP (reverse thinking) — O(k·log n) ✅

```
FUNCTION superEggDrop(k, n):
    // dp[m][k] = max floors we can check with m moves and k eggs
    dp = [[0] * (k + 1) for _ in range(n + 1)]

    m = 0
    WHILE dp[m][k] < n:
        m += 1
        FOR j ← 1 TO k:
            dp[m][j] = dp[m-1][j-1] + dp[m-1][j] + 1

    RETURN m
```

Instead of "min moves for n floors", ask "max floors with m moves". dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1.
