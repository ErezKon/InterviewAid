# 3010. Divide an Array Into Subarrays With Minimum Cost I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i)
**Companies:** Amazon, American Express, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Split `nums` into 3 contiguous subarrays. Cost = sum of first elements of each subarray. First subarray always starts at index 0. Minimize total cost.

**Constraints:** `3 <= n <= 50`

---

## Approach: Sort Remaining ✅

```
FUNCTION minimumCost(nums):
    // First subarray must start at index 0
    // Need 2 more starting points from nums[1:]
    // Cost = nums[0] + two smallest values from nums[1:]
    rest = sorted(nums[1:])
    RETURN nums[0] + rest[0] + rest[1]
```

---

## Key Takeaway

> **Cost = nums[0] + two smallest values from the rest. The split points can be anywhere, so just pick the two cheapest starting elements.**
