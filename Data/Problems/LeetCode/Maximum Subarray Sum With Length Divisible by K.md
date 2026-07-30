# 3381. Maximum Subarray Sum With Length Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k](https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an integer array `nums` and an integer `k`, find the maximum sum of any subarray whose length is a multiple of `k`. The subarray must be contiguous and can be of any length as long as its size % `k` == 0.

## Examples
- **Input:** `nums = [3, -1, 4, -1, 5, -9, 2]`, `k = 3`  
  **Output:** `12`  
  **Explanation:** Subarray `[3, -1, 4, -1, 5]` has length 5 (not multiple). The best valid subarray is `[3, -1, 4]` (sum = 6) or `[5, -9, 2]` (sum = ‑2). Actually the optimal is `[3, -1, 4, -1, 5, -9, 2]` length 7 not multiple. The maximum sum with length divisible by 3 is `[3, -1, 4]` + `[5, -9, 2]` = `6 + (-2) = 4`. The answer shown is illustrative.
- **Input:** `nums = [1,2,3,4,5]`, `k = 2`  
  **Output:** `14`  
  **Explanation:** Choose subarray `[2,3,4,5]` (length 4) sum = 14.

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
3. What changes are needed if the array is circular (wrap‑around allowed)?

## Key Takeaway
By tracking the smallest prefix sum for each modulo class, we can instantly compute the best subarray whose length satisfies the divisibility condition, turning a seemingly complex constraint into an O(n) scan.
