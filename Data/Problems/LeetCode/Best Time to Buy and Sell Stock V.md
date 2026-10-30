# 3573. Best Time to Buy and Sell Stock V

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v)

**Companies:** Amazon, Google, Meta
---

## Problem Description
You are given an integer array `prices` where `prices[i]` is the price of a stock in dollars on the `iᵗʰ` day, and an integer `k`.

You are allowed to make at most `k` transactions, where each transaction can be either of the following:

- **Normal transaction**: Buy on day `i`, then sell on a later day `j` where `i < j`. You profit `prices[j] - prices[i]`.
- **Short selling transaction**: Sell on day `i`, then buy back on a later day `j` where `i < j`. You profit `prices[i] - prices[j]`.

**Note** that you must complete each transaction before starting another. Additionally, you can't buy or sell on the same day you are selling or buying back as part of a previous transaction.

Return the **maximum** total profit you can earn by making **at most** `k` transactions.

**Constraints:**
- `2 ≤ prices.length ≤ 10³`
- `1 ≤ prices[i] ≤ 10⁹`
- `1 ≤ k ≤ prices.length / 2`

## Examples
```
Example 1:
  Input: prices = [1,7,9,8,2], k = 2
  Output: 14
  Explanation: We can make $14 of profit through 2 transactions:
  - A normal transaction: buy the stock on day 0 for $1 then sell it on day 2 for $9.
  - A short selling transaction: sell the stock on day 3 for $8 then buy back on day 4 for $2.

Example 2:
  Input: prices = [12,16,19,19,8,1,19,13,9], k = 3
  Output: 36
  Explanation: We can make $36 of profit through 3 transactions:
  - A normal transaction: buy the stock on day 0 for $12 then sell it on day 2 for $19.
  - A short selling transaction: sell the stock on day 3 for $19 then buy back on day 4 for $8.
  - A normal transaction: buy the stock on day 5 for $1 then sell it on day 6 for $19.
```

## Approach
**DP with State Machine — O(n·k) ✅**
Maintain three DP arrays for each day and transaction count:
- `hold[t]`: max profit on day `i` with `t` transactions used and currently holding a stock.
- `sold[t]`: max profit on day `i` with `t` transactions completed and in cooldown.
- `rest[t]`: max profit on day `i` with `t` transactions completed and not in cooldown.
Transitions:
```
newHold[t] = MAX(hold[t], rest[t] - prices[i])
newSold[t] = hold[t] + prices[i]
newRest[t] = MAX(rest[t], sold[t-1])   // cooldown ends, can rest
```
Iterate days, updating arrays for all `t` from 1..k. The answer is the maximum of `sold[t]` and `rest[t]` after the last day.

```text
FUNCTION maxProfit(prices, k):
    n ← LENGTH(prices)
    IF n = 0 OR k = 0: RETURN 0
    // initialize DP arrays with -∞ for impossible states
    hold ← ARRAY(k+1) FILLED WITH -∞
    sold ← ARRAY(k+1) FILLED WITH -∞
    rest ← ARRAY(k+1) FILLED WITH 0
    FOR i ← 0 TO n-1:
        price ← prices[i]
        FOR t ← 1 TO k:
            newHold ← MAX(hold[t], rest[t] - price)
            newSold ← hold[t] + price
            newRest ← MAX(rest[t], sold[t-1])
            hold[t] ← newHold
            sold[t] ← newSold
            rest[t] ← newRest
    RETURN MAX( MAX(sold), MAX(rest) )
```

## Walkthrough
For `prices = [1,2,3,0,2]`, `k = 2`:
- Day 0: buy → `hold[1] = -1`.
- Day 1: sell → `sold[1] = 1`, `rest[1] = 0`.
- Day 2: cooldown, `rest[1] = MAX(rest[1], sold[0]) = 0`.
- Day 3: buy again → `hold[2] = rest[1] - 0 = 0`.
- Day 4: sell → `sold[2] = 0 + 2 = 2`.
Maximum profit = `sold[2] + sold[1] = 3`.

## Complexity Analysis
- **Time:** O(n·k) – each day updates k transaction states.
- **Space:** O(k) – only current day arrays are kept.

## Follow‑Up Questions
1. How would you adapt the solution for unlimited transactions (`k` large) to achieve O(n) time?
2. Can you modify the DP to handle a variable cooldown length `c` days?
3. What changes are needed if transaction fees are applied on each sell?

## Key Takeaway
Modeling stock trading with cooldown and transaction limits as a multi‑state DP lets you track holding, cooldown, and rest efficiently, turning a combinatorial problem into O(n·k) time.
