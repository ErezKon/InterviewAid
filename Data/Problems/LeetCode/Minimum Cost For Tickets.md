# 983. Minimum Cost For Tickets

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-for-tickets
**Companies:** Adobe, Amazon, Bloomberg, Google, Grab, Intuit, Meta, Microsoft, Roku, Tiktok, Turing, Uber, Zepto

---
## Problem Description
You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array `days`. Each day is an integer from `1` to `365`.

Train tickets are sold in **three different ways**:
- a **1-day** pass is sold for `costs[0]` dollars,
- a **7-day** pass is sold for `costs[1]` dollars, and
- a **30-day** pass is sold for `costs[2]` dollars.

The passes allow that many days of consecutive travel.
- For example, if we get a **7-day** pass on day `2`, then we can travel for `7` days: `2`, `3`, `4`, `5`, `6`, `7`, and `8`.

Return *the minimum number of dollars you need to travel every day in the given list of days*.

**Constraints:**
- `1 <= days.length <= 365`
- `1 <= days[i] <= 365`
- `days` is in strictly increasing order.
- `costs.length == 3`
- `1 <= costs[i] <= 1000`

## Examples

```
Example 1:
  Input: days = [1,4,6,7,8,20], costs = [2,7,15]
  Output: 11
  Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
  On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
  On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
  On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
  In total, you spent $11 and covered all the days of your travel.
```

```
Example 2:
  Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
  Output: 17
  Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
  On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
  On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
  In total, you spent $17 and covered all the days of your travel.
```

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
