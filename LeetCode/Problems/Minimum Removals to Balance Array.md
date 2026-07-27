# 3634. Minimum Removals to Balance Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-removals-to-balance-array](https://leetcode.com/problems/minimum-removals-to-balance-array)
**Companies:** Amazon, Google, Meta, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sums — O(n)](#4-approach-prefix-sums--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, return the **minimum** number of elements to remove so that the sum of elements at even indices equals the sum at odd indices.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [2, 1, 6, 4]
  Output: 1
  Explanation: Remove 1 (index 1) → [2,6,4]. Even sum=2+4=6, Odd sum=6. Balanced.

Example 2:
  Input: nums = [1, 1, 1]
  Output: 1
  Explanation: Remove any one element → [1,1]. Even=1, Odd=1.
```

---

## 3. Key Insight

> When you remove element at index `i`, all elements after it shift: elements that were at even positions become odd and vice versa. Use **prefix sums of even/odd positions** to compute the effect of removing each element in O(1).

---

## 4. Approach: Prefix Sums — O(n) ✅

```
FUNCTION minRemovals(nums):
    n = len(nums)
    // Suffix sums for even and odd indexed positions
    suffEven = suffOdd = 0
    FOR i ← n-1 DOWN TO 0:
        IF i % 2 == 0: suffEven += nums[i]
        ELSE: suffOdd += nums[i]

    prefEven = prefOdd = 0
    minRemove = n  // worst case: remove all

    FOR i ← 0 TO n - 1:
        // Remove suffix contribution of nums[i]
        IF i % 2 == 0: suffEven -= nums[i]
        ELSE: suffOdd -= nums[i]

        // After removing index i:
        // Even sum = prefEven + suffOdd (suffix odds become evens)
        // Odd sum = prefOdd + suffEven (suffix evens become odds)
        newEven = prefEven + suffOdd
        newOdd = prefOdd + suffEven

        IF newEven == newOdd:
            minRemove = MIN(minRemove, 1)  // just remove nums[i]

        // Add nums[i] to prefix
        IF i % 2 == 0: prefEven += nums[i]
        ELSE: prefOdd += nums[i]

    // Check if already balanced
    IF prefEven == prefOdd: minRemove = 0

    RETURN minRemove
```

---

## 5. Walkthrough

```
nums = [2, 1, 6, 4]

Try removing each:
  i=0: remove 2 → [1,6,4]. Even=1+4=5, Odd=6. ≠
  i=1: remove 1 → [2,6,4]. Even=2+4=6, Odd=6. ✅ → minRemove=1
  i=2: remove 6 → [2,1,4]. Even=2+4=6, Odd=1. ≠
  i=3: remove 4 → [2,1,6]. Even=2+6=8, Odd=1. ≠

Answer = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass with prefix/suffix sums |
| **Space** | O(1) — only tracking running sums |

---

## 7. Key Takeaway

> **Index parity swaps on removal** — when you remove an element, all subsequent even indices become odd and vice versa. Prefix/suffix sums for each parity let you evaluate each removal in O(1).
