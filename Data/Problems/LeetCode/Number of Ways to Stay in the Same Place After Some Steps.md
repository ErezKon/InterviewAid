# 1269. Number of Ways to Stay in the Same Place After Some Steps

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps](https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(steps · min(steps, arrLen))](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have a pointer at index `0` in an array of size `arrLen`. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time).

Given two integers `steps` and `arrLen`, return the number of ways such that your pointer is still at index `0` after **exactly** `steps` steps. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= steps <= 500`
- `1 <= arrLen <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: steps = 3, arrLen = 2
Output: 4
Explanation: There are 4 differents ways to stay at index 0 after 3 steps.
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay
```

**Example 2:**
```
Input: steps = 2, arrLen = 4
Output: 2
Explanation: There are 2 differents ways to stay at index 0 after 2 steps
Right, Left
Stay, Stay
```

**Example 3:**
```
Input: steps = 4, arrLen = 2
Output: 8
```

---

## 3. Key Insight

> In `steps` moves you can never travel more than `steps/2` positions to the right, because you must return to index 0. Therefore the reachable position range is bounded by `min(arrLen, steps/2 + 1)`. This small bound enables a DP over positions.

---

## 4. Approach: DP — O(steps · min(steps, arrLen)) ✅

```text
FUNCTION numWays(steps, arrLen):
    MOD ← 1_000_000_007
    maxPos ← MIN(arrLen, steps / 2 + 1)
    dp ← ARRAY of size maxPos filled with 0
    dp[0] ← 1
    FOR s ← 1 TO steps:
        newDp ← ARRAY of size maxPos filled with 0
        FOR i ← 0 TO maxPos - 1:
            // stay at i
            newDp[i] ← (newDp[i] + dp[i]) MOD MOD
            // move from left neighbor
            IF i > 0:
                newDp[i] ← (newDp[i] + dp[i-1]) MOD MOD
            // move from right neighbor
            IF i < maxPos - 1:
                newDp[i] ← (newDp[i] + dp[i+1]) MOD MOD
        dp ← newDp
    RETURN dp[0]
```

---

## 5. Walkthrough

Consider `steps = 3`, `arrLen = 2`.

| s (step) | dp[0] | dp[1] |
|----------|-------|-------|
| 0 (init) | 1 | 0 |
| 1 | 1 (stay) | 1 (right) |
| 2 | 2 (stay-stay, right-left) | 2 (stay-right, right-stay) |
| 3 | 4 (stay-stay-stay, right-left-stay, stay-right-left, right-left-right) | 4 |

The answer after 3 steps is `dp[0] = 4`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(steps · min(steps, arrLen)) |
| **Space** | O(min(steps, arrLen)) |

---

## 7. Follow-Up Questions

1. How would you modify the DP if moves could only be left or right (no stay)?
2. Can the solution be optimized further using combinatorial formulas?
3. What changes are needed if the line is circular (wrap-around movement)?

---

## 8. Key Takeaway

> **Bound the state space.** By limiting positions to `steps/2`, DP becomes feasible even for large `arrLen`. Rolling arrays give O(min(steps, arrLen)) space.
