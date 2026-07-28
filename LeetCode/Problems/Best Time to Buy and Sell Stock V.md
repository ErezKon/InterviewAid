# 3573. Best Time to Buy and Sell Stock V

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta
---

## Problem Description
You are given an integer array `prices` where `prices[i]` is the price of a given stock on day `i`. You may complete at most `k` transactions (a buy followed by a sell) and after selling you must wait one day (cooldown) before buying again. Find the maximum profit you can achieve.

## Examples
**Example 1:**
```
Input: prices = [1,2,3,0,2], k = 2
Output: 3
Explanation: Buy on day 0, sell on day 1 (profit 1). Cooldown on day 2. Buy on day 3, sell on day 4 (profit 2). Total = 3.
```

**Example 2:**
```
Input: prices = [5,4,3,2,1], k = 3
Output: 0
Explanation: No profitable transaction possible.
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
