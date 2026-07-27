# 518. Coin Change II

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/coin-change-ii](https://leetcode.com/problems/coin-change-ii)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Mastercard, Meta, Microsoft, Morgan Stanley, Pornhub, Salesforce, Tiktok, Zoho

---

## 1. Problem Description

Given coins of different denominations and a total `amount`, return the number of **combinations** that make up that amount. Each coin can be used unlimited times.

---

## 2. Approach: DP (Unbounded Knapsack) — O(amount × n) ✅

```
FUNCTION change(amount, coins):
    dp = array of (amount + 1) zeros
    dp[0] = 1

    FOR coin IN coins:               // coins in outer loop → combinations
        FOR j ← coin TO amount:
            dp[j] += dp[j - coin]

    RETURN dp[amount]
```

### Why coins in the outer loop?

If amount is in the outer loop, we count **permutations** (order matters). Coins in outer loop counts **combinations** (each coin sequence counted once).

| Time | Space |
|------|-------|
| O(amount × n) | O(amount) |

---

## Key Takeaway

> Coin Change I minimizes coins (use `min`). Coin Change II counts combinations (use `+=`). The loop order (coins outer vs inner) determines combinations vs permutations.
