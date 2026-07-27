# 3134. Find the Median of the Uniqueness Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-median-of-the-uniqueness-array](https://leetcode.com/problems/find-the-median-of-the-uniqueness-array)
**Companies:** Amazon, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search + Sliding Window — O(n log n) ✅](#3-approach-binary-search--sliding-window--on-log-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

The **uniqueness array** of `nums` is the sorted array of distinct-element counts for every subarray. Find its **median**.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= nums[i] <= 10⁵`

---

## 2. Key Insight

> Binary search on the answer `m`. For a given `m`, count how many subarrays have ≤ `m` distinct elements using a sliding window. If this count ≥ ⌈total/2⌉, then the median is ≤ `m`.

---

## 3. Approach: Binary Search + Sliding Window — O(n log n) ✅

```
FUNCTION medianOfUniquenessArray(nums):
    n ← LENGTH(nums)
    total ← n * (n + 1) / 2    // total subarrays
    target ← (total + 1) / 2   // median position

    lo ← 1; hi ← n
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        IF countSubarraysWithAtMost(nums, mid) >= target THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    RETURN lo

FUNCTION countSubarraysWithAtMost(nums, k):
    // Sliding window counting subarrays with ≤ k distinct elements
    left ← 0; count ← 0; freq ← {}
    FOR right ← 0 TO n - 1 DO
        freq[nums[right]] += 1
        WHILE DISTINCT(freq) > k DO
            freq[nums[left]] -= 1
            IF freq[nums[left]] == 0: DELETE freq[nums[left]]
            left += 1
        count += right - left + 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — log n binary search iterations × O(n) sliding window |
| **Space** | O(n) — frequency map |

---

## 5. Key Takeaway

> **Binary search on median value + sliding window count** is a powerful combination. The monotonicity of "count of subarrays with ≤ k distinct elements" enables binary search.
