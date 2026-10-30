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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a **0-indexed** integer array `nums` of length `n`. You are initially standing at index `0`. You can jump from index `i` to index `j` where `i < j` if:

- `nums[i] <= nums[j]` and `nums[k] < nums[i]` for all indexes `k` in the range `i < k < j`, or
- `nums[i] > nums[j]` and `nums[k] >= nums[i]` for all indexes `k` in the range `i < k < j`.

You are also given an integer array `costs` of length `n` where `costs[i]` denotes the cost of jumping **to** index `i`.

Return *the **minimum** cost to jump to the index *`n - 1`.

**Constraints:**
- `n == nums.length == costs.length`
- `1 <= n <= 10^5`
- `0 <= nums[i], costs[i] <= 10^5`

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

**Example 1:**
```
Input: nums = [3,2,4,4,1], costs = [3,7,6,4,2]
Output: 8
Explanation: You start at index 0.
- Jump to index 2 with a cost of costs[2] = 6.
- Jump to index 4 with a cost of costs[4] = 2.
The total cost is 8. It can be proven that 8 is the minimum cost needed.
Two other possible paths are from index 0 -> 1 -> 4 and index 0 -> 2 -> 3 -> 4.
These have a total cost of 9 and 12, respectively.
```

**Example 2:**
```
Input: nums = [0,1,2], costs = [1,1,1]
Output: 2
Explanation: Start at index 0.
- Jump to index 1 with a cost of costs[1] = 1.
- Jump to index 2 with a cost of costs[2] = 1.
The total cost is 2. Note that you cannot jump directly from index 0 to index 2 because nums[0] <= nums[1].
```

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
