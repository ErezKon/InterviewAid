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

You are given an integer array `nums`, and an integer `k`. Let's introduce **K-or** operation by extending the standard bitwise OR. In K-or, a bit position in the result is set to `1` if at least `k` numbers in `nums` have a `1` in that position.

Return *the K-or of* `nums`.

**Constraints:**
- `1 <= nums.length <= 50`
- `0 <= nums[i] < 2³¹`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input: nums = [7,12,9,8,9,15], k = 4
  Output: 9
  Explanation: Represent numbers in binary:
    Number      | Bit 3 | Bit 2 | Bit 1 | Bit 0
    7           |   0   |   1   |   1   |   1
    12          |   1   |   1   |   0   |   0
    9           |   1   |   0   |   0   |   1
    8           |   1   |   0   |   0   |   0
    9           |   1   |   0   |   0   |   1
    15          |   1   |   1   |   1   |   1
    Result = 9  |   1   |   0   |   0   |   1
  Bit 0 is set in 7, 9, 9, and 15. Bit 3 is set in 12, 9, 8, 9, and 15.
  Only bits 0 and 3 qualify. The result is (1001)2 = 9.

Example 2:
  Input: nums = [2,12,1,11,4,5], k = 6
  Output: 0
  Explanation: No bit appears as 1 in all six array numbers, as required for K-or with k = 6.
  Thus, the result is 0.

Example 3:
  Input: nums = [10,8,5,9,11,6,8], k = 1
  Output: 15
  Explanation: Since k == 1, the 1-or of the array is equal to the bitwise OR of all its elements.
  Hence, the answer is 10 OR 8 OR 5 OR 9 OR 11 OR 6 OR 8 = 15.
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
