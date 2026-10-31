# 2461. Maximum Sum of Distinct Subarrays With Length K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Tcs, Walmart Labs

---

## Problem Description

You are given an integer array `nums` and an integer `k`. Find the maximum subarray sum of all the subarrays of `nums` that meet the following conditions:

- The length of the subarray is `k`, and
- All the elements of the subarray are **distinct**.

Return *the maximum subarray sum of all the subarrays that meet the conditions**.* If no subarray meets the conditions, return `0`.

*A **subarray** is a contiguous non-empty sequence of elements within an array.*

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
```

**Example 2:**
```
Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
```

## Approach
Use a **sliding window** of size `k` together with a hash map that stores the frequency of each element inside the window.
1. Expand the window by adding `nums[i]` and updating its count.
2. When the window size exceeds `k`, remove `nums[i-k]` and decrement its count.
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

## Follow-Up Questions
1. How would you adapt the solution to return the starting index of the optimal subarray?
2. Can the algorithm be extended to handle the case where at most `m` duplicates are allowed?
3. How would you solve the problem if the array were circular (subarrays may wrap around)?

## Key Takeaway
A sliding-window with a frequency map efficiently enforces the distinct-element constraint while tracking the maximum sum in linear time.
