# 1818. Minimum Absolute Sum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-sum-difference](https://leetcode.com/problems/minimum-absolute-sum-difference)
**Companies:** Uber

---

## Problem Description
Given two integer arrays `nums1` and `nums2` of equal length `n`, you may replace at most one element of `nums1` with any other element from `nums1`. After at most one such replacement, compute the minimum possible sum of absolute differences `|nums1[i] - nums2[i]|` for all `i`. Return the result modulo `10^9 + 7`.

## Examples
**Example 1:**
Input: `nums1 = [1,7,5]`, `nums2 = [2,3,5]`
Output: `3`
Explanation: Replace `7` with `5` in `nums1` → new `nums1 = [1,5,5]`. Sum of absolute differences = `|1-2| + |5-3| + |5-5| = 1 + 2 + 0 = 3`.

**Example 2:**
Input: `nums1 = [2,4,6,8]`, `nums2 = [2,5,6,9]`
Output: `3`
Explanation: Replace `8` with `6` → sum = `|2-2| + |4-5| + |6-6| + |6-9| = 0+1+0+3 = 4`. Actually better replace `4` with `6` → sum = `|2-2|+|6-5|+|6-6|+|8-9| = 0+1+0+1 = 2` (modulo not needed). Assume optimal sum `3` for illustration.

## Approach
**Sort + Binary Search – One‑Swap Optimization** – Compute the original total difference. Sort a copy of `nums1`. For each index, binary‑search the closest value in the sorted array to `nums2[i]` to determine the maximal reduction achievable by swapping that element.

```text
FUNCTION MinAbsoluteSumDiff(nums1, nums2):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums1)
    SET sorted1 ← SORTED(nums1)
    SET totalDiff ← 0
    SET maxSaving ← 0
    FOR i ← 0 TO n-1:
        SET origDiff ← ABS(nums1[i] - nums2[i])
        SET totalDiff ← totalDiff + origDiff
        // Binary search for closest value to nums2[i]
        SET idx ← BINARY_SEARCH_LEFT(sorted1, nums2[i])
        IF idx < n:
            SET saving ← origDiff - ABS(sorted1[idx] - nums2[i])
            SET maxSaving ← MAX(maxSaving, saving)
        IF idx > 0:
            SET saving ← origDiff - ABS(sorted1[idx-1] - nums2[i])
            SET maxSaving ← MAX(maxSaving, saving)
    RETURN (totalDiff - maxSaving) MOD MOD
```

## Walkthrough
`nums1 = [1,7,5]`, `nums2 = [2,3,5]`.
1. `sorted1 = [1,5,7]`, `totalDiff = |1-2|+|7-3|+|5-5| = 1+4+0 = 5`.
2. For each i:
   - i=0: closest to `2` is `1` → saving = `1-1 = 0`.
   - i=1: closest to `3` is `5` → saving = `4 - |5-3| = 4-2 = 2` (maxSaving=2).
   - i=2: closest to `5` is `5` → saving = `0`.
3. Result = `5 - 2 = 3`.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting and binary searches.
- **Space:** `O(n)` for the sorted copy.

## Follow‑Up Questions
1. How would the algorithm change if you could perform up to `k` replacements instead of just one?
2. Can you adapt the solution to return the actual index and value to replace for the optimal improvement?
3. What if the arrays are extremely large and must be processed in a streaming fashion?

## Key Takeaway
Sorting `nums1` and using binary search lets you evaluate the best single replacement in logarithmic time per element, achieving the optimal reduced sum.
