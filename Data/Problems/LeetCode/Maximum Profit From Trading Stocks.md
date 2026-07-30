# 2291. Maximum Profit From Trading Stocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profit-from-trading-stocks](https://leetcode.com/problems/maximum-profit-from-trading-stocks)
**Companies:** Adobe, Amazon, Blackrock, Oracle, Servicenow

---

## Problem Description
Given `present[i]` (buy price), `future[i]` (sell price), and a `budget`, buy stocks today and sell tomorrow. Each stock bought at most once. Maximize **total profit**.

## Examples
**Example 1:**
```
Input: present = [3,5,2], future = [4,6,5], budget = 5
Output: 3
Explanation: Buy stock 0 (cost 3, profit 1) and stock 2 (cost 2, profit 3). Total profit = 1 + 3 = 4, but budget 5 allows both, profit 4.
```

**Example 2:**
```
Input: present = [10,20], future = [5,15], budget = 10
Output: 0
Explanation: Both stocks would lose money, so best profit is 0.
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
