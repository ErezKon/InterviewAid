# 325. Maximum Size Subarray Sum Equals k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-size-subarray-sum-equals-k](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft, Oracle, Palantir, Tiktok
---

## Problem Description
Given an integer array `nums` and an integer `k`, find the length of the longest contiguous subarray whose elements sum to exactly `k`. If no such subarray exists, return `0`.

## Examples
**Example 1:**
```
nums = [1, -1, 5, -2, 3], k = 3
Longest subarray = [1, -1, 5, -2] (length 4)
```
**Example 2:**
```
nums = [-2, -1, 2, 1], k = 1
Longest subarray = [2, -1] (length 2)
```

## Approach
Use a prefix‑sum hashmap storing the earliest index at which each cumulative sum occurs. For each position `i`, compute `prefixSum`. If `prefixSum - k` has been seen before at index `j`, then the subarray `(j+1 … i)` sums to `k` and its length is `i - j`. Keep the maximum length.

```text
FUNCTION MaxSubarrayLength(nums, k):
    prefixMap ← MAP with (0 → -1) // sum 0 at index -1
    prefixSum ← 0
    maxLen ← 0
    FOR i FROM 0 TO LENGTH(nums)-1:
        SET prefixSum ← prefixSum + nums[i]
        IF (prefixSum - k) IN prefixMap:
            SET candidate ← i - prefixMap[prefixSum - k]
            SET maxLen ← MAX(maxLen, candidate)
        IF prefixSum NOT IN prefixMap:
            SET prefixMap[prefixSum] ← i   // store earliest occurrence
    RETURN maxLen
```

## Walkthrough
| i | nums[i] | prefixSum | prefixSum‑k in map? | maxLen |
|---|---------|-----------|--------------------|--------|
|0|1|1|no|0|
|1|-1|0|yes (0 at -1) → len=2|2|
|2|5|5|yes (5‑3=2 not in map) → no|2|
|3|-2|3|yes (3‑3=0 at -1) → len=4|4|
|4|3|6|yes (6‑3=3 at 3) → len=1|4|

## Complexity Analysis
- Time: `O(n)` – single pass through the array.
- Space: `O(n)` – hashmap of prefix sums.

## Follow-Up Questions
1. How would you modify the algorithm to return the actual subarray, not just its length?
2. Can the solution be adapted for a streaming input where the array is not fully known in advance?
3. What changes are needed if the array contains only non‑negative numbers?

## Key Takeaway
Storing the earliest occurrence of each prefix sum lets you compute longest zero‑sum (or `k`‑sum) subarrays in linear time.
