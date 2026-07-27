# 3660. Jump Game IX

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-ix](https://leetcode.com/problems/jump-game-ix)
**Companies:** Amazon, Bloomberg, Google, Medianet

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Monotonic Stack — O(n) ✅](#3-approach-dp--monotonic-stack--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

From index `i`, you can jump to the **next greater element** (cost `costs[0]`) or the **next smaller or equal element** (cost `costs[1]`). Find the minimum cost to reach the last index from index 0.

---

## 2. Key Insight

Use a **monotonic stack** to efficiently find the next greater and next smaller/equal elements for each index. Then build a DP where `dp[i]` = min cost to reach index `i`.

---

## 3. Approach: DP + Monotonic Stack — O(n) ✅

```
FUNCTION minCost(nums, costs):
    n = len(nums)
    dp = [INF] * n
    dp[0] = 0

    // Monotonic stack for next greater element
    stack1 = []   // decreasing stack
    // Monotonic stack for next smaller/equal element
    stack2 = []   // increasing stack

    FOR i ← 0 TO n - 1:
        WHILE stack1 AND nums[stack1[-1]] < nums[i]:
            dp[i] = MIN(dp[i], dp[stack1.POP()] + costs[0])
        stack1.PUSH(i)

        WHILE stack2 AND nums[stack2[-1]] >= nums[i]:
            dp[i] = MIN(dp[i], dp[stack2.POP()] + costs[1])
        stack2.PUSH(i)

    RETURN dp[n - 1]
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each element pushed/popped at most once per stack |
| Space | O(n) | Two stacks + DP array |

---

## 5. Key Takeaway

> Monotonic stacks turn "next greater/smaller" lookups into amortized O(1), enabling linear DP for jump game variants with next-element-based transitions.
