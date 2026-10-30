# 2535. Difference Between Element Sum and Digit Sum of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array)
**Companies:** Amazon, Bloomberg, Google, Innovaccer

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Single Pass](#approach-single-pass)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a positive integer array `nums`.

- The **element sum** is the sum of all the elements in `nums`.
- The **digit sum** is the sum of all the digits (not necessarily distinct) that appear in `nums`.

Return *the **absolute** difference between the **element sum** and **digit sum** of *`nums`.

**Note** that the absolute difference between two integers `x` and `y` is defined as `|x - y|`.

**Constraints:**
- `1 <= nums.length <= 2000`
- `1 <= nums[i] <= 2000`

---

## Examples

**Example 1:**
```
Input: nums = [1,15,6,3]
Output: 9
Explanation: The element sum of nums is 1 + 15 + 6 + 3 = 25.
The digit sum of nums is 1 + 1 + 5 + 6 + 3 = 16.
The absolute difference between the element sum and digit sum is |25 - 16| = 9.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 0
Explanation: The element sum of nums is 1 + 2 + 3 + 4 = 10.
The digit sum of nums is 1 + 2 + 3 + 4 = 10.
The absolute difference between the element sum and digit sum is |10 - 10| = 0.
```

---

## Key Insight

> The element sum is always ≥ digit sum (since e.g. 15 > 1+5). The difference comes from multi-digit numbers where the element value exceeds the sum of its digits. The answer is always `elementSum - digitSum` (no need for abs in practice).

---

## Approach: Single Pass ✅

```
FUNCTION differenceOfSum(nums):
    elemSum = SUM(nums)
    digitSum = SUM(int(d) for num in nums for d in str(num))
    RETURN ABS(elemSum - digitSum)
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n × d) | n elements, d = max digits per element (≤ 4) |
| **Space** | O(1) | Two running sums |

---

## Key Takeaway

> **The difference between element sum and digit sum is always non-negative — multi-digit numbers "lose" value when broken into digits. A simple one-pass computation suffices.**
