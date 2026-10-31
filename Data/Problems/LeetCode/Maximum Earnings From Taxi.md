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
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` points on a road you are driving your taxi on. The `n` points on the road are labeled from `1` to `n` in the direction you are going, and you want to drive from point `1` to point `n` to make money by picking up passengers. You cannot change the direction of the taxi.

The passengers are represented by a **0-indexed** 2D integer array `rides`, where `rides[i] = [start_i, end_i, tip_i]` denotes the `i^th` passenger requesting a ride from point `start_i` to point `end_i` who is willing to give a `tip_i` dollar tip.

For** each **passenger `i` you pick up, you **earn** `end_i - start_i + tip_i` dollars. You may only drive **at most one **passenger at a time.

Given `n` and `rides`, return *the **maximum** number of dollars you can earn by picking up the passengers optimally.*

**Note:** You may drop off a passenger and pick up a different passenger at the same point.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= rides.length <= 3 * 10^4`
- `rides[i].length == 3`
- `1 <= start_i < end_i <= n`
- `1 <= tip_i <= 10^5`

---

## Key Insight

> Group rides by end position. `dp[pos]` = max earnings up to position `pos`. At each position, either skip (dp[pos-1]) or take a ride ending here (dp[start] + profit).

---

## Approach: DP + Sort — O(n + m) ✅

```text
FUNCTION maxTaxiEarnings(n, rides):
    ridesByEnd ← GROUP rides BY end
    dp ← ARRAY[0..n] INITIALIZED TO 0

    FOR pos ← 1 TO n:
        dp[pos] ← dp[pos - 1]
        FOR [start, end, tip] IN ridesByEnd[pos]:
            profit ← end - start + tip
            dp[pos] ← MAX(dp[pos], dp[start] + profit)

    RETURN dp[n]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n + m)** | O(n) |

---

## Examples

**Example 1:**
```
Input: n = 5, rides = [[2,5,4],[1,5,1]]
Output: 7
Explanation: We can pick up passenger 0 to earn 5 - 2 + 4 = 7 dollars.
```

**Example 2:**
```
Input: n = 20, rides = [[1,6,1],[3,10,2],[10,12,3],[11,12,2],[12,15,2],[13,18,1]]
Output: 20
Explanation: We will pick up the following passengers:
- Drive passenger 1 from point 3 to point 10 for a profit of 10 - 3 + 2 = 9 dollars.
- Drive passenger 2 from point 10 to point 12 for a profit of 12 - 10 + 3 = 5 dollars.
- Drive passenger 5 from point 13 to point 18 for a profit of 18 - 13 + 1 = 6 dollars.
We earn 9 + 5 + 6 = 20 dollars in total.
```

---

## Walkthrough

Consider `n = 7` and rides `[[2,5,4],[1,5,1],[5,7,2]]`.

1. Group by end:
   - end 5: `[[2,5,4],[1,5,1]]`
   - end 7: `[[5,7,2]]`
2. Iterate positions:
   - pos=1: dp[1]=0
   - pos=2: dp[2]=0
   - pos=3: dp[3]=0
   - pos=4: dp[4]=0
   - pos=5: dp[5]=MAX(dp[4]=0, dp[2]+7=7, dp[1]+6=6) → 7
   - pos=6: dp[6]=dp[5]=7
   - pos=7: dp[7]=MAX(dp[6]=7, dp[5]+(7-5+2)=7+4=11) → 11 (but ride profit is 4, so total 11)
   Final dp[7]=11, but actual optimal earnings are 9 (taking rides `[2,5,4]` and `[5,7,2]`). Adjusting DP to ensure non-overlap yields 9.

---

## Follow-Up Questions

- How would you modify the algorithm if rides could share endpoints?
- Can you solve the problem using a greedy interval-scheduling approach?
- What changes are needed if the road is circular rather than linear?

---

## Key Takeaway

> **Weighted job scheduling on discrete positions: DP[pos] = max(skip, best ride ending here).** Group rides by endpoint for efficient lookup.
