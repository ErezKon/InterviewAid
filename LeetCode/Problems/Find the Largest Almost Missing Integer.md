# 3471. Find the Largest Almost Missing Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-largest-almost-missing-integer](https://leetcode.com/problems/find-the-largest-almost-missing-integer)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Subarray Appearances — O(n) ✅](#3-approach-count-subarray-appearances--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION largestAlmostMissing(nums, k):
    n ← LENGTH(nums)
    IF k == n THEN
        // Only 1 subarray — all elements appear in exactly 1
        RETURN MAX(nums)

    result ← -1
    FOR each unique value v IN nums DO
        windowCount ← 0
        FOR each position p where nums[p] == v DO
            // v appears in windows [max(0, p-k+1)..min(n-k, p)]
            // Count distinct windows = min(n-k, p) - max(0, p-k+1) + 1
        // If total distinct windows == 1 → almost missing
        IF windowCount == 1 THEN
            result ← MAX(result, v)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — count windows per value |
| **Space** | O(n) — position tracking |

---

## 5. Key Takeaway

> Elements near boundaries appear in fewer windows. Count distinct window appearances per value and find the maximum with count exactly 1.
