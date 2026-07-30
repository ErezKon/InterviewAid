# 2855. Minimum Right Shifts to Sort the Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-right-shifts-to-sort-the-array](https://leetcode.com/problems/minimum-right-shifts-to-sort-the-array)
**Companies:** Accenture, Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Find Rotation Point — O(n)](#4-approach-find-rotation-point--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of distinct positive integers, return the **minimum** number of right shifts to sort it, or `-1` if not possible.

A right shift moves the last element to the front.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [3, 4, 5, 1, 2]
  Output: 2
  Explanation: Right shift twice: [2,3,4,5,1] → [1,2,3,4,5].

Example 2:
  Input: nums = [1, 3, 5]
  Output: 0
  Explanation: Already sorted.

Example 3:
  Input: nums = [2, 1, 4]
  Output: -1
  Explanation: No rotation produces a sorted array.
```

---

## 3. Key Insight

> A sorted rotated array has **at most one** "drop" (where `nums[i] > nums[i+1]`). If there are 0 drops, it's already sorted (0 shifts). If exactly 1 drop at index `i`, and `nums[n-1] <= nums[0]`, the answer is `n - i - 1`. Otherwise, impossible.

---

## 4. Approach: Find Rotation Point — O(n) ✅

```
FUNCTION minRightShifts(nums):
    n = len(nums)
    drops = 0
    dropIdx = -1

    FOR i ← 0 TO n - 2:
        IF nums[i] > nums[i + 1]:
            drops += 1
            dropIdx = i

    IF drops == 0: RETURN 0
    IF drops == 1 AND nums[n-1] <= nums[0]:
        RETURN n - dropIdx - 1
    RETURN -1
```

---

## 5. Walkthrough

```
nums = [3, 4, 5, 1, 2]

Scan for drops:
  3<4 ok, 4<5 ok, 5>1 DROP at idx=2, 1<2 ok
drops=1, dropIdx=2

Check nums[4]=2 <= nums[0]=3? YES
Answer = 5 - 2 - 1 = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single scan |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Sorted rotated array detection**: count drops. 0 drops = sorted, 1 drop with wraparound check = rotated, anything else = impossible.
