# 188. Best Time to Buy and Sell Stock IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv)
**Companies:** Amazon, Apple, Citadel, Goldman Sachs, Google, Hashedin, Meta, Microsoft, Nielsen, Pubmatic, Tiktok

---

## Problem Description
Given an integer `k` and an array `prices` where `prices[i]` is the price of a stock on day `i`, you may complete at most `k` transactions (a buy followed by a sell). Find the maximum profit you can achieve.

## Examples
- **Input:** `k = 2, prices = [2,4,1]` **Output:** `2`
  *Explanation:* Buy on day 0, sell on day 1 (profit 2). No second profitable transaction.
- **Input:** `k = 2, prices = [3,2,6,5,0,3]` **Output:** `7`
  *Explanation:* Buy on day 1, sell on day 2 (profit 4); buy on day 4, sell on day 5 (profit 3); total 7.

## Approach
Dynamic programming with two arrays `buy` and `sell` of size `k+1`.
- `buy[j]` stores the best profit after the `j`‑th buy (negative cost).
- `sell[j]` stores the best profit after the `j`‑th sell.
Iterate over each price and update the states for all transaction counts.
If `k` is large (≥ n/2) the problem reduces to unlimited transactions, which can be solved by summing all positive price differences.

```text
FUNCTION maxProfit(k, prices):
    SET n ← LENGTH(prices)
    IF k >= n / 2:
        // Unlimited transactions case
        SET profit ← 0
        FOR i FROM 1 TO n - 1:
            IF prices[i] > prices[i-1]:
                SET profit ← profit + (prices[i] - prices[i-1])
        RETURN profit

    // Initialize DP arrays
    SET buy ← ARRAY OF -∞ LENGTH k+1
    SET sell ← ARRAY OF 0 LENGTH k+1
    SET buy[0] ← 0   // not used, placeholder

    FOR price IN prices:
        FOR j FROM 1 TO k:
            SET buy[j] ← MAX(buy[j], sell[j-1] - price)
            SET sell[j] ← MAX(sell[j], buy[j] + price)
    RETURN sell[k]
```

## Walkthrough
| price | buy[1] | sell[1] | buy[2] | sell[2] |
|-------|--------|---------|--------|---------|
| 3 | -3 | 0 | -∞ | 0 |
| 2 | -2 | 0 | -2 | 0 |
| 6 | -2 | 4 | -2 | 4 |
| 5 | -2 | 4 | -1 | 5 |
| 0 | -2 | 4 | -2 | 5 |
| 3 | -2 | 4 | -2 | 7 |
Result = 7.

## Complexity Analysis
- **Time:** O(n · k) – each price updates `k` transaction states.
- **Space:** O(k) – two arrays of length `k+1`.

## Follow‑Up Questions
1. How would you modify the algorithm to include a transaction fee per trade?
2. Can you achieve O(n) time when `k` is large by using the unlimited‑transactions shortcut?
3. What if you are allowed at most `k` *non‑overlapping* intervals of increasing prices?

## Key Takeaway
By tracking the best profit after each possible buy and sell using DP arrays, the `k`‑transaction stock problem is solved in O(n k) time with O(k) space.
