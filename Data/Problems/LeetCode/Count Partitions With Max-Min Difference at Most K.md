# 3578. Count Partitions With Max-Min Difference at Most K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k](https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k)
**Companies:** Amazon, Google, Meta, Microsoft

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

Given an array `nums` and an integer `k`, count the number of ways to partition `nums` into contiguous subarrays such that within each subarray, `max - min ≤ k`. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= k <= 10^9`

---

## Examples

**Example 1:**
- **Input:** `nums = [1, 3, 2, 4], k = 2`
- **Output:** `4`
- **Explanation:** Valid partitions: [1,3,2,4], [1,3,2|4], [1|3,2,4], [1|3,2|4].

---

## Key Insight

Use DP where `dp[i]` = number of ways to partition `nums[0..i-1]`. For position `i`, we need to find the leftmost `j` such that `max(nums[j..i-1]) - min(nums[j..i-1]) ≤ k`. Then `dp[i] = sum(dp[j..i])`. Use:
- **Monotonic deques** to track sliding window max and min efficiently
- **Prefix sums** of dp values for range sum queries

---

## Approach

```
FUNCTION countPartitions(nums, k):
    MOD = 10^9 + 7
    n = LENGTH(nums)
    dp = [0] * (n + 1)
    dp[0] = 1
    prefixDP = [0] * (n + 2)   // prefix sum of dp
    prefixDP[1] = 1

    maxDeque = deque()   // indices, decreasing values
    minDeque = deque()   // indices, increasing values
    left = 0

    FOR i ← 1 TO n DO
        // Maintain monotonic deques for nums[left..i-1]
        WHILE maxDeque not empty AND nums[maxDeque.back] <= nums[i-1]:
            maxDeque.popBack()
        maxDeque.pushBack(i-1)

        WHILE minDeque not empty AND nums[minDeque.back] >= nums[i-1]:
            minDeque.popBack()
        minDeque.pushBack(i-1)

        // Shrink window until max - min <= k
        WHILE nums[maxDeque.front] - nums[minDeque.front] > k:
            left += 1
            IF maxDeque.front < left: maxDeque.popFront()
            IF minDeque.front < left: minDeque.popFront()

        // dp[i] = sum of dp[left..i-1] = prefixDP[i] - prefixDP[left]
        dp[i] = (prefixDP[i] - prefixDP[left] + MOD) % MOD
        prefixDP[i+1] = (prefixDP[i] + dp[i]) % MOD

    RETURN dp[n]
```

---

## Walkthrough

**Input:** `nums = [1, 3, 2, 4], k = 2`

| i | window | max-min | left | dp[i] = sum(dp[left..i-1]) |
|---|---|---|---|---|
| 1 | [1] | 0 ≤ 2 | 0 | dp[0] = 1 |
| 2 | [1,3] | 2 ≤ 2 | 0 | dp[0]+dp[1] = 2 |
| 3 | [1,3,2] | 2 ≤ 2 | 0 | dp[0]+dp[1]+dp[2] = 4... |
| 4 | [1,3,2,4] → max-min=3 > 2, shrink left=1 → [3,2,4] | 2 ≤ 2 | 1 | dp[1]+dp[2]+dp[3] |

Final: dp[4] = **4** ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — each element enters/leaves deques once |
| **Space** | O(n) — dp array + deques |

---

## Follow-Up Questions

**Q1: Why monotonic deques instead of a segment tree?**
Deques give O(1) amortized for sliding window max/min, which is simpler and faster than O(log n) per query with a segment tree.

**Q2: Why prefix sums for the DP range?**
We need `sum(dp[left..i])` for each position. Prefix sums make this an O(1) query instead of iterating.

**Q3: What if k = 0?**
Each element must be in its own partition (unless consecutive elements are equal). The answer depends on groups of equal consecutive elements.

---

## Key Takeaway

> **Partition counting DP with a sliding-window constraint uses three tools together: DP for counting, monotonic deques for window max/min, and prefix sums for range DP sum queries — achieving O(n) total.**
