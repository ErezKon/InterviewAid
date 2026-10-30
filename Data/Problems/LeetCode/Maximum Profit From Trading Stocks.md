# 2291. Maximum Profit From Trading Stocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profit-from-trading-stocks](https://leetcode.com/problems/maximum-profit-from-trading-stocks)
**Companies:** Adobe, Amazon, Blackrock, Oracle, Servicenow

---

## Problem Description
You are given two **0-indexed** integer arrays of the same length `present` and `future` where `present[i]` is the current price of the `i`th stock and `future[i]` is the price of the `i`th stock a year in the future. You may buy each stock at most **once**. You are also given an integer `budget` representing the amount of money you currently have.

Return *the maximum amount of profit you can make.*

**Constraints:**
- `n == present.length == future.length`
- `1 <= n <= 1000`
- `0 <= present[i], future[i] <= 100`
- `0 <= budget <= 1000`

## Examples

```
Example 1:
  Input: present = [5,4,6,2,3], future = [8,5,4,3,5], budget = 10
  Output: 6
  Explanation: One possible way to maximize your profit is to:
    Buy the 0th, 3rd, and 4th stocks for a total of 5 + 2 + 3 = 10.
    Next year, sell all three stocks for a total of 8 + 3 + 5 = 16.
    The profit you made is 16 - 10 = 6.
    It can be shown that the maximum profit you can make is 6.
```

```
Example 2:
  Input: present = [2,2,5], future = [3,4,10], budget = 6
  Output: 5
  Explanation: The only possible way to maximize your profit is to:
    Buy the 2nd stock, and make a profit of 10 - 5 = 5.
    It can be shown that the maximum profit you can make is 5.
```

```
Example 3:
  Input: present = [3,3,12], future = [0,3,15], budget = 10
  Output: 0
  Explanation: One possible way to maximize your profit is to:
    Buy the 1st stock, and make a profit of 3 - 3 = 0.
    It can be shown that the maximum profit you can make is 0.
```

## Approach
```
FUNCTION maximumProfit(present, future, budget)
    dp ← [0] × (budget + 1)

    FOR i ← 0 TO n - 1 DO
        profit ← future[i] - present[i]
        IF profit ≤ 0 THEN CONTINUE
        FOR j ← budget DOWN TO present[i] DO
            dp[j] ← MAX(dp[j], dp[j - present[i]] + profit)

    RETURN dp[budget]
END FUNCTION
```

## Walkthrough
Consider `present = [3,5,2]`, `future = [4,6,5]`, `budget = 5`.
1. Initialize `dp[0..5] = 0`.
2. Stock 0: profit = 1, weight = 3.
   - Update `dp[5] = max(0, dp[2]+1)=1`, `dp[4]=1`, `dp[3]=1`.
3. Stock 1: profit = 1, weight = 5.
   - Update `dp[5] = max(1, dp[0]+1)=1` (no change).
4. Stock 2: profit = 3, weight = 2.
   - Update `dp[5] = max(1, dp[3]+3)=4`, `dp[4]=max(1, dp[2]+3)=3`, `dp[3]=max(1, dp[1]+3)=3`, `dp[2]=3`.
5. Final `dp[5] = 4` → maximum profit.

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × budget)** |
| Space  | **O(budget)** — 1D DP |

## Follow-Up Questions
- How would the solution change if you could buy multiple units of each stock?
- What if you had to sell the stocks on different future days instead of tomorrow?
- Can you extend this to a multi‑day trading scenario with transaction limits?

## Key Takeaway
> **Classic 0-1 knapsack** — only buy profitable stocks (positive future - present). Iterate budget in reverse for 1D DP.
