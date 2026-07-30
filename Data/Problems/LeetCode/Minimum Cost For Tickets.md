# 983. Minimum Cost For Tickets

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-for-tickets
**Companies:** Adobe, Amazon, Bloomberg, Google, Grab, Intuit, Meta, Microsoft, Roku, Tiktok, Turing, Uber, Zepto

---
## Problem Description
You are given an array `days` where each element is a day you will travel, and an array `costs` of length 3 where `costs[0]`, `costs[1]`, and `costs[2]` represent the price of a 1‑day, 7‑day, and 30‑day travel pass respectively. Compute the minimum total cost to cover all travel days.

## Examples
**Example 1**
Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation: Buy a 1‑day pass on day 1 (2), a 7‑day pass covering days 4‑8 (7), and a 1‑day pass on day 20 (2).

**Example 2**
Input: days = [1,2,3,4,5,6,7,8,9,10], costs = [2,7,15]
Output: 12
Explanation: Two 7‑day passes cover all days.

## Approach
**Algorithm:** Day‑indexed Dynamic Programming
For each day `d` up to the last travel day, `dp[d]` stores the minimum cost to cover all travel up to day `d`. If `d` is not a travel day, the cost stays the same as the previous day. If it is, consider buying each type of pass and take the minimum.

```text
FUNCTION mincostTickets(days, costs):
    travelSet ← SET of days
    last ← days[-1]
    dp ← ARRAY of size last + 1, initialized to 0
    FOR d ← 1 TO last:
        IF d NOT IN travelSet:
            dp[d] ← dp[d-1]
        ELSE:
            cost1 ← dp[d-1] + costs[0]
            cost7 ← dp[MAX(0, d-7)] + costs[1]
            cost30 ← dp[MAX(0, d-30)] + costs[2]
            dp[d] ← MIN(cost1, cost7, cost30)
    RETURN dp[last]
```

## Walkthrough
Consider `days = [1,4,6,7,8,20]` and `costs = [2,7,15]`.
1. Days 1‑3: only day 1 is travel, so `dp[1]=2`, `dp[2]=2`, `dp[3]=2`.
2. Day 4: travel, options → `dp[3]+2=4`, `dp[0]+7=7`, `dp[0]+15=15` → choose 4.
3. Days 5‑8: continue updating; buying a 7‑day pass at day 4 covers up to day 10, giving `dp[8]=9`.
4. Day 20: add a 1‑day pass → final cost `dp[20]=11`.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(D) where D is the last travel day (≤ 365) |
| Space  | O(D) for the DP array |

## Follow‑Up Questions
1. How would you adapt the solution if passes could start on any day, not necessarily the travel day?
2. Can you reduce the space usage to O(1) by keeping only the last 30 values?
3. What changes are needed if the cost structure includes arbitrary‑length passes?

## Key Takeaway
Dynamic programming over days, choosing the cheapest among available passes at each travel day, yields an optimal minimum cost.
