# 3334. Find the Maximum Factor Score of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-factor-score-of-array](https://leetcode.com/problems/find-the-maximum-factor-score-of-array)
**Companies:** Info Edge

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Try Removing Each Element — O(n²) ✅](#3-approach-try-removing-each-element--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, the **factor score** is `GCD(nums) × LCM(nums)`. You may remove at most one element to maximize the factor score. Return the maximum.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 30`

---

## 2. Key Insight

> With n ≤ 100, try keeping all elements and try removing each element one at a time. Compute GCD and LCM of the remaining array. Use prefix/suffix GCD and LCM for O(n) per removal.

---

## 3. Approach: Try Removing Each Element — O(n²) ✅

```
FUNCTION maxScore(nums):
    best ← factorScore(nums)
    FOR i ← 0 TO n - 1 DO
        remaining ← nums without element i
        best ← MAX(best, factorScore(remaining))
    RETURN best

FUNCTION factorScore(arr):
    g ← GCD of all elements in arr
    l ← LCM of all elements in arr
    RETURN g * l
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — n removals × O(n) GCD/LCM |
| **Space** | O(n) |

---

## 5. Key Takeaway

> Small constraints allow brute force: try each removal and compute factor score. Prefix/suffix arrays can optimize to O(n).
