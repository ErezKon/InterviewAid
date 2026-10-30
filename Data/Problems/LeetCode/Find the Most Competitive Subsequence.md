# 1673. Find the Most Competitive Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-most-competitive-subsequence](https://leetcode.com/problems/find-the-most-competitive-subsequence)
**Companies:** Google, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Monotonic Stack — O(n) ✅](#4-approach-monotonic-stack--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and a positive integer `k`, return *the most **competitive** subsequence of* `nums` *of size* `k`.

An array's subsequence is a resulting sequence obtained by erasing some (possibly zero) elements from the array.

We define that a subsequence `a` is more **competitive** than a subsequence `b` (of the same length) if in the first position where `a` and `b` differ, subsequence `a` has a number **less** than the corresponding number in `b`. For example, `[1,3,4]` is more competitive than `[1,3,5]` because the first position they differ is at the final number, and `4` is less than `5`.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input: nums = [3,5,2,6], k = 2
  Output: [2,6]
  Explanation: Among the set of every possible subsequence: {[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]},
  [2,6] is the most competitive.

Example 2:
  Input: nums = [2,4,3,3,5,4,9,6], k = 4
  Output: [2,3,3,4]
```

---

## 3. Key Insight

> Use a monotonic stack (like finding the smallest subsequence). Pop the top when the current element is smaller AND there are enough remaining elements to fill k slots.

---

## 4. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION mostCompetitive(nums, k):
    stack ← []
    n ← LENGTH(nums)
    FOR i ← 0 TO n - 1 DO
        WHILE stack NOT EMPTY AND nums[i] < stack.TOP()
              AND LENGTH(stack) + (n - i) > k DO
            stack.POP()
        IF LENGTH(stack) < k THEN
            stack.PUSH(nums[i])
    RETURN stack
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each element pushed/popped at most once |
| **Space** | O(k) — stack |

---

## 6. Key Takeaway

> **Monotonic stack with remaining-count guard** — pop when a smaller element comes and enough elements remain. Same pattern as "Remove K Digits" and "Smallest Subsequence."
