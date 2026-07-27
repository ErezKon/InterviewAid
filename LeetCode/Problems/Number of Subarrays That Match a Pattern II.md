# 3036. Number of Subarrays That Match a Pattern II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii)
**Companies:** Autodesk, Thoughtworks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: KMP / Z-Algorithm — O(n + m)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Pattern I but with larger constraints requiring O(n + m) solution.

---

## 2. Key Insight

> Convert `nums` to a difference-sign array. Then pattern matching becomes string matching → use KMP or Z-algorithm.

---

## 3. Approach: KMP / Z-Algorithm — O(n + m) ✅

```
FUNCTION countMatchingSubarrays(nums, pattern):
    // Convert nums to sign array: sign(nums[i+1] - nums[i])
    text = [sign(nums[i+1] - nums[i]) for i in range(len(nums)-1)]

    // KMP search for pattern in text
    // Build failure function for pattern
    // Scan text, count matches
    RETURN kmpCount(text, pattern)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + m) |
| **Space** | O(m) for failure function |

---

## 5. Key Takeaway

> **Reduce to string matching on the difference-sign array.** KMP or Z-algorithm gives linear time. Classic reduction from subarray pattern to string matching.
