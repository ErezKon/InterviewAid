# 974. Subarray Sums Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subarray-sums-divisible-by-k](https://leetcode.com/problems/subarray-sums-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Hashedin, Jpmorgan, Meta, Microsoft, Tiktok, Uber, Visa, Yandex

---

## Problem Description
Given an integer array `nums` and an integer `k`, return the total number of continuous subarrays whose sum is divisible by `k`. A subarray is a contiguous part of the array.

## Examples
**Example 1:**
```
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: The 7 subarrays are [4,5,0,-2,-3,1], [5,0], [0], [0,-2,-3,1], [-2,-3,1], [5,0,-2,-3,1], [1].
```
**Example 2:**
```
Input: nums = [5], k = 9
Output: 0
Explanation: No subarray sum is divisible by 9.
```

## Approach
**Prefix Sum Modulo with Hash Map** – While iterating the array, keep the cumulative sum modulo `k`. If the same remainder has been seen before, the subarray between the previous index and the current index has a sum divisible by `k`.

```text
FUNCTION subarraysDivByK(nums, k):
    // hashmap stores frequency of each remainder
    SET remainderCount ← {0: 1}
    SET prefixMod ← 0
    SET result ← 0
    FOR num IN nums:
        SET prefixMod ← (prefixMod + num) % k
        IF prefixMod < 0: SET prefixMod ← prefixMod + k   // handle negatives
        SET result ← result + remainderCount.get(prefixMod, 0)
        SET remainderCount[prefixMod] ← remainderCount.get(prefixMod, 0) + 1
    RETURN result
```

## Walkthrough
Consider `nums = [4,5,0,-2,-3,1]`, `k = 5`.
| Index | num | prefixMod | result increment | result |
|-------|-----|-----------|------------------|--------|
| -1    | -   | 0         | 0                | 0 |
| 0     | 4   | 4         | 0                | 0 |
| 1     | 5   | (4+5)%5=4 | 0                | 0 |
| 2     | 0   | 4         | 0                | 0 |
| 3     | -2  | 2         | 0                | 0 |
| 4     | -3  | 4         | 1 (remainder 4 seen before) | 1 |
| 5     | 1   | 0         | 1 (remainder 0 seen) | 2 |
... continue counting yields total 7.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(k) in the worst case for the hashmap storing remainders.

## Follow-Up Questions
1. How would you modify the solution to return the actual subarrays instead of just the count?
2. Can the approach be extended to handle a stream of numbers where the array size is not known upfront?
3. What if `k` can be zero? How would you handle division by zero cases?

## Key Takeaway
Using prefix sums modulo `k` and a hashmap of remainders lets you count divisible subarrays in linear time.
