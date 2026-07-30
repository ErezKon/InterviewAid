# 1031. Maximum Sum of Two Non-Overlapping Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays](https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays)
**Companies:** Amazon, Google

---

## Problem Description
Given an integer array `nums` and two integers `firstLen` and `secondLen`, find the maximum sum of **two non‑overlapping subarrays** where one subarray has length `firstLen` and the other has length `secondLen`. The subarrays may appear in any order. Return the maximum possible total sum.

## Examples
**Example 1:**
```
Input: nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2
Output: 20
Explanation: Choose subarray [9] (length 1) and subarray [6,5] (length 2) → 9 + 11 = 20.
```

**Example 2:**
```
Input: nums = [3,8,1,3,2,1,8,9,0], firstLen = 3, secondLen = 2
Output: 29
Explanation: Subarray [8,9] (len 2) and [3,8,1] (len 3) give 17 + 12 = 29.
```

## Approach
The problem can be solved with **prefix sums** and a sliding window.
1. Compute a prefix sum array `pref` where `pref[i]` is the sum of the first `i` elements.
2. For each possible position of the first subarray, compute its sum in O(1) using the prefix sums.
3. Keep track of the best sum of a subarray of length `firstLen` seen so far on the left side and on the right side.
4. For each position of the second subarray, combine it with the best non‑overlapping first subarray on the left or right.
5. Perform the same procedure swapping the roles of `firstLen` and `secondLen` and take the overall maximum.

### Pseudocode
```text
FUNCTION maxSumTwoNoOverlap(nums, firstLen, secondLen):
    pref ← PREFIX_SUM(nums)   // pref[0]=0, pref[i+1]=pref[i]+nums[i]
    RETURN MAX(
        helper(pref, firstLen, secondLen),
        helper(pref, secondLen, firstLen)
    )

FUNCTION helper(pref, lenA, lenB):
    // best sum of lenA subarray up to each index
    bestA ← ARRAY of zeros size LENGTH(pref)
    maxA ← 0
    FOR i FROM lenA TO LENGTH(pref)-1:
        sumA ← pref[i] - pref[i-lenA]
        maxA ← MAX(maxA, sumA)
        bestA[i] ← maxA
    result ← 0
    FOR j FROM lenA + lenB TO LENGTH(pref)-1:
        sumB ← pref[j] - pref[j-lenB]
        // combine with best lenA subarray that ends before current lenB starts
        result ← MAX(result, sumB + bestA[j-lenB])
    RETURN result
```

## Walkthrough
For `nums = [0,6,5,2,2,5,1,9,4]`, `firstLen = 1`, `secondLen = 2`:
- Prefix sums: `[0,0,6,11,13,15,20,21,30,34]`.
- Compute best 1‑length sums up to each index → bestA = `[0,0,6,6,6,6,6,6,9,9]`.
- Iterate over 2‑length windows:
  * At `j=3` (window `[6,5]` sum=11) combine with bestA[1]=0 → 11.
  * At `j=8` (window `[1,9]` sum=10) combine with bestA[6]=6 → 16.
  * At `j=9` (window `[9,4]` sum=13) combine with bestA[7]=6 → 19.
- Swapping lengths yields a better combination of 9 (single) + 11 (pair) = 20.
Thus the answer is 20.

## Complexity Analysis
*Time:* O(n) – one pass to build prefix sums and two linear scans.
*Space:* O(n) for the prefix sum array (can be reduced to O(1) with rolling sums).

## Follow‑Up Questions
1. How would you modify the algorithm to handle **k** non‑overlapping subarrays of given lengths?
2. Can the solution be adapted for a circular array where subarrays may wrap around?
3. What changes are needed if the subarray lengths are not fixed but any lengths are allowed?

## Key Takeaway
Using prefix sums to obtain O(1) subarray sums together with a sliding‑window scan for the best left/right contributions yields a linear‑time solution for two non‑overlapping subarrays.
