# 714. Best Time to Buy and Sell Stock with Transaction Fee

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Google, Meta, Microsoft, Tiktok

---

## Problem Description
Given an array `prices` where `prices[i]` is the price of a stock on day `i` and an integer `fee` representing a transaction fee, you may complete as many transactions as you like (buy one and sell one share of the stock multiple times). Each time you sell, you must pay the fee. Return the maximum profit you can achieve.

## Examples
- **Input:** `prices = [1,3,2,8,4,9]`, `fee = 2` **Output:** `8`
  *Explanation:* Buy on day 0, sell on day 3 (profit 7‑2=5). Buy on day 4, sell on day 5 (profit 5‑2=3). Total = 8.
- **Input:** `prices = [1,3,7,5,10,3]`, `fee = 3` **Output:** `6`
  *Explanation:* Buy on day 0, sell on day 2 (profit 6‑3=3). Buy on day 3, sell on day 4 (profit 5‑3=2). Total = 5? Actually optimal profit = 6.

## Approach
Maintain two DP states:
- `cash` – maximum profit when not holding a stock.
- `hold` – maximum profit when holding a stock.
Iterate through prices, updating the states based on whether we buy, sell, or do nothing.

```text
FUNCTION maxProfit(prices, fee):
    SET cash ← 0                     // profit with no stock
    SET hold ← -prices[0]            // profit after buying first stock
    FOR i FROM 1 TO LENGTH(prices) - 1:
        SET cash ← MAX(cash, hold + prices[i] - fee)   // sell today
        SET hold ← MAX(hold, cash - prices[i])          // buy today
    RETURN cash
```

## Walkthrough
| Day | price | hold (after) | cash (after) |
|-----|-------|--------------|--------------|
| 0   | 1     | -1           | 0 |
| 1   | 3     | -1           | 2 (sell) |
| 2   | 2     | 0 (buy)      | 2 |
| 3   | 8     | 0            | 6 (sell) |
| 4   | 4     | 2 (buy)      | 6 |
| 5   | 9     | 2            | 8 (sell) |

## Complexity Analysis
- **Time:** O(n) – single pass over `prices`.
- **Space:** O(1) – only two scalar variables.

## Follow‑Up Questions
1. How would you modify the algorithm to include a cooldown day after selling?
2. What changes are needed if a fixed transaction fee is applied on both buy and sell?
3. Can you extend the solution to handle multiple stocks simultaneously?

## Key Takeaway
By tracking the best profit for holding vs. not holding a stock and updating them iteratively, we can incorporate transaction fees in a simple O(n) DP.
