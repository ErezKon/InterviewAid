# 523. Continuous Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/continuous-subarray-sum](https://leetcode.com/problems/continuous-subarray-sum)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Phonepe, Swiggy, Tcs, Yandex

---

## Problem Description
Given an integer array `nums` and an integer `k`, return `true` *if* `nums` *has a **good subarray** or* `false` *otherwise*.

A **good subarray** is a subarray where:

- its length is **at least two**, and
- the sum of the elements of the subarray is a multiple of `k`.

**Note** that:

- A **subarray** is a contiguous part of the array.
- An integer `x` is a multiple of `k` if there exists an integer `n` such that `x = n * k`. `0` is **always** a multiple of `k`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= sum(nums[i]) <= 2^31 - 1`
- `1 <= k <= 2^31 - 1`

## Examples
```
Example 1:
  Input: nums = [23,2,4,6,7], k = 6
  Output: true
  Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
```
```
Example 2:
  Input: nums = [23,2,6,4,7], k = 6
  Output: true
  Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
    42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
```
```
Example 3:
  Input: nums = [23,2,6,4,7], k = 13
  Output: false
```

## Approach
Use prefix sums modulo `k`. If two prefix sums have the same remainder and are at least two indices apart, the subarray between them sums to a multiple of `k`. Store the earliest index for each remainder in a hash map.

**Pseudocode**
```text
FUNCTION checkSubarraySum(nums, k):
    SET remainderMap ← {0: -1}          // remainder → earliest index
    SET prefixMod ← 0
    FOR i FROM 0 TO LENGTH(nums) - 1:
        SET prefixMod ← (prefixMod + nums[i]) MOD k
        IF prefixMod IN remainderMap:
            IF i - remainderMap[prefixMod] >= 2:
                RETURN true
        ELSE:
            remainderMap[prefixMod] ← i
    RETURN false
```

## Walkthrough
For `nums = [23,2,4,6,7]`, `k = 6`:
| i | num | prefixMod | remainderMap | Check |
|---|-----|-----------|--------------|-------|
|0|23| (0+23)%6 = 5 | {0:-1,5:0} | – |
|1|2| (5+2)%6 = 1 | {0:-1,5:0,1:1} | – |
|2|4| (1+4)%6 = 5 | remainder 5 seen at 0 → i-0=2 ≥2 → return true |
The algorithm stops early once a valid subarray is found.

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(min(n, k)) – at most one entry per distinct remainder.

## Follow‑Up Questions
1. How would you handle the case `k = 0` where the condition becomes “sum equals 0”?
2. Can the method be extended to find the longest such subarray?
3. What modifications are needed if the array contains negative numbers?

## Key Takeaway
Equal remainders of prefix sums modulo `k` indicate a subarray whose sum is a multiple of `k`.
