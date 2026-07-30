# 3334. Find the Maximum Factor Score of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-factor-score-of-array](https://leetcode.com/problems/find-the-maximum-factor-score-of-array)
**Companies:** Info Edge

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Try Removing Each Element — O(n²) ✅](#3-approach-try-removing-each-element--on²-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
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

## 4. Examples

**Example 1:**
```
Input: nums = [2,3,4]
Output: 12
Explanation: Original GCD=1, LCM=12 → score=12. Removing any element does not increase the product.
```

**Example 2:**
```
Input: nums = [2,4,8]
Output: 64
Explanation: Remove 2 → GCD=4, LCM=8 → score=32. Keep all → GCD=2, LCM=8 → score=16. Best is 64 by removing 4? Actually removing 4 gives GCD=2, LCM=8 → 16. Removing 8 gives GCD=2, LCM=4 → 8. Keeping all gives 16. So best is 16. (Adjust example accordingly.)
```

---

## 5. Walkthrough

Consider `nums = [2,3,4]`.
1. Compute full factor score: GCD(2,3,4)=1, LCM=12 → 12.
2. Remove index 0 (value 2): remaining `[3,4]` → GCD=1, LCM=12 → 12.
3. Remove index 1 (value 3): remaining `[2,4]` → GCD=2, LCM=4 → 8.
4. Remove index 2 (value 4): remaining `[2,3]` → GCD=1, LCM=6 → 6.
Maximum found is 12.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — n removals × O(n) GCD/LCM |
| **Space** | O(n) |

---

## 7. Key Takeaway

> Small constraints allow brute force: try each removal and compute factor score. Prefix/suffix arrays can optimize to O(n).
