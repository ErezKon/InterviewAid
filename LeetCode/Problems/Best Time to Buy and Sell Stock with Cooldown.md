# 309. Best Time to Buy and Sell Stock with Cooldown

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)
**Companies:** Amazon, Apple, Aqr Capital Management, Bloomberg, Geico, Google, Microsoft, Tiktok

---

## Problem Description
Given an array `prices` where `prices[i]` is the price of a stock on day `i`, you may complete as many transactions as you like (buy one and sell one share of the stock multiple times) but after selling you must wait one day before buying again (cooldown). Compute the maximum profit achievable.

## Examples
**Example 1**
```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: Buy on day 0, sell on day 2 → profit 2.
             Cooldown on day 3.
             Buy on day 3, sell on day 4 → profit 1.
```
**Example 2**
```
Input: prices = [1]
Output: 0
Explanation: No transaction possible.
```

## Approach
Model three states for each day:
- `held`   – currently holding a stock.
- `sold`   – just sold today (next day is cooldown).
- `rest`   – not holding and not in cooldown.
Transition equations update these states in O(1) per day.

```text
FUNCTION MaxProfit(prices):
    SET n ← LENGTH(prices)
    SET held ← -prices[0]
    SET sold ← 0
    SET rest ← 0
    FOR i ← 1 TO n-1:
        SET newHeld ← MAX(held, rest - prices[i])
        SET newSold ← held + prices[i]
        SET newRest ← MAX(rest, sold)
        SET held, sold, rest ← newHeld, newSold, newRest
    ENDFOR
    RETURN MAX(sold, rest)
```

## Walkthrough
| Day | Price | held | sold | rest |
|-----|-------|------|------|------|
| 0   | 1     | -1   | 0    | 0 |
| 1   | 2     | -1   | 1    | 0 |
| 2   | 3     | -1   | 2    | 1 |
| 3   | 0     | 0    | 2    | 2 |
| 4   | 2     | 2    | 2    | 2 |
The final profit is `MAX(sold, rest) = 3`.

## Complexity Analysis
- **Time:** O(n) – one pass through the price list.
- **Space:** O(1) – only constant‑size variables.

## Follow-Up Questions
1. How would the algorithm change if the cooldown period were `k` days instead of 1?
2. What if a transaction fee is charged on each sell?
3. Can you extend the DP to handle a limit on the number of transactions?

## Key Takeaway
Represent the problem with a small state machine (held, sold, rest) and update each state in constant time to respect the cooldown constraint.
