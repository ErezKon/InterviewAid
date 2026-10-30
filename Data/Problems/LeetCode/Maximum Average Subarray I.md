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

You are given an integer array `nums` consisting of `n` elements, and an integer `k`.

Find a contiguous subarray whose **length is equal to** `k` that has the maximum average value and return *this value*. Any answer with a calculation error less than `10^-5` will be accepted.

**Constraints:**
- `n == nums.length`
- `1 <= k <= n <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
```

**Example 2:**
```
Input: nums = [5], k = 1
Output: 5.00000
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
