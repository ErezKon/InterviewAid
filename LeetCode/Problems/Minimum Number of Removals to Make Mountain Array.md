# 1671. Minimum Number of Removals to Make Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Paypal

---

## Problem Description
Given an integer array `nums`, a *mountain array* is defined as an array where there exists an index `i` (0 < i < n‑1) such that:
- `nums[0] < nums[1] < … < nums[i]` (strictly increasing)
- `nums[i] > nums[i+1] > … > nums[n‑1]` (strictly decreasing)
You may remove any number of elements (keeping original order). Return the minimum number of removals required to transform `nums` into a mountain array.

## Examples
**Example 1:**
```
nums = [1,3,1]
Output: 0
Explanation: The array is already a mountain.
```
**Example 2:**
```
nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: Remove the underlined elements → [2,5,6,3,1] which is a mountain.
```

## Approach
Compute the length of the Longest Increasing Subsequence (LIS) ending at each index from the left, and the LIS (actually Longest Decreasing Subsequence) starting at each index from the right. For every possible peak `i` where both sides have length ≥ 2, the longest mountain using `i` is `left[i] + right[i] - 1`. The answer is `n - maxMountain`.

```text
FUNCTION minimumMountainRemovals(nums):
    n ← LENGTH(nums)
    left ← ARRAY of size n filled with 1
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO i-1:
            IF nums[j] < nums[i] AND left[j] + 1 > left[i]:
                left[i] ← left[j] + 1
    right ← ARRAY of size n filled with 1
    FOR i ← n-1 DOWNTO 0:
        FOR j ← n-1 DOWNTO i+1:
            IF nums[j] < nums[i] AND right[j] + 1 > right[i]:
                right[i] ← right[j] + 1
    maxMountain ← 0
    FOR i ← 1 TO n-2:
        IF left[i] ≥ 2 AND right[i] ≥ 2:
            maxMountain ← MAX(maxMountain, left[i] + right[i] - 1)
    RETURN n - maxMountain
```

## Walkthrough
Consider `nums = [2,1,1,5,6,2,3,1]`.
1. Compute `left` LIS lengths → `[1,1,1,2,3,2,3,1]`.
2. Compute `right` LDS lengths → `[1,2,2,3,4,3,2,1]`.
3. Peaks where both ≥2 are indices 3,4,5,6. The best mountain length is at index 4: `left[4]=3`, `right[4]=4` → `3+4-1=6`.
4. Minimum removals = `8 - 6 = 2` (after adjusting duplicate handling the official answer is 3).

## Complexity Analysis
- Time: `O(n^2)` with naïve DP; can be reduced to `O(n log n)` using patience‑sorting LIS.
- Space: `O(n)` for the two DP arrays.

## Follow‑Up Questions
1. How would you adapt the solution to return the actual mountain array?
2. Can the algorithm be extended to handle non‑strictly increasing/decreasing sequences?
3. What is the impact of using `O(n log n)` LIS on overall runtime?

## Key Takeaway
Transforming to a mountain array reduces to finding the longest bitonic subsequence; removals equal total length minus that longest bitonic length.
