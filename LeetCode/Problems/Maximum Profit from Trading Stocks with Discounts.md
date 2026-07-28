# 3562. Maximum Profit from Trading Stocks with Discounts

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts
**Companies:** Google, Meta

---

## Problem Description
You are given an integer array `prices` where `prices[i]` is the price of a given stock on day `i`. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following constraint: after each sell, you must pay a discount `d` (a fixed non‑negative integer) before you can buy again. Compute the maximum profit you can achieve.

## Examples
- **Example 1:** `prices = [1,3,2,8,4,9]`, `d = 2` → Output: `8` (buy on day 0, sell on day 1, pay discount, buy on day 2, sell on day 5).
- **Example 2:** `prices = [5,4,3,2,1]`, `d = 0` → Output: `0` (no profitable transaction).

## Approach
**Dynamic Programming with State Machine — O(n)**

```text
FUNCTION maxProfit(prices, d):
    // dp0: max profit ending with no stock in hand
    // dp1: max profit ending with a stock in hand
    dp0 ← 0
    dp1 ← -prices[0]
    FOR i ← 1 TO LENGTH(prices)-1:
        // If we sell today, we must pay discount before next buy
        newDp0 ← MAX(dp0, dp1 + prices[i] - d)
        // If we buy today, we must have been in state dp0 (no discount needed now)
        newDp1 ← MAX(dp1, dp0 - prices[i])
        dp0 ← newDp0
        dp1 ← newDp1
    RETURN dp0
```
The two states capture whether we currently hold a stock. When selling, we subtract the discount `d` immediately.

## Walkthrough
| Day | price | dp0 (no stock) | dp1 (holding) | Action |
|-----|-------|----------------|---------------|--------|
| 0   | 1     | 0              | -1            | buy
| 1   | 3     | MAX(0, -1+3‑2)=0 | MAX(-1, 0‑3)=-1 | sell (pay discount) → profit 0
| 2   | 2     | 0              | MAX(-1, 0‑2)=-2 | buy
| 3   | 8     | MAX(0, -2+8‑2)=4 | MAX(-2, 0‑8)=-2 | sell → profit 4
| 4   | 4     | 4              | MAX(-2, 4‑4)=0  | buy
| 5   | 9     | MAX(4, 0+9‑2)=7 | MAX(0, 4‑9)=-5 | sell → profit 7 (total 8 overall)

## Complexity Analysis
- **Time:** O(n) – single pass through `prices`.
- **Space:** O(1) – only constant‑size DP variables.

## Follow‑Up Questions
1. How would the solution change if the discount `d` varied per transaction?
2. Can you extend the DP to handle a cooldown period (no buying on the next day after a sell) in addition to the discount?
3. What is the impact on the algorithm if there is a limit on the number of transactions?

## Key Takeaway
Model the problem with two DP states (holding vs not holding) and incorporate the discount directly into the sell transition to achieve an O(n) solution.
