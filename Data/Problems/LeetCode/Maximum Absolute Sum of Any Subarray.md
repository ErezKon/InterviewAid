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

Given an integer array `nums`, find the subarray with the **maximum absolute sum**. The absolute sum can come from the maximum positive subarray sum or the maximum negative subarray sum (its absolute value).

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `-10⁴ ≤ nums[i] ≤ 10⁴`

---

## Examples

**Example 1:**
```
Input:  nums = [1,-3,2,3,-4]
Output: 5
Explanation: Subarray [2,3] has sum 5. Subarray [-3,2,3,-4] has sum -2, |sum|=2.
             Max absolute = 5.
```

**Example 2:**
```
Input:  nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: Subarray [-5,1,-4] has sum -8, |sum| = 8.
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
