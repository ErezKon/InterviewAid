# 2297. Jump Game VIII

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-viii](https://leetcode.com/problems/jump-game-viii)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Monotonic Stack — O(n) ✅](#3-approach-dp--monotonic-stack--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and a `costs` array, from index `i` you can jump to specific indices `j > i` based on monotonic conditions (next greater, next smaller). Each jump costs `costs[j]`. Find the minimum cost to reach the last index.

---

## 2. Key Insight

Similar to Jump Game IX — use **monotonic stacks** to precompute which indices can be jumped to from each position. Then DP forward with `dp[i] = min cost to reach i`.

---

## 3. Approach: DP + Monotonic Stack — O(n) ✅

```
FUNCTION minCost(nums, costs):
    n = len(nums)
    dp = [INF] * n
    dp[0] = 0

    // Build edges via monotonic stacks
    // Stack for next greater or equal
    stack1 = []
    // Stack for next smaller
    stack2 = []

    FOR i ← 0 TO n - 1:
        WHILE stack1 AND nums[stack1[-1]] <= nums[i]:
            j = stack1.POP()
            dp[i] = MIN(dp[i], dp[j] + costs[i])
        stack1.PUSH(i)

        WHILE stack2 AND nums[stack2[-1]] > nums[i]:
            j = stack2.POP()
            dp[i] = MIN(dp[i], dp[j] + costs[i])
        stack2.PUSH(i)

    RETURN dp[n - 1]
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index pushed/popped once per stack |
| Space | O(n) | Stacks + DP array |

---

## 5. Key Takeaway

> Jump Game VIII follows the same monotonic stack + DP pattern as Jump Game IX. The key is identifying which transitions are allowed and using stacks to find them in O(1) amortized.
