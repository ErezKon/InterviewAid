# 1696. Jump Game VI

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-vi](https://leetcode.com/problems/jump-game-vi)
**Companies:** Amazon, Aqr Capital Management, Google, Meta, Microsoft, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP + Monotonic Deque — O(n) ✅](#4-approach-dp--monotonic-deque--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums` and an integer `k`.

You are initially standing at index `0`. In one move, you can jump at most `k` steps forward without going outside the boundaries of the array. That is, you can jump from index `i` to any index in the range `[i + 1, min(n - 1, i + k)]` **inclusive**.

You want to reach the last index of the array (index `n - 1`). Your **score** is the **sum** of all `nums[j]` for each index `j` you visited in the array.

Return *the **maximum score** you can get*.

**Constraints:**
- `1 <= nums.length, k <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7
Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] (underlined above). The sum is 7.
```

**Example 2:**
```
Input: nums = [10,-5,-2,4,0,3], k = 3
Output: 17
Explanation: You can choose your jumps forming the subsequence [10,4,3] (underlined above). The sum is 17.
```

**Example 3:**
```
Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
Output: 0
```

---

## 3. Key Insight

`dp[i] = nums[i] + max(dp[i-k..i-1])`. Finding the max in a sliding window of size k is done efficiently with a **monotonic deque** (decreasing), giving O(1) amortized per element.

---

## 4. Approach: DP + Monotonic Deque — O(n) ✅

```
FUNCTION maxResult(nums, k):
    deque = Deque()    // indices, decreasing dp values
    dp = [0] * n
    dp[0] = nums[0]
    deque.PUSH_BACK(0)

    FOR i ← 1 TO n - 1:
        // Remove out-of-window indices
        WHILE deque AND deque[0] < i - k:
            deque.POP_FRONT()

        dp[i] = nums[i] + dp[deque[0]]

        // Maintain decreasing order
        WHILE deque AND dp[deque[-1]] <= dp[i]:
            deque.POP_BACK()
        deque.PUSH_BACK(i)

    RETURN dp[n-1]
```

---

## 5. Walkthrough

```
nums = [1, -1, -2, 4, -7, 3], k = 2
```

| i | nums[i] | deque front (best dp) | dp[i] | deque after |
|---|---------|----------------------|-------|-------------|
| 0 | 1 | — | 1 | [0] |
| 1 | -1 | dp[0]=1 | 0 | [0, 1] |
| 2 | -2 | dp[0]=1 | -1 | [0, 1, 2] → remove 0 if out | 
| 3 | 4 | dp[1]=0 or dp[2]=-1 → 0 | 4 | [3] |
| 4 | -7 | dp[3]=4 | -3 | [3, 4] |
| 5 | 3 | dp[3]=4 or dp[4]=-3 → 4 | 7 | [5] |

**Result:** `dp[5] = 7` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index pushed/popped from deque at most once |
| Space | O(n) | DP array + deque |

---

## 7. Key Takeaway

> **Sliding window maximum** via monotonic deque is the key pattern. `dp[i] = nums[i] + max(dp[i-k..i-1])` with deque gives O(n). This pattern recurs in many "jump with window" DP problems.
