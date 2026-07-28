# 3652. Best Time to Buy and Sell Stock using Strategy

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy)
**Companies:** Amazon, Meta, Microsoft, Uber, Visa

---

## Problem Description
Given an array `prices` where `prices[i]` is the price of a stock on day `i`, and a set of strategy constraints (e.g., limit on number of transactions, cooldown periods, or transaction fees), determine the maximum profit achievable by buying and selling the stock according to the strategy.

## Examples
**Example 1**
```
Input: prices = [7,1,5,3,6,4], strategy = {maxTransactions: 2}
Output: 7
Explanation: Buy on day 2 (price=1) and sell on day 3 (price=5), profit = 4.
         Then buy on day 4 (price=3) and sell on day 5 (price=6), profit = 3.
         Total profit = 7.
```
**Example 2**
```
Input: prices = [1,2,3,4,5], strategy = {cooldown: 1}
Output: 4
Explanation: Buy on day 1, sell on day 5. No cooldown violation.
```

## Approach
Use dynamic programming where `dp[i][t]` represents the maximum profit up to day `i` with `t` transactions (or respecting cooldown/fee). Transition:
- Do nothing on day `i` → `dp[i][t] = dp[i‑1][t]`
- Sell on day `i` → `dp[i][t] = max(dp[i][t], price[i] + maxPrevBuy)` where `maxPrevBuy` tracks the best value of `dp[j][t‑1] - price[j]` respecting cooldown.
The algorithm iterates days and transaction states, updating `maxPrevBuy` on the fly for O(n·k) time where `k` is the number of allowed transactions (or 1 for fee/cooldown variants).

```text
FUNCTION MaxProfit(prices, strategy):
    SET n ← LENGTH(prices)
    SET k ← strategy.maxTransactions OR 1
    CREATE dp[0…n][0…k] ← 0
    FOR t ← 1 TO k:
        SET maxPrevBuy ← -prices[0]
        FOR i ← 1 TO n-1:
            // Option 1: no transaction today
            SET dp[i][t] ← dp[i-1][t]
            // Option 2: sell today
            SET dp[i][t] ← MAX(dp[i][t], prices[i] + maxPrevBuy)
            // Update best buy for future sells, respecting cooldown if any
            SET candidate ← dp[i][t-1] - prices[i]
            IF strategy.cooldown EXISTS AND i - strategy.cooldown - 1 >= 0:
                SET candidate ← dp[i-strategy.cooldown-1][t-1] - prices[i]
            ENDIF
            SET maxPrevBuy ← MAX(maxPrevBuy, candidate)
        ENDFOR
    ENDFOR
    RETURN dp[n-1][k]
```

## Walkthrough
| Day | Price | maxPrevBuy | dp (transactions) |
|-----|-------|------------|-------------------|
| 0   | 7     | -7         | 0                 |
| 1   | 1     | -1         | 0                 |
| 2   | 5     | -1         | 4 (sell)          |
| 3   | 3     | -1         | 4                 |
| 4   | 6     | -1         | 7 (sell)          |
| 5   | 4     | -1         | 7                 |
The table shows how `maxPrevBuy` captures the best buying point and how `dp` updates when selling yields higher profit.

## Complexity Analysis
- **Time:** O(n · k) where `n` is number of days and `k` is allowed transactions (often ≤ 2). For fee or cooldown variants, `k` = 1, giving O(n).
- **Space:** O(n · k) can be reduced to O(k) by keeping only previous day values.

## Follow-Up Questions
1. How would the solution change if there is a fixed transaction fee for each sell?
2. What if unlimited transactions are allowed but a cooldown of one day is required after each sell?
3. Can the problem be solved in O(1) extra space for the single‑transaction case?

## Key Takeaway
Model the profit problem with dynamic programming that tracks the best “buy” state (`maxPrevBuy`) and updates profit on each sell, allowing easy extension to transaction limits, fees, or cooldowns.
