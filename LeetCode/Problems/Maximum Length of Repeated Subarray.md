# 718. Maximum Length of Repeated Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/maximum-length-of-repeated-subarray
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft, Netflix, Palantir

---

## Problem Description
Given two integer arrays `nums1` and `nums2`, find the length of the longest subarray that appears in both arrays. A subarray is a contiguous sequence of elements. Return the maximum possible length.

## Examples
- **Example 1:** `nums1 = [1,2,3,2,1]`, `nums2 = [3,2,1,4,7]` → Output: `3` (subarray `[3,2,1]`).
- **Example 2:** `nums1 = [0,0,0,0,0]`, `nums2 = [0,0,0,0,0]` → Output: `5` (the whole array).

## Approach
**Dynamic Programming — O(m·n)**

```text
FUNCTION findLength(nums1, nums2):
    m ← LENGTH(nums1)
    n ← LENGTH(nums2)
    dp ← MATRIX(m+1, n+1) FILLED WITH 0
    maxLen ← 0
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF nums1[i-1] == nums2[j-1]:
                dp[i][j] ← dp[i-1][j-1] + 1
                maxLen ← MAX(maxLen, dp[i][j])
    RETURN maxLen
```
The DP table stores the length of the longest common suffix for prefixes ending at `i` and `j`. The answer is the maximum entry.

## Walkthrough
| i | j | nums1[i-1] | nums2[j-1] | dp[i][j] |
|---|---|-----------|-----------|----------|
| 1 | 1 | 1 | 3 | 0 |
| 2 | 2 | 2 | 2 | 1 |
| 3 | 3 | 3 | 1 | 2 |
| 4 | 4 | 2 | 4 | 0 |
| 5 | 5 | 1 | 7 | 0 |
The maximum value `3` occurs at `dp[3][3]`, representing subarray `[3,2,1]`.

## Complexity Analysis
- **Time:** O(m·n) – each pair of indices is processed once.
- **Space:** O(m·n) for the DP matrix (can be reduced to O(min(m,n)) with rolling arrays).

## Follow-Up Questions
1. How would you solve the problem using binary search and rolling hash to achieve O((m+n)·log min(m,n)) time?
2. Can the solution be adapted to return the actual subarray, not just its length?
3. How does the approach change if the arrays contain very large integers and memory is constrained?

## Key Takeaway
The longest common subarray can be found efficiently with DP by tracking the length of matching suffixes for each pair of positions.
