# 2917. Find the K-or of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-k-or-of-an-array](https://leetcode.com/problems/find-the-k-or-of-an-array)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bit Counting — O(n · 32) ✅](#4-approach-bit-counting--on--32-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and integer `k`, compute the **K-or**: for each bit position, set it in the result if at least `k` elements have that bit set.

**Constraints:**
- `1 <= nums.length <= 50`
- `0 <= nums[i] < 2³¹`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input:  nums = [7, 12, 9, 8, 9, 15], k = 4
  Output: 9
  Reason: Bit 0 set in [7,9,9,15] (4 times ≥ k). Bit 3 set in [12,9,8,9,15] (5 times ≥ k). Result = 2⁰ + 2³ = 9.
```

---

## 3. Key Insight

> For each of 32 bit positions, count how many numbers have that bit set. If the count ≥ k, include it in the result.

---

## 4. Approach: Bit Counting — O(n · 32) ✅

```
FUNCTION findKOr(nums, k):
    result ← 0
    FOR bit ← 0 TO 31 DO
        count ← SUM(1 for num in nums if num & (1 << bit))
        IF count >= k THEN
            result |= (1 << bit)
    RETURN result
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 32) = O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Per-bit counting** generalizes OR (k=1) and AND (k=n). The K-or includes a bit only if it appears in at least k elements.
