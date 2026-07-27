# 2008. Maximum Earnings From Taxi

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-earnings-from-taxi](https://leetcode.com/problems/maximum-earnings-from-taxi)
**Companies:** Coindcx, Meta, Myntra, Oracle, Salesforce, Uber, Waymo, Wells Fargo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP + Sort — O(n + m)](#approach-dp--sort--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A taxi driver picks up passengers on a number line from 1 to n. Each ride `[start, end, tip]` earns `end - start + tip`. Rides can't overlap. Maximize total earnings.

---

## Key Insight

> Group rides by end position. `dp[pos]` = max earnings up to position `pos`. At each position, either skip (dp[pos-1]) or take a ride ending here (dp[start] + profit).

---

## Approach: DP + Sort — O(n + m) ✅

```
FUNCTION maxTaxiEarnings(n, rides):
    ridesByEnd = group rides by end
    dp = [0] * (n + 1)

    FOR pos ← 1 TO n:
        dp[pos] = dp[pos - 1]
        FOR [start, end, tip] IN ridesByEnd[pos]:
            profit = end - start + tip
            dp[pos] = MAX(dp[pos], dp[start] + profit)

    RETURN dp[n]
```

Same pattern as Maximum Profit in Job Scheduling (#1235) but simpler with discrete positions.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n + m)** | O(n) |

---

## Key Takeaway

> **Weighted job scheduling on discrete positions: DP[pos] = max(skip, best ride ending here).** Group rides by endpoint for efficient lookup.
