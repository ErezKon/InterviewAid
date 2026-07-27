# 918. Maximum Sum Circular Subarray

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/maximum-sum-circular-subarray](https://leetcode.com/problems/maximum-sum-circular-subarray)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Makemytrip, Meta, Microsoft, Sprinklr, Two Sigma

---

## 1. Problem Description

Given a circular integer array `nums`, find the maximum possible sum of a non-empty subarray (can wrap around).

---

## 2. Approach: Kadane's + Complement — O(n) ✅

The max circular subarray is either:
1. A normal subarray (standard Kadane's) — `maxSum`
2. A wrapping subarray = `totalSum - minSubarray` — `totalSum - minSum`

```
FUNCTION maxSubarraySumCircular(nums):
    maxSum = curMax = nums[0]
    minSum = curMin = nums[0]
    totalSum = nums[0]

    FOR i ← 1 TO n - 1:
        curMax = MAX(nums[i], curMax + nums[i])
        maxSum = MAX(maxSum, curMax)

        curMin = MIN(nums[i], curMin + nums[i])
        minSum = MIN(minSum, curMin)

        totalSum += nums[i]

    // Edge case: all negative → maxSum is the answer (can't take empty subarray)
    IF maxSum < 0: RETURN maxSum

    RETURN MAX(maxSum, totalSum - minSum)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Max circular subarray = max(normal Kadane's, total - min subarray). The "wrapping" case is the complement of the minimum subarray. Handle all-negative edge case separately.
