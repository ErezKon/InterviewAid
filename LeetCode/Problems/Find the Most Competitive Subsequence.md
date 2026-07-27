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

Given an integer array `nums` and integer `k`, return the **most competitive** subsequence of length `k`. A subsequence is more competitive if at the first differing position it has a smaller value.

**Constraints:**
- `1 <= k <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  nums = [3,5,2,6], k = 2
  Output: [2,6]
  Reason: Possible: [3,5],[3,2],[3,6],[5,2],[5,6],[2,6]. [2,6] is smallest.
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
