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

```text
FUNCTION minCost(nums, costs):
    n ← LENGTH(nums)
    dp ← ARRAY of size n filled with INF
    dp[0] ← 0
    stackGreater ← []
    stackSmaller ← []
    FOR i ← 0 TO n - 1:
        WHILE stackGreater NOT EMPTY AND nums[stackGreater[-1]] <= nums[i]:
            j ← POP(stackGreater)
            dp[i] ← MIN(dp[i], dp[j] + costs[i])
        PUSH(stackGreater, i)
        WHILE stackSmaller NOT EMPTY AND nums[stackSmaller[-1]] > nums[i]:
            j ← POP(stackSmaller)
            dp[i] ← MIN(dp[i], dp[j] + costs[i])
        PUSH(stackSmaller, i)
    RETURN dp[n - 1]
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index pushed/popped once per stack |
| Space | O(n) | Stacks + DP array |

---

## 5. Examples

| nums | costs | Minimum Cost |
|------|-------|--------------|
| [1,3,2,4] | [0,2,1,3] | 4 |
| [5,1,2,3] | [0,5,2,1] | 3 |

*Explanation*: In the first example, optimal jumps are 0→1 (cost 2) then 1→3 (cost 3) totaling 4.

---

## 6. Walkthrough

**Example 1**: `nums = [1,3,2,4]`, `costs = [0,2,1,3]`

| i | dp[i] before | Stack Greater | Stack Smaller | dp[i] after |
|---|--------------|--------------|--------------|------------|
| 0 | INF → 0 | [0] | [0] | 0 |
| 1 | INF | pop 0 (1 ≤ 3) → dp[1]=0+2=2 | pop 0 (1 > 3? no) | 2 |
| 2 | INF | push 1 | pop 1 (3 > 2) → dp[2]=2+1=3 | 3 |
| 3 | INF | pop 2 (2 ≤ 4) → dp[3]=3+3=6, pop 1 (3 ≤ 4) → dp[3]=MIN(6,2+3)=5 | pop 2 (2 > 4? no) | 5 |

Result `dp[3] = 5` (minimum cost).

---

## 7. Follow-Up Questions

1. How would you modify the solution if jumps could also move backwards?
2. Can you extend the approach to handle multiple cost arrays for different jump types?
3. What changes are needed if the monotonic condition is based on absolute differences instead of greater/lesser?

---

## 8. Key Takeaway

> Jump Game VIII follows the same monotonic stack + DP pattern as Jump Game IX. The key is identifying which transitions are allowed and using stacks to find them in O(1) amortized.
