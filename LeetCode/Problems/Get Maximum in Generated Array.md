# 1646. Get Maximum in Generated Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/get-maximum-in-generated-array](https://leetcode.com/problems/get-maximum-in-generated-array)
**Companies:** Amazon, Verizon

---

## 1. Problem Description

Generate array where `nums[0]=0`, `nums[1]=1`, `nums[2*i]=nums[i]`, `nums[2*i+1]=nums[i]+nums[i+1]`. Return the max value for array of size `n+1`.

## 2. Approach: Simulation — O(n) ✅

```
FUNCTION getMaximumGenerated(n):
    IF n == 0: RETURN 0
    nums ← [0] * (n + 1); nums[1] ← 1
    FOR i ← 2 TO n DO
        IF i % 2 == 0: nums[i] ← nums[i / 2]
        ELSE: nums[i] ← nums[i / 2] + nums[i / 2 + 1]
    RETURN MAX(nums)
```

## Key Takeaway

> Build the array following the recurrence and return the max. O(n) time and space.
