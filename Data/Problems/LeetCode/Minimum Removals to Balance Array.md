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

> *Note: the Approach below (even/odd suffix sums) solves #1664. Officially you keep a subarray of the sorted values with `max ≤ k · min`. Sort `nums` and use two pointers to find the largest window `[i..j]` with `nums[j] ≤ k · nums[i]`; the answer is `n − window size`.*

You are given an integer array `nums` and an integer `k`.

An array is considered **balanced** if the value of its **maximum** element is **at most** `k` times the **minimum** element.

You may remove **any** number of elements from `nums` without making it **empty**.

Return the **minimum** number of elements to remove so that the remaining array is balanced.

**Note:** An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: nums = [2,1,5], k = 2
Output: 1
Explanation: - Remove nums[2] = 5 to get nums = [2, 1].
- Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.
```

**Example 2:**
```
Input: nums = [1,6,2,9], k = 3
Output: 2
Explanation: - Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
- Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.
```

**Example 3:**
```
Input: nums = [4,6], k = 2
Output: 0
Explanation: - Since nums is already balanced as 6 <= 4 * 2, no elements need to be removed.
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
