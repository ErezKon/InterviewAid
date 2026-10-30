# 746. Min Cost Climbing Stairs

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/min-cost-climbing-stairs](https://leetcode.com/problems/min-cost-climbing-stairs)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Squarepoint Capital, Tcs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `cost` where `cost[i]` is the cost of `i^th` step on a staircase.

Once you pay the cost, you can either climb **one** or **two** steps.

You can either start from the step with index 0, or the step with index 1.

Return the **minimum** cost to reach the top of the staircase, which is the position just past the last step (index `cost.length`).

**Constraints:**
- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

---

## Examples

**Example 1:**
```
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2:**
```
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

---

## Key Insight

> `dp[i] = cost[i] + min(dp[i-1], dp[i-2])` — the minimum cost to reach step `i`. Since we can step past the last stair, the answer is `min(dp[n-1], dp[n-2])`. Only two previous values are needed → O(1) space.

---

## Approach: DP — O(n), O(1) ✅

```
FUNCTION minCostClimbingStairs(cost):
    a ← cost[0]
    b ← cost[1]

    FOR i ← 2 TO n - 1 DO
        curr ← cost[i] + MIN(a, b)
        a ← b
        b ← curr

    RETURN MIN(a, b)
```

---

## Walkthrough

```
cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]

a=1, b=100
i=2: curr = 1+MIN(1,100) = 2.     a=100, b=2
i=3: curr = 1+MIN(100,2) = 3.     a=2,   b=3
i=4: curr = 1+MIN(2,3)   = 3.     a=3,   b=3
i=5: curr = 100+MIN(3,3) = 103.   a=3,   b=103
i=6: curr = 1+MIN(3,103) = 4.     a=103, b=4
i=7: curr = 1+MIN(103,4) = 5.     a=4,   b=5
i=8: curr = 100+MIN(4,5) = 104.   a=5,   b=104
i=9: curr = 1+MIN(5,104) = 6.     a=104, b=6

Return MIN(104, 6) = 6 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP with 2 variables | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why MIN(a, b) at the end?** We can reach the top from either of the last two steps.
2. **How does this relate to Climbing Stairs?** Same recurrence, but Climbing Stairs counts ways while this minimizes cost.
3. **What about House Robber?** Similar "skip or take" pattern with two rolling variables.

---

## Key Takeaway

> Same structure as Climbing Stairs / House Robber — only need the last two values. `dp[i] = cost[i] + min(dp[i-1], dp[i-2])`.

---
