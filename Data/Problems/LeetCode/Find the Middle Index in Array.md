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

Given a **0-indexed** integer array `nums`, find the **leftmost** `middleIndex` (i.e., the smallest amongst all the possible ones).

A `middleIndex` is an index where `nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1]`.

If `middleIndex == 0`, the left side sum is considered to be `0`. Similarly, if `middleIndex == nums.length - 1`, the right side sum is considered to be `0`.

Return *the **leftmost*** `middleIndex` *that satisfies the condition, or* `-1` *if there is no such index*.

**Constraints:**
- `1 <= nums.length <= 100`
- `-1000 <= nums[i] <= 1000`

**Note:** This question is the same as 724: Find Pivot Index.

---

## 2. Examples

```
Example 1:
  Input: nums = [2,3,-1,8,4]
  Output: 3
  Explanation: The sum of the numbers before index 3 is: 2 + 3 + -1 = 4
  The sum of the numbers after index 3 is: 4 = 4

Example 2:
  Input: nums = [1,-1,4]
  Output: 2
  Explanation: The sum of the numbers before index 2 is: 1 + -1 = 0
  The sum of the numbers after index 2 is: 0

Example 3:
  Input: nums = [2,5]
  Output: -1
  Explanation: There is no valid middleIndex.
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
