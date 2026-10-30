# 1983. Widest Pair of Indices With Equal Range Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum](https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum)
**Companies:** Microsoft

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). The Approach/Walkthrough below solve an invented single-array problem. Correct idea: let `d[k] = Σ_{t<k}(nums1[t] − nums2[t])` (prefix of differences, `d[0] = 0`); a pair `(i, j)` is valid iff `d[j+1] == d[i]`. Record the first index where each prefix value appears and maximise `k − first[d[k]]`. O(n).*

You are given two **0-indexed** binary arrays `nums1` and `nums2`. Find the **widest** pair of indices `(i, j)` such that `i <= j` and `nums1[i] + nums1[i+1] + ... + nums1[j] == nums2[i] + nums2[i+1] + ... + nums2[j]`.

The **widest** pair of indices is the pair with the **largest** **distance** between `i` and `j`. The **distance** between a pair of indices is defined as `j - i + 1`.

Return *the **distance** of the **widest** pair of indices. If no pair of indices meets the conditions, return* `0`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `nums1[i]` is either `0` or `1`.
- `nums2[i]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: nums1 = [1,1,0,1], nums2 = [0,1,1,0]
Output: 3
Explanation:
If i = 1 and j = 3:
nums1[1] + nums1[2] + nums1[3] = 1 + 0 + 1 = 2.
nums2[1] + nums2[2] + nums2[3] = 1 + 1 + 0 = 2.
The distance between i and j is j - i + 1 = 3 - 1 + 1 = 3.
```

**Example 2:**
```
Input: nums1 = [0,1], nums2 = [1,1]
Output: 1
Explanation:
If i = 1 and j = 1:
nums1[1] = 1.
nums2[1] = 1.
The distance between i and j is j - i + 1 = 1 - 1 + 1 = 1.
```

**Example 3:**
```
Input: nums1 = [0], nums2 = [1]
Output: 0
Explanation:
There are no pairs of indices that meet the requirements.
```

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
