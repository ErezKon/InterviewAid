# 1508. Range Sum of Sorted Subarray Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-of-sorted-subarray-sums](https://leetcode.com/problems/range-sum-of-sorted-subarray-sums)
**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
Given an integer array `nums` of length `n`, compute the sums of all possible contiguous subarrays, sort these sums in non‑decreasing order, and return the sum of the elements from index `left‑1` to `right‑1` (1‑based) of the sorted list, modulo `10^9+7`.

## Examples
- Input: `nums = [1,2,3,4], left = 3, right = 6` → Subarray sums `[1,3,6,10,2,5,9,3,7,4]` sorted → `[1,2,3,3,4,5,6,7,9,10]`; sum of indices 2‑5 = `3+3+4+5 = 15`.
- Input: `nums = [2,1,3], left = 1, right = 2` → Sorted sums `[1,2,3,3,4,6]`; answer = `1+2 = 3`.

## Approach
Generate all subarray sums using a prefix‑sum array to obtain each sum in O(1). Collect them, sort, then compute the required range sum using prefix sums of the sorted list. Modulo is applied at the end.

```text
FUNCTION rangeSum(nums, left, right):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums)
    // Prefix sums for O(1) subarray sum retrieval
    SET prefix ← ARRAY of size n+1 with zeros
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + nums[i]
    END FOR
    // Generate all subarray sums
    SET sums ← []
    FOR i ← 0 TO n-1:
        FOR j ← i TO n-1:
            SET sumVal ← prefix[j+1] - prefix[i]
            APPEND sumVal TO sums
        END FOR
    END FOR
    // Sort sums
    SORT sums ASCENDING
    // Prefix sum of sorted list for fast range query
    SET sortedPrefix ← ARRAY of size LENGTH(sums)+1 with zeros
    FOR i ← 0 TO LENGTH(sums)-1:
        SET sortedPrefix[i+1] ← (sortedPrefix[i] + sums[i]) MOD MOD
    END FOR
    RETURN (sortedPrefix[right] - sortedPrefix[left-1] + MOD) MOD MOD
END FUNCTION
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
|1|Compute prefix of `[1,2,3,4]`|`[0,1,3,6,10]`|
|2|Generate sums using prefix differences|`[1,3,6,10,2,5,9,3,7,4]`|
|3|Sort|`[1,2,3,3,4,5,6,7,9,10]`|
|4|Prefix of sorted|`[0,1,3,6,9,13,18,24,31,40,50]`|
|5|Answer `sortedPrefix[6] - sortedPrefix[2] = 18-3 = 15`|

## Complexity Analysis
- Time: O(n²) to generate sums, O(m log m) to sort where m = n·(n+1)/2.
- Space: O(m) to store all subarray sums.

## Follow‑Up Questions
1. How can you compute the answer without storing all sums (e.g., using a min‑heap for the k‑smallest sums)?
2. Can you adapt the solution for streaming input where the array is too large to fit in memory?
3. What changes are needed if the modulo should be applied to each subarray sum before sorting?

## Key Takeaway
Using prefix sums turns subarray sum calculation into O(1) per pair, enabling generation of all sums, after which sorting and a second prefix sum give the required range total efficiently.
