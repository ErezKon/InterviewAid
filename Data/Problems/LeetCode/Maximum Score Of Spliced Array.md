# 2321. Maximum Score Of Spliced Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-spliced-array](https://leetcode.com/problems/maximum-score-of-spliced-array)
**Companies:** Microsoft

---

## Problem Description
You are given two integer arrays `nums1` and `nums2` of equal length `n`. Choose a subarray of length `k` (1 ≤ k ≤ n) from `nums1` and replace the corresponding elements in `nums2` with those from `nums1`. The score is the sum of the elements of the resulting `nums2`. Return the maximum possible score.

## Examples
**Example 1:**
```
Input: nums1 = [1,2,3,4,5], nums2 = [5,4,3,2,1], k = 3
Output: 15
Explanation: Replace subarray [3,4,5] in nums2 with [3,4,5] from nums1 → nums2 becomes [5,4,3,4,5]; sum = 21. The optimal choice yields 15 as the maximum increase over original sum.
```
**Example 2:**
```
Input: nums1 = [5,5,5], nums2 = [1,2,3], k = 2
Output: 16
Explanation: Replace the first two elements → nums2 = [5,5,3]; sum = 13. Original sum 6, increase 10, total 16.
```

## Approach
The effect of splicing a subarray of length `k` is to add the difference `nums1[i] - nums2[i]` for each index in the chosen window. Thus we need the maximum sum of a length‑`k` subarray in the difference array `diff[i] = nums1[i] - nums2[i]`. Compute `diff`, then use a sliding window to find the maximum window sum.

```text
FUNCTION maxScoreSplicedArray(nums1, nums2, k):
    SET n ← LENGTH(nums1)
    SET diff ← []
    FOR i ← 0 TO n-1:
        APPEND (nums1[i] - nums2[i]) TO diff
    // initial window sum
    SET windowSum ← SUM of first k elements of diff
    SET maxWindow ← windowSum
    FOR i ← k TO n-1:
        SET windowSum ← windowSum + diff[i] - diff[i - k]
        SET maxWindow ← MAX(maxWindow, windowSum)
    SET originalSum ← SUM of nums2
    RETURN originalSum + maxWindow
```
The sliding window runs in O(n).

## Walkthrough
For `nums1 = [1,2,3,4,5]`, `nums2 = [5,4,3,2,1]`, `k = 3`:
- diff = [-4,-2,0,2,4]
- Initial window sum (first 3) = -6
- Slide to indices 1‑3: sum = -2, max = -2
- Slide to indices 2‑4: sum = 6, max = 6
- originalSum = 15, result = 15 + 6 = 21 (maximum achievable).

## Complexity Analysis
- **Time:** O(n) to compute differences and slide the window.
- **Space:** O(n) for the diff array (can be O(1) if computed on the fly).

## Follow‑Up Questions
1. How would you adapt the solution if you could choose any number of non‑overlapping subarrays?
2. What if the score counted the product of replaced elements instead of the sum?
3. Can the problem be solved using prefix sums instead of an explicit sliding window?

## Key Takeaway
Transform the problem to finding the maximum‑sum subarray of length `k` in the difference array; a linear sliding‑window yields the optimal score.
