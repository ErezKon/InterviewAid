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

Given an integer array `nums` and integer `k`, starting at index 0, in each step you can jump at most `k` indices forward. Your score is the sum of `nums[i]` at every visited index. Return the **maximum score** to reach the last index.

**Constraints:**
- `1 <= nums.length, k <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`

---

## 2. Examples

```
Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7 (indices 0→3→5: 1+4+3 = 8... or 0→2→3→5 wait...)
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
