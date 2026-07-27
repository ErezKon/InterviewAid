# 879. Profitable Schemes

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google
---

```
FUNCTION profitableSchemes(n, minProfit, group, profit):
    MOD = 10^9 + 7
    // dp[j][k] = ways using j members with k profit
    dp = (n+1) × (minProfit+1) zeros; dp[0][0] = 1
    FOR i ← 0 TO len(group) - 1:
        FOR j ← n DOWN TO group[i]:
            FOR k ← minProfit DOWN TO 0:
                dp[j][MIN(k + profit[i], minProfit)] += dp[j - group[i]][k]
```
