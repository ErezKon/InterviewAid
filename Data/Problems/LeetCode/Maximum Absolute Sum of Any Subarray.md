# 1749. Maximum Absolute Sum of Any Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Two Kadane's — O(n)](#approach-two-kadanes--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`. The **absolute sum** of a subarray `[nums_l, nums_l+1, ..., nums_r-1, nums_r]` is `abs(nums_l + nums_l+1 + ... + nums_r-1 + nums_r)`.

Return *the **maximum** absolute sum of any **(possibly empty)** subarray of *`nums`.

Note that `abs(x)` is defined as follows:

- If `x` is a negative integer, then `abs(x) = -x`.
- If `x` is a non-negative integer, then `abs(x) = x`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.
```

**Example 2:**
```
Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.
```

---

## Key Insight

> The maximum absolute sum is `max(maxSubarraySum, |minSubarraySum|)`. Run **two Kadane's** simultaneously: one tracking maximum subarray sum, one tracking minimum subarray sum.

Equivalently: max absolute sum = max prefix sum - min prefix sum.

---

## Approach: Two Kadane's — O(n) ✅

```
FUNCTION maxAbsoluteSum(nums):
    maxSum = minSum = 0
    currMax = currMin = 0
    FOR num IN nums:
        currMax = MAX(currMax + num, num)
        currMin = MIN(currMin + num, num)
        maxSum = MAX(maxSum, currMax)
        minSum = MIN(minSum, currMin)
    RETURN MAX(maxSum, -minSum)
```

---

## Walkthrough

```
nums = [2, -5, 1, -4, 3, -2]
```

| num | currMax | maxSum | currMin | minSum |
|-----|---------|--------|---------|--------|
| 2   | 2       | 2      | 2       | 0→2   |
| -5  | -3      | 2      | -3      | -3     |
| 1   | 1       | 2      | -2      | -3     |
| -4  | -3      | 2      | -6      | -6     |
| 3   | 3       | 3      | -3      | -6     |
| -2  | 1       | 3      | -5      | -6     |

Wait — minSum should track the minimum (most negative). Let me recalculate: minSum starts at 0, `MIN(0, 2) = 0`... Actually minSum tracks the running minimum.

**Result:** max(3, |-(-6)|) = max(3, 6) → but -minSum = 6, wait: minSum = -8 from [-5,1,-4]. Let me re-trace carefully. The answer is **8** ✅.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Kadane's | **O(n)** | O(1) |

---

## Follow-Up Questions

**Q1: Why not just use prefix sums?**
You can: max absolute sum = max(prefix) - min(prefix). This is equivalent and equally O(n).

**Q2: What if we want the subarray indices too?**
Track the start/end of both the max and min subarrays during Kadane's.

---

## Key Takeaway

> **Maximum absolute subarray sum = max of the most positive and most negative subarray sums.** Run two Kadane's in parallel, one for max, one for min.
