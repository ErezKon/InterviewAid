# 3392. Count Subarrays of Length Three With a Condition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition](https://leetcode.com/problems/count-subarrays-of-length-three-with-a-condition)
**Companies:** Amazon, Cognizant, Google, Meta, Microsoft

---

## Problem Description

Count subarrays of length 3 `[a, b, c]` where `(a + c) * 2 == b` (the middle element is exactly twice the sum of the first and third).

---

## Approach

```
FUNCTION countSubarrays(nums):
    count = 0
    FOR i ← 1 TO len(nums) - 2:
        IF (nums[i-1] + nums[i+1]) * 2 == nums[i]:
            count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Fixed-length subarray problems with a simple condition: just slide a window of that length and check the condition directly. No special data structures needed.**
