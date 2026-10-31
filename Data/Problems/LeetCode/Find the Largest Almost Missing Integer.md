# 3471. Find the Largest Almost Missing Integer

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/find-the-largest-almost-missing-integer
**Companies:** Bloomberg, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Subarray Appearances — O(n) ✅](#3-approach-count-subarray-appearances--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` and an integer `k`.

An integer `x` is **almost missing** from `nums` if `x` appears in *exactly* one subarray of size `k` within `nums`.

Return the **largest almost missing** integer from `nums`. If no such integer exists, return `-1`.

A **subarray** is a contiguous sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 50`
- `0 <= nums[i] <= 50`
- `1 <= k <= nums.length`

---

## 2. Key Insight

> A number appears in a subarray `[i, i+k-1]` if any of its positions fall in that range. Count how many distinct windows each value appears in. If exactly 1, it's "almost missing." This happens only for elements near the boundaries (first or last k positions).

---

## 3. Approach: Count Subarray Appearances — O(n) ✅

```text
FUNCTION largestAlmostMissing(nums, k):
    n ← LENGTH(nums)
    IF k == n THEN
        RETURN MAX(nums)
    result ← -1
    FOR each unique value v IN nums DO
        windowCount ← 0
        FOR each position p where nums[p] == v DO
            // windows where v appears: [max(0, p-k+1) .. min(n-k, p)]
            start ← MAX(0, p - k + 1)
            end   ← MIN(n - k, p)
            windowCount ← windowCount + (end - start + 1)
        IF windowCount == 1 THEN
            result ← MAX(result, v)
    RETURN result
```

---

## 4. Examples

```
Example 1:
  Input: nums = [3,9,2,1,7], k = 3
  Output: 7
  Explanation:
    - 1 appears in 2 subarrays of size 3: [9, 2, 1] and [2, 1, 7].
    - 2 appears in 3 subarrays of size 3: [3, 9, 2], [9, 2, 1], [2, 1, 7].
    - 3 appears in 1 subarray of size 3: [3, 9, 2].
    - 7 appears in 1 subarray of size 3: [2, 1, 7].
    - 9 appears in 2 subarrays of size 3: [3, 9, 2], and [9, 2, 1].
  We return 7 since it is the largest integer that appears in exactly one subarray of size k.

Example 2:
  Input: nums = [3,9,7,2,1,7], k = 4
  Output: 3
  Explanation:
    - 1 appears in 2 subarrays of size 4: [9, 7, 2, 1], [7, 2, 1, 7].
    - 2 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
    - 3 appears in 1 subarray of size 4: [3, 9, 7, 2].
    - 7 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
    - 9 appears in 2 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1].
  We return 3 since it is the largest and only integer that appears in exactly one subarray of size k.

Example 3:
  Input: nums = [0,0], k = 1
  Output: -1
  Explanation: There is no integer that appears in only one subarray of size 1.
```

---

## 5. Walkthrough

Consider `nums = [1,2,2,3,1]` and `k = 2`.

| Step | Position | Value | Windows covering position | Window count per value |
|------|----------|-------|---------------------------|------------------------|
| 1    | 0        | 1     | [0-1]                     | 1 (so far)             |
| 2    | 1        | 2     | [0-1], [1-2]              | 2                      |
| 3    | 2        | 2     | [1-2], [2-3]              | 2 (unchanged)          |
| 4    | 3        | 3     | [2-3], [3-4]              | 1 (so far)             |
| 5    | 4        | 1     | [3-4]                     | 2 total for 1          |

After processing all positions, only value `3` has a window count of `1`. Hence the result is `3`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — count windows per value |
| **Space** | O(n) — position tracking |

---

## 7. Follow-Up Questions

- How would the solution change if we needed the smallest almost-missing integer?
- Can the algorithm be adapted for a sliding-window of variable size?
- What if the array length were up to 10⁵? Discuss optimizations.

---

## 8. Key Takeaway

> Elements near boundaries appear in fewer windows. Count distinct window appearances per value and find the maximum with count exactly 1.
