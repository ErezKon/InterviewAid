# 714. Best Time to Buy and Sell Stock with Transaction Fee

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Google, Meta, Microsoft, Tiktok

---

## Approach: DP — O(n) ✅

```
FUNCTION maxProfit(prices, fee):
    cash = 0        // max profit when not holding
    hold = -prices[0]    // max profit when holding

    FOR i ← 1 TO n - 1:
        cash = MAX(cash, hold + prices[i] - fee)
        hold = MAX(hold, cash - prices[i])

    RETURN cash
```

Two states: holding or not. Fee is paid on sell.
