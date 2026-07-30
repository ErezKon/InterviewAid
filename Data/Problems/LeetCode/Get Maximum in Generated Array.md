# 1646. Get Maximum in Generated Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/get-maximum-in-generated-array](https://leetcode.com/problems/get-maximum-in-generated-array)
**Companies:** Amazon, Verizon

---

## 1. Problem Description

Generate an array where `nums[0] = 0`, `nums[1] = 1`, and for each `i >= 1`:
- `nums[2 * i] = nums[i]`
- `nums[2 * i + 1] = nums[i] + nums[i + 1]`
Given an integer `n`, return the maximum value in the array `nums[0..n]`.

## 2. Examples

**Example 1:**
```
Input: n = 7
Generated nums: [0,1,1,2,1,3,2,3]
Output: 3
```
**Explanation:** The maximum value among the first 8 elements is 3.

**Example 2:**
```
Input: n = 2
Generated nums: [0,1,1]
Output: 1
```

## 3. Approach: Simulation — O(n) ✅

```text
FUNCTION getMaximumGenerated(n):
    IF n == 0: RETURN 0
    SET nums ← array of size n+1 filled with 0
    SET nums[1] ← 1
    FOR i ← 2 TO n:
        IF i MOD 2 == 0:
            SET nums[i] ← nums[i / 2]
        ELSE:
            SET nums[i] ← nums[i / 2] + nums[i / 2 + 1]
    RETURN MAX(nums)
```

## 4. Walkthrough

| i | nums[i] calculation | nums[i] value |
|---|----------------------|--------------|
|0|initial|0|
|1|initial|1|
|2|even → nums[2/2]=nums[1]|1|
|3|odd → nums[1]+nums[2]|1+1=2|
|4|even → nums[2]|1|
|5|odd → nums[2]+nums[3]|1+2=3|
|6|even → nums[3]|2|
|7|odd → nums[3]+nums[4]|2+1=3|

The maximum among these values is 3.

## 5. Complexity Analysis

- **Time:** O(n) – one pass to fill the array.
- **Space:** O(n) – storage for the generated array.

## 6. Follow-Up Questions

- Can the solution be optimized to O(1) extra space by tracking only the current maximum?
- How would you adapt the algorithm if the recurrence changed to a different pattern?

## Key Takeaway

> Build the array following the recurrence and return the max. O(n) time and space.
