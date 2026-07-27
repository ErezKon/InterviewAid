# 983. Minimum Cost For Tickets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-for-tickets](https://leetcode.com/problems/minimum-cost-for-tickets)
**Companies:** Adobe, Amazon, Bloomberg, Google, Grab, Intuit, Meta, Microsoft, Roku, Tiktok, Turing, Uber, Zepto

---

## Key Insight

> `dp[d]` = min cost to cover travel through day `d`. On non-travel days, `dp[d] = dp[d-1]`. On travel days, choose the best among 1-day, 7-day, or 30-day passes.

---

## Approach: DP — O(max day) ✅

```
FUNCTION mincostTickets(days, costs):
    travelDays ← SET(days)
    lastDay ← days[-1]
    dp ← ARRAY(lastDay + 1, 0)

    FOR d ← 1 TO lastDay DO
        IF d NOT IN travelDays THEN
            dp[d] ← dp[d - 1]
        ELSE
            dp[d] ← MIN(
                dp[d - 1] + costs[0],
                dp[MAX(0, d - 7)] + costs[1],
                dp[MAX(0, d - 30)] + costs[2]
            )

    RETURN dp[lastDay]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP over days | **O(max day)** | **O(max day)** |

---

## Key Takeaway

> **Day-indexed DP with pass coverage** — on each travel day, compare buying a 1/7/30-day pass. Non-travel days inherit the previous day's cost.

---
