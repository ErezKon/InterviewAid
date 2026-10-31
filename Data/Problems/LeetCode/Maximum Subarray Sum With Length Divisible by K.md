# 3381. Maximum Subarray Sum With Length Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k](https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

You are given an array of integers `nums` and an integer `k`.

Return the **maximum** sum of a subarray of `nums`, such that the size of the subarray is **divisible** by `k`.

**Constraints:**
- `1 <= k <= nums.length <= 2 * 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [1,2], k = 1
Output: 3
Explanation: The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.
```

**Example 2:**
```
Input: nums = [-1,-2,-3,-4,-5], k = 4
Output: -10
Explanation: The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.
```

**Example 3:**
```
Input: nums = [-5,1,2,-3,4], k = 2
Output: 4
Explanation: The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.
```

## Approach
Use prefix sums modulo `k`. For each index `i`, compute `prefix[i]` = sum of first `i` elements. The remainder `r = i % k` groups indices that can form subarrays of length divisible by `k`. Maintaining the minimum prefix sum seen for each remainder allows computing the maximum subarray sum ending at `i` as `prefix[i] - minPrefix[r]`.

## Walkthrough
| i | nums[i] | prefix[i] | r = i % k | minPrefix[r] before i | candidate = prefix[i] - minPrefix[r] | best so far |
|---|---------|-----------|----------|-----------------------|--------------------------------------|------------|
|0|3|3|0|0|3-0=3|3|
|1|-1|2|1|∞| - |3|
|2|4|6|0|0|6-0=6|6|
|3|-1|5|1|∞| - |6|
|4|5|10|0|0|10-0=10|10|
|5|-9|1|1|∞| - |10|
|6|2|3|0|0|3-0=3|10|

## Complexity Analysis
- **Time:** O(n) – single pass to compute prefixes and update minima.
- **Space:** O(k) – array of size `k` for `minPrefix` (plus O(1) extra).

## Follow-Up Questions
1. How would you adapt the algorithm if subarray length must be exactly `k` instead of a multiple?
2. Can the method be extended to handle a maximum length constraint as well?
3. What changes are needed if the array is circular (wrap-around allowed)?

## Key Takeaway
By tracking the smallest prefix sum for each modulo class, we can instantly compute the best subarray whose length satisfies the divisibility condition, turning a seemingly complex constraint into an O(n) scan.
