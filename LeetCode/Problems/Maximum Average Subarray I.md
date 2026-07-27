# 643. Maximum Average Subarray I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-average-subarray-i](https://leetcode.com/problems/maximum-average-subarray-i)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Jpmorgan, Meta, Microsoft, Oppo, Tcs, Uber, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Fixed Sliding Window — O(n)](#approach-fixed-sliding-window--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, find the contiguous subarray of length `k` with the **maximum average value**.

**Constraints:**
- `1 ≤ k ≤ n ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Subarray [12,-5,-6,50] has sum 51, avg = 51/4 = 12.75.
```

---

## Key Insight

> Fixed-size sliding window. Track the window sum (not average) and slide by adding the new element and removing the oldest. Divide by k at the end.

---

## Approach: Fixed Sliding Window — O(n) ✅

```
FUNCTION findMaxAverage(nums, k):
    windowSum = SUM(nums[:k])
    maxSum = windowSum

    FOR i ← k TO n - 1:
        windowSum += nums[i] - nums[i - k]
        maxSum = MAX(maxSum, windowSum)

    RETURN maxSum / k
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(1) |

---

## Key Takeaway

> **Fixed-size sliding window: maintain a running sum, slide by one each step.** The quintessential sliding window introductory problem.
