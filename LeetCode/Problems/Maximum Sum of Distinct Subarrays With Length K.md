# 2461. Maximum Sum of Distinct Subarrays With Length K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Tcs, Walmart Labs

---

## Problem Description
Given an integer array `nums` and an integer `k`, consider all contiguous subarrays of length `k`. Among those subarrays whose `k` elements are all distinct, return the maximum possible sum of the elements. If no such subarray exists, return `0`.

## Examples
**Example 1**
```
Input: nums = [1,2,3,4,5], k = 3
Output: 12
Explanation: Subarrays of length 3 are [1,2,3], [2,3,4], [3,4,5]; all have distinct elements. Their sums are 6, 9, and 12. The maximum is 12.
```
**Example 2**
```
Input: nums = [1,2,2,3,4], k = 3
Output: 9
Explanation: Valid subarrays are [2,3,4] (sum 9). Subarray [1,2,2] is invalid because of duplicate `2`.
```
**Example 3**
```
Input: nums = [5,5,5], k = 2
Output: 0
Explanation: No length‑2 subarray contains distinct elements.
```

## Approach
Use a **sliding window** of size `k` together with a hash map that stores the frequency of each element inside the window.
1. Expand the window by adding `nums[i]` and updating its count.
2. When the window size exceeds `k`, remove `nums[i‑k]` and decrement its count.
3. After each expansion, if the map size equals `k` (all elements distinct), update the answer with the current window sum.
The window sum can be maintained incrementally to achieve O(1) update per step.

```text
FUNCTION maxDistinctSubarraySum(nums, k):
    n ← LENGTH(nums)
    IF k > n: RETURN 0
    freq ← EMPTY_MAP()
    curSum ← 0
    maxSum ← 0
    FOR i ← 0 TO n-1:
        val ← nums[i]
        curSum ← curSum + val
        freq[val] ← freq.get(val,0) + 1
        IF i >= k:
            leftVal ← nums[i - k]
            curSum ← curSum - leftVal
            freq[leftVal] ← freq[leftVal] - 1
            IF freq[leftVal] == 0:
                DELETE freq[leftVal]
        IF i >= k - 1 AND SIZE(freq) == k:
            maxSum ← MAX(maxSum, curSum)
    RETURN maxSum
```

## Walkthrough
For `nums = [1,2,2,3,4]`, `k = 3`:
| i | Window elements | freq size | curSum | maxSum |
|---|----------------|-----------|--------|--------|
|0|[1]             |1          |1       |0|
|1|[1,2]           |2          |3       |0|
|2|[1,2,2]         |2 (duplicate) |5   |0|
|3|[2,2,3] (after slide) |2 |7 |0|
|4|[2,3,4]         |3 (distinct) |9   |9|
Result = 9.

## Complexity Analysis
*Time*: O(n) – each element is added and removed once.
*Space*: O(k) for the frequency map (at most `k` distinct keys).

## Follow‑Up Questions
1. How would you adapt the solution to return the starting index of the optimal subarray?
2. Can the algorithm be extended to handle the case where at most `m` duplicates are allowed?
3. How would you solve the problem if the array were circular (subarrays may wrap around)?

## Key Takeaway
A sliding‑window with a frequency map efficiently enforces the distinct‑element constraint while tracking the maximum sum in linear time.
