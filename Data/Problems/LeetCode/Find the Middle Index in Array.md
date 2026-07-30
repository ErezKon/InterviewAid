# 1991. Find the Middle Index in Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-middle-index-in-array](https://leetcode.com/problems/find-the-middle-index-in-array)
**Companies:** Amazon, Bloomberg, Code Studio, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sum — O(n) ✅](#4-approach-prefix-sum--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, find the **leftmost** index where the sum of elements to the left equals the sum to the right. Return -1 if none exists.

**Constraints:**
- `1 <= nums.length <= 100`
- `-1000 <= nums[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input:  nums = [2, 3, -1, 8, 4]
  Output: 3
  Reason: left sum = 2+3+(-1) = 4, right sum = 4.

Example 2:
  Input:  nums = [1, -1, 4]
  Output: 2
  Reason: left sum = 1+(-1) = 0, right sum = 0.
```

---

## 3. Key Insight

> At index `i`: left sum = running sum of `nums[0..i-1]`, right sum = `total - left - nums[i]`. Check if they're equal.

---

## 4. Approach: Prefix Sum — O(n) ✅

```
FUNCTION findMiddleIndex(nums):
    total = SUM(nums); left = 0
    FOR i, num IN enumerate(nums):
        IF left == total - left - num: RETURN i
        left += num
    RETURN -1
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Same as "Find Pivot Index" (LC 724). Track running left sum; right sum = `total - left - current`. One-pass O(n).
