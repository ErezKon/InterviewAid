# 2742. Painting the Walls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/painting-the-walls](https://leetcode.com/problems/painting-the-walls)
**Companies:** Amazon, De Shaw, Google, Meesho, Meta, Snowflake

---

## Approach: DP (Knapsack) — O(n²) ✅

```
FUNCTION paintWalls(cost, time):
    n = len(cost)
    // dp[j] = min cost to paint j walls using paid painter
    // Free painter paints during paid painter's time
    dp = [infinity] * (n + 1)
    dp[0] = 0

    FOR i ← 0 TO n - 1:
        FOR j ← n DOWN TO 1:
            // Painting wall i covers (1 + time[i]) walls total
            dp[j] = MIN(dp[j], dp[MAX(0, j - 1 - time[i])] + cost[i])

    RETURN dp[n]
```

Paid painter paints wall i (cost[i], takes time[i]+1 total walls covered including free painter).
