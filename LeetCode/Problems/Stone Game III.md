# 1406. Stone Game III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stone-game-iii](https://leetcode.com/problems/stone-game-iii)
**Companies:** Google, Meta

---

## Approach: DP — O(n) ✅

```
FUNCTION stoneGameIII(stoneValue):
    n = len(stoneValue)
    dp = [0] * (n + 1)    // dp[i] = max score advantage from index i

    FOR i ← n - 1 DOWN TO 0:
        dp[i] = -infinity
        total = 0
        FOR k ← 1 TO 3:
            IF i + k > n: BREAK
            total += stoneValue[i + k - 1]
            dp[i] = MAX(dp[i], total - dp[i + k])

    IF dp[0] > 0: RETURN "Alice"
    IF dp[0] < 0: RETURN "Bob"
    RETURN "Tie"
```
