# 1800. Maximum Ascending Subarray Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-ascending-subarray-sum](https://leetcode.com/problems/maximum-ascending-subarray-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Linear Scan — O(n)](#approach-linear-scan--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of positive integers `nums`, return the **maximum** possible sum of an strictly increasing subarray in* *`nums`.

A subarray is defined as a contiguous sequence of numbers in an array.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## Examples

**Example 1:**
```
Input: nums = [10,20,30,5,10,50]
Output: 65
Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.
```

**Example 2:**
```
Input: nums = [10,20,30,40,50]
Output: 150
Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.
```

**Example 3:**
```
Input: nums = [12,17,15,13,10,11,12]
Output: 33
Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.
```

---

## Key Insight

> Track a running sum while elements are strictly increasing. Reset when the ascending condition breaks. Keep the global max.

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION maxAscendingSum(nums):
    currSum = nums[0]; maxSum = nums[0]
    FOR i ← 1 TO n - 1:
        IF nums[i] > nums[i-1]:
            currSum += nums[i]
        ELSE:
            currSum = nums[i]
        maxSum = MAX(maxSum, currSum)
    RETURN maxSum
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Linear scan | **O(n)** | O(1) |

---

## Key Takeaway

> **Track running sum while ascending, reset on break.** Simple greedy one-pass.
