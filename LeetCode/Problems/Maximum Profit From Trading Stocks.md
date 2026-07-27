# 2291. Maximum Profit From Trading Stocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profit-from-trading-stocks](https://leetcode.com/problems/maximum-profit-from-trading-stocks)
**Companies:** Adobe, Amazon, Blackrock, Oracle, Servicenow

---

## Problem Description
Given `present[i]` (buy price), `future[i]` (sell price), and a `budget`, buy stocks today and sell tomorrow. Each stock bought at most once. Maximize **total profit**.

## Key Insight
> This is a **0-1 knapsack**: weight = `present[i]`, value = `future[i] - present[i]` (if positive). Budget is the capacity.

## Approach: 0-1 Knapsack — O(n·budget) ✅

```
FUNCTION maximumProfit(present, future, budget)
    dp ← [0] × (budget + 1)

    FOR i ← 0 TO n - 1 DO
        profit ← future[i] - present[i]
        IF profit ≤ 0 THEN CONTINUE
        FOR j ← budget DOWN TO present[i] DO
            dp[j] ← MAX(dp[j], dp[j - present[i]] + profit)

    RETURN dp[budget]
END FUNCTION
```

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × budget)** |
| Space  | **O(budget)** — 1D DP |

## Key Takeaway
> **Classic 0-1 knapsack** — only buy profitable stocks (positive future - present). Iterate budget in reverse for 1D DP.
