# 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros](https://leetcode.com/problems/minimum-equal-sum-of-two-arrays-after-replacing-zeros)
**Companies:** Amazon, Google, Mathworks, Salesforce, Squarepoint Capital

---

## Problem Description

Given two arrays with some zeros, replace each zero with a **positive integer**. Return the **minimum equal sum** both arrays can achieve, or `-1` if impossible.

## Key Insight

> Each zero becomes at least 1. The minimum achievable sum for each array is `sum + count_of_zeros`. The array with the higher minimum floor constrains the answer. If the lower-floor array has no zeros (can't increase), it's impossible.

## Approach: Greedy — O(n) ✅

```
FUNCTION minSum(nums1, nums2):
    s1 = SUM(nums1); z1 = nums1.count(0)
    s2 = SUM(nums2); z2 = nums2.count(0)
    min1 = s1 + z1    // each 0 becomes at least 1
    min2 = s2 + z2

    IF min1 > min2:
        IF z2 == 0: RETURN -1
        RETURN min1
    ELSE IF min2 > min1:
        IF z1 == 0: RETURN -1
        RETURN min2
    RETURN min1
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) |

## Key Takeaway

> When zeros must become positive, compute **minimum floors** for each array — the higher floor is the answer, provided the other array has flexibility (zeros) to reach it.
