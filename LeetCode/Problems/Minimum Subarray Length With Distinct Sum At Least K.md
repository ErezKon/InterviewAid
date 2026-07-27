# 3795. Minimum Subarray Length With Distinct Sum At Least K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-subarray-length-with-distinct-sum-at-least-k](https://leetcode.com/problems/minimum-subarray-length-with-distinct-sum-at-least-k)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n)](#3-approach-sliding-window--on)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and integer `k`, find the **minimum** length subarray where the sum of **distinct** elements is at least `k`. Return `-1` if none exists.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i], k <= 10⁹`

---

## 2. Key Insight

> Use a **sliding window** with a frequency map. Track the "distinct sum" — the sum where each unique value is counted once regardless of frequency. Shrink from the left when the distinct sum ≥ k.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION minSubarrayDistinctSum(nums, k):
    freq = {}
    distinctSum = 0
    left = 0
    minLen = infinity

    FOR right ← 0 TO n - 1:
        IF nums[right] NOT IN freq OR freq[nums[right]] == 0:
            distinctSum += nums[right]
        freq[nums[right]] = freq.get(nums[right], 0) + 1

        WHILE distinctSum >= k:
            minLen = MIN(minLen, right - left + 1)
            freq[nums[left]] -= 1
            IF freq[nums[left]] == 0:
                distinctSum -= nums[left]
            left += 1

    RETURN minLen IF minLen != infinity ELSE -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element added/removed once |
| **Space** | O(n) — frequency map |

---

## 5. Key Takeaway

> **Sliding window with distinct-value tracking** — maintain a frequency map and a running distinct sum. Add a value to the sum only on first occurrence in the window; remove it only when its count drops to zero.
