# 198. House Robber

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/house-robber](https://leetcode.com/problems/house-robber)
**Companies:** Accenture, Adobe, Agoda, Airbnb, Amazon, Anduril, Apple, Bloomberg, Bytedance, Cars24, Cisco, Databricks, Datadog, De Shaw, Envoy, Epam Systems, Expedia, Flipkart, Goldman Sachs, Google, Grab, Gusto, Infosys, Intuit, Linkedin, Makemytrip, Meta, Microsoft, Nvidia, Oracle, Paypal, Phonepe, Tcs, Tiktok, Uber, Walmart Labs, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: DP Array — O(n)](#3-approach-1-dp-array--on)
4. [Approach 2: Space-Optimized DP — O(n) ✅](#4-approach-2-space-optimized-dp--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected — **if two adjacent houses are broken into on the same night, the police will be alerted**.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount you can rob **without alerting the police**.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,3,1]
  Output: 4
  Reason: Rob house 0 (1) + house 2 (3) = 4

Example 2:
  Input:  nums = [2,7,9,3,1]
  Output: 12
  Reason: Rob house 0 (2) + house 2 (9) + house 4 (1) = 12
```

---

## 3. Approach 1: DP Array — O(n)

### Recurrence

`dp[i]` = maximum money robbable from houses `0..i`.

At each house `i`, we either:
- **Skip** it: `dp[i] = dp[i-1]`
- **Rob** it: `dp[i] = dp[i-2] + nums[i]`

```
dp[i] = MAX(dp[i-1], dp[i-2] + nums[i])
```

```
FUNCTION rob(nums):
    n = len(nums)
    IF n == 1: RETURN nums[0]

    dp = array of size n
    dp[0] = nums[0]
    dp[1] = MAX(nums[0], nums[1])

    FOR i ← 2 TO n - 1:
        dp[i] = MAX(dp[i-1], dp[i-2] + nums[i])

    RETURN dp[n-1]
```

---

## 4. Approach 2: Space-Optimized DP — O(n) ✅

We only need the previous two values, so use two variables instead of an array.

```
FUNCTION rob(nums):
    prev2 = 0       // dp[i-2]
    prev1 = 0       // dp[i-1]

    FOR num IN nums:
        current = MAX(prev1, prev2 + num)
        prev2 = prev1
        prev1 = current

    RETURN prev1
```

---

## 5. Walkthrough

```
nums = [2, 7, 9, 3, 1]

prev2=0, prev1=0

num=2: current = MAX(0, 0+2) = 2,  prev2=0, prev1=2
num=7: current = MAX(2, 0+7) = 7,  prev2=2, prev1=7
num=9: current = MAX(7, 2+9) = 11, prev2=7, prev1=11
num=3: current = MAX(11, 7+3) = 11, prev2=11, prev1=11  (skip house 3)
       Wait: MAX(11, 7+3) = MAX(11,10) = 11
num=1: current = MAX(11, 11+1) = 12, prev2=11, prev1=12

Result: 12 ✅ (rob houses 0, 2, 4 → 2+9+1=12)
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP Array | O(n) | O(n) |
| **Optimized** | **O(n)** | **O(1)** |

---

## 7. Follow-Up Questions

### 7.1 House Robber II (LeetCode #213)

Houses are arranged in a **circle** (first and last are adjacent). Run the algorithm twice: once excluding the first house, once excluding the last. Return the max of both.

```
FUNCTION rob2(nums):
    IF len(nums) == 1: RETURN nums[0]
    RETURN MAX(rob(nums[0..n-2]), rob(nums[1..n-1]))
```

### 7.2 House Robber III (LeetCode #337)

Houses form a **binary tree**. Use DFS returning `(rob_this_node, skip_this_node)` for each node.

```
FUNCTION rob3(root):
    (rob, skip) = dfs(root)
    RETURN MAX(rob, skip)

FUNCTION dfs(node):
    IF node == null: RETURN (0, 0)
    (leftRob, leftSkip) = dfs(node.left)
    (rightRob, rightSkip) = dfs(node.right)

    rob = node.val + leftSkip + rightSkip
    skip = MAX(leftRob, leftSkip) + MAX(rightRob, rightSkip)
    RETURN (rob, skip)
```

### 7.3 Delete and Earn (LeetCode #740)

Reduce to House Robber: group by value, compute total points for each value. Adjacent values can't both be chosen → same DP.

### 7.4 Maximum sum of non-adjacent elements (general)?

This IS the House Robber problem. It's the fundamental "no two adjacent" DP pattern.

---

## Key Takeaway

> House Robber introduces the **"take or skip" DP pattern** with adjacency constraints. The recurrence `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` appears in many problems. Space optimization from O(n) to O(1) by keeping only the last two states is a standard technique.
