# 3652. Best Time to Buy and Sell Stock using Strategy

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy)
**Companies:** Amazon, Meta, Microsoft, Uber, Visa

---

## Problem Description
You are given two integer arrays `prices` and `strategy`, where:

- `prices[i]` is the price of a given stock on the `iᵗʰ` day.
- `strategy[i]` represents a trading action on the `iᵗʰ` day, where:
  - `-1` indicates buying one unit of the stock.
  - `0` indicates holding the stock.
  - `1` indicates selling one unit of the stock.

You are also given an **even** integer `k`, and may perform **at most one** modification to `strategy`. A modification consists of:

- Selecting exactly `k` **consecutive** elements in `strategy`.
- Set the **first** `k / 2` elements to `0` (hold).
- Set the **last** `k / 2` elements to `1` (sell).

The **profit** is defined as the **sum** of `strategy[i] * prices[i]` across all days.

Return the **maximum** possible profit you can achieve.

**Note:** There are no constraints on budget or stock ownership, so all buy and sell operations are feasible regardless of past actions.

**Constraints:**
- `2 ≤ prices.length == strategy.length ≤ 10⁵`
- `1 ≤ prices[i] ≤ 10⁵`
- `-1 ≤ strategy[i] ≤ 1`
- `2 ≤ k ≤ prices.length`
- `k` is even

## Examples
```
Example 1:
  Input: prices = [4,2,8], strategy = [-1,0,1], k = 2
  Output: 10
  Explanation:
  | Modification  | Strategy   | Profit Calculation                        | Profit |
  |---------------|------------|-------------------------------------------|--------|
  | Original      | [-1, 0, 1] | (-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8 | 4      |
  | Modify [0, 1] | [0, 1, 1]  | (0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8   | 10     |
  | Modify [1, 2] | [-1, 0, 1] | (-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8 | 4      |
  Thus, the maximum possible profit is 10, which is achieved by modifying the subarray [0, 1].

Example 2:
  Input: prices = [5,4,3], strategy = [1,1,0], k = 2
  Output: 9
  Explanation:
  | Modification  | Strategy   | Profit Calculation                     | Profit |
  |---------------|------------|----------------------------------------|--------|
  | Original      | [1, 1, 0]  | (1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0 | 9      |
  | Modify [0, 1] | [0, 1, 0]  | (0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0 | 4      |
  | Modify [1, 2] | [1, 0, 1]  | (1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3 | 8      |
  Thus, the maximum possible profit is 9, which is achieved without any modification.
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
