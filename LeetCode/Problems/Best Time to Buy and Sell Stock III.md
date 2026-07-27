# 123. Best Time to Buy and Sell Stock III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)
**Companies:** Amazon, Apple, Bloomberg, Bolt, Citadel, Goldman Sachs, Google, Meta, Microsoft, Paypal, Snapchat, Tekion, Tiktok, Visa

---

## Problem Description
Given an array `prices` where `prices[i]` is the price of a stock on day `i`, you may complete at most two transactions (buy‑sell pairs) to maximize profit. You must sell the stock before you buy again.

## Examples
- **Input:** `prices = [3,3,5,0,0,3,1,4]` **Output:** `6`
  *Explanation:* Buy on day 4 (price 0) sell on day 5 (price 3) profit 3; then buy on day 6 (price 1) sell on day 7 (price 4) profit 3; total 6.
- **Input:** `prices = [1,2,3,4,5]` **Output:** `4`
  *Explanation:* One transaction from day 0 to day 4 yields profit 4; second transaction adds nothing.

## Approach
Use a state‑machine DP with four variables representing the best profit after each of the four possible actions: first buy, first sell, second buy, second sell.

```text
FUNCTION maxProfit(prices):
    SET buy1 ← -∞          // max profit after first buy (negative cost)
    SET sell1 ← 0          // max profit after first sell
    SET buy2 ← -∞          // max profit after second buy (includes profit from first sell)
    SET sell2 ← 0          // max profit after second sell (final answer)
    FOR price IN prices:
        SET buy1 ← MAX(buy1, -price)
        SET sell1 ← MAX(sell1, buy1 + price)
        SET buy2 ← MAX(buy2, sell1 - price)
        SET sell2 ← MAX(sell2, buy2 + price)
    RETURN sell2
```

The transitions capture buying at a lower price and selling to realize profit, re‑investing profit from the first transaction into the second.

## Walkthrough
| price | buy1 | sell1 | buy2 | sell2 |
|-------|------|-------|------|-------|
| 3 | -3 | 0 | -3 | 0 |
| 3 | -3 | 0 | -3 | 0 |
| 5 | -3 | 2 | -3 | 2 |
| 0 | 0  | 2 | 2  | 2 |
| 0 | 0  | 2 | 2  | 2 |
| 3 | 0  | 3 | 3  | 3 |
| 1 | 0  | 3 | 2  | 3 |
| 4 | 0  | 4 | 3  | 6 |
Result = 6.

## Complexity Analysis
- **Time:** O(n) – single pass over `prices`.
- **Space:** O(1) – constant number of variables.

## Follow‑Up Questions
1. How would you generalize to at most `k` transactions? (DP with O(nk) time.)
2. What if a transaction fee is charged on each sell?
3. Can you solve the problem with a divide‑and‑conquer approach?

## Key Takeaway
Maintaining four state variables for the two‑transaction problem yields an O(n) time, O(1) space solution by greedily updating best profits after each price.
