# 309. Best Time to Buy and Sell Stock with Cooldown

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)
**Companies:** Amazon, Apple, Aqr Capital Management, Bloomberg, Geico, Google, Microsoft, Tiktok

---

## Approach: State Machine DP — O(n) ✅

```
FUNCTION maxProfit(prices):
    held = -prices[0]    // holding stock
    sold = 0             // just sold (cooldown next)
    rest = 0             // not holding, not in cooldown

    FOR i ← 1 TO n - 1:
        newHeld = MAX(held, rest - prices[i])
        newSold = held + prices[i]
        newRest = MAX(rest, sold)
        held, sold, rest = newHeld, newSold, newRest

    RETURN MAX(sold, rest)
```

Three states: held, sold (cooldown), rest. Transitions model buy/sell/wait with 1-day cooldown.
