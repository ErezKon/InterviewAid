# 123. Best Time to Buy and Sell Stock III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)
**Companies:** Amazon, Apple, Bloomberg, Bolt, Citadel, Goldman Sachs, Google, Meta, Microsoft, Paypal, Snapchat, Tekion, Tiktok, Visa

---

## Approach: State Machine DP — O(n) ✅

Track 4 states: after 1st buy, after 1st sell, after 2nd buy, after 2nd sell.

```
FUNCTION maxProfit(prices):
    buy1 = buy2 = -infinity
    sell1 = sell2 = 0

    FOR price IN prices:
        buy1 = MAX(buy1, -price)
        sell1 = MAX(sell1, buy1 + price)
        buy2 = MAX(buy2, sell1 - price)
        sell2 = MAX(sell2, buy2 + price)

    RETURN sell2
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

### Generalized: k transactions (#188)?

```
dp[k][0] = max profit with k transactions, not holding
dp[k][1] = max profit with k transactions, holding
```

O(nk) time, O(k) space.
