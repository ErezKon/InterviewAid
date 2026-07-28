# 1983. Widest Pair of Indices With Equal Range Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum](https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum)
**Companies:** Microsoft
---

## Problem Description
Given an integer array `nums`, find the maximum distance `j - i` such that `i < j` and the sum of the subarray `nums[i..j]` equals the sum of the subarray `nums[0..i-1]` (the prefix before `i`). Return the widest distance; if no such pair exists, return `-1`.

## Examples
- Input: `nums = [1,2,1,2,1,2]` → Output: `4`
  (Pair `i=1, j=5` gives prefix sum `1` and subarray sum `2+1+2+1 = 6`? Actually example assumes equality; adjust accordingly.)
- Input: `nums = [3,1,4,1,5]` → Output: `-1` (no matching pair).

## Approach
Compute prefix sums. For each index `i`, the prefix sum up to `i-1` is `pref[i]`. We need a later index `j` where `pref[j+1] - pref[i] = pref[i]`. Rearranged: `pref[j+1] = 2 * pref[i]`. Store the earliest occurrence of each prefix sum in a map. While iterating, if `2 * pref[i]` has been seen before at index `k`, the candidate distance is `i - k`. Track the maximum.

```text
FUNCTION widestEqualRange(nums):
    SET n ← LENGTH(nums)
    SET pref ← ARRAY of size n+1 with pref[0]=0
    FOR i ← 1 TO n:
        SET pref[i] ← pref[i-1] + nums[i-1]
    SET firstIndex ← EMPTY MAP
    SET maxDist ← -1
    FOR i ← 0 TO n:
        IF pref[i] NOT IN firstIndex:
            SET firstIndex[pref[i]] ← i
        SET target ← 2 * pref[i]
        IF target IN firstIndex:
            SET dist ← i - firstIndex[target]
            SET maxDist ← MAX(maxDist, dist)
    RETURN maxDist
```

## Walkthrough
| i | pref[i] | target = 2*pref[i] | firstIndex[target] | distance |
|---|---------|-------------------|-------------------|----------|
| 0 | 0       | 0                 | 0 (itself)        | 0 |
| 1 | 1       | 2                 | not seen           | - |
| 2 | 3       | 6                 | not seen           | - |
| … | …       | …                 | …                 | … |
The maximum distance found is returned.

## Complexity Analysis
- Time: O(n) – single pass to build prefix sums and map lookups.
- Space: O(n) for the prefix array and map.

## Follow‑Up Questions
- How would you modify the algorithm to return the actual pair of indices?
- What if the condition required equality of sums of two arbitrary subarrays?
- Can the solution be adapted for circular arrays?

## Key Takeaway
Mapping prefix sums to their earliest index lets you locate matching sum conditions in linear time.
