# 188. Best Time to Buy and Sell Stock IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv)
**Companies:** Amazon, Apple, Citadel, Goldman Sachs, Google, Hashedin, Meta, Microsoft, Nielsen, Pubmatic, Tiktok

---

## Approach: DP with k transactions — O(nk) ✅

```
FUNCTION maxProfit(k, prices):
    IF k >= len(prices) / 2:
        // Unlimited transactions
        RETURN sum of all positive differences

    buy = [-infinity] * (k + 1)
    sell = [0] * (k + 1)

    FOR price IN prices:
        FOR j ← 1 TO k:
            buy[j] = MAX(buy[j], sell[j-1] - price)
            sell[j] = MAX(sell[j], buy[j] + price)

    RETURN sell[k]
```

When `k ≥ n/2`, degenerate to unlimited transactions (Best Time II).
