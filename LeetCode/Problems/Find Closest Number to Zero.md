# 2239. Find Closest Number to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-closest-number-to-zero](https://leetcode.com/problems/find-closest-number-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiger Analytics

---

## Problem Description

Return the number closest to 0. If two numbers are equidistant, return the positive one.

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION findClosestNumber(nums):
    closest = nums[0]
    FOR num IN nums:
        IF ABS(num) < ABS(closest) OR (ABS(num) == ABS(closest) AND num > closest):
            closest = num
    RETURN closest
```

---

## Key Takeaway

> **Track closest by absolute value, prefer positive on tie.**
