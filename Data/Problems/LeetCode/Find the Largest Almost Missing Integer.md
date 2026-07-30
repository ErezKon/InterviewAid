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

Given an array `nums` and integer `k`, a number is "almost missing" if it appears in exactly one subarray of size `k` among all subarrays of size `k`. Return the largest such number, or -1 if none exists.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= k <= nums.length`
- `0 <= nums[i] <= 50`

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

```text
Input: nums = [1,2,2,3,1], k = 2
Output: 3
Explanation: Subarrays of size 2 are [1,2], [2,2], [2,3], [3,1].
Number 3 appears only in the subarray [2,3], so it is almost missing and is the largest such number.
```

```text
Input: nums = [0,0,0], k = 1
Output: -1
Explanation: Every number appears in every possible subarray of size 1.
```

---

## 5. Walkthrough

Consider `nums = [1,2,2,3,1]` and `k = 2`.

| Step | Position | Value | Windows covering position | Window count per value |
|------|----------|-------|---------------------------|------------------------|
| 1    | 0        | 1     | [0‑1]                     | 1 (so far)             |
| 2    | 1        | 2     | [0‑1], [1‑2]              | 2                      |
| 3    | 2        | 2     | [1‑2], [2‑3]              | 2 (unchanged)          |
| 4    | 3        | 3     | [2‑3], [3‑4]              | 1 (so far)             |
| 5    | 4        | 1     | [3‑4]                     | 2 total for 1          |

After processing all positions, only value `3` has a window count of `1`. Hence the result is `3`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — count windows per value |
| **Space** | O(n) — position tracking |

---

## 7. Follow-Up Questions

- How would the solution change if we needed the smallest almost‑missing integer?
- Can the algorithm be adapted for a sliding‑window of variable size?
- What if the array length were up to 10⁵? Discuss optimizations.

---

## 8. Key Takeaway

> Elements near boundaries appear in fewer windows. Count distinct window appearances per value and find the maximum with count exactly 1.
