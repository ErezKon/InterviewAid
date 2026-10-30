# 2321. Maximum Score Of Spliced Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-spliced-array](https://leetcode.com/problems/maximum-score-of-spliced-array)
**Companies:** Microsoft

---

## Problem Description

> *Note: the Approach below assumes a fixed length `k` and one direction. Officially the swapped subarray has any length (or none), and the score is `max(sum(nums1), sum(nums2))` after the swap. Correct idea: run Kadane on `nums2 − nums1` for the best gain to `nums1`, and on `nums1 − nums2` for the gain to `nums2`. Return `max(sum1 + max(0, g1), sum2 + max(0, g2))`.*

You are given two **0-indexed** integer arrays `nums1` and `nums2`, both of length `n`.

You can choose two integers `left` and `right` where `0 <= left <= right < n` and **swap** the subarray `nums1[left...right]` with the subarray `nums2[left...right]`.

- For example, if `nums1 = [1,2,3,4,5]` and `nums2 = [11,12,13,14,15]` and you choose `left = 1` and `right = 2`, `nums1` becomes `[1,**12,13**,4,5]` and `nums2` becomes `[11,**2,3**,14,15]`.

You may choose to apply the mentioned operation **once** or not do anything.

The **score** of the arrays is the **maximum** of `sum(nums1)` and `sum(nums2)`, where `sum(arr)` is the sum of all the elements in the array `arr`.

Return *the **maximum possible score***.

A **subarray** is a contiguous sequence of elements within an array. `arr[left...right]` denotes the subarray that contains the elements of `nums` between indices `left` and `right` (**inclusive**).

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `1 <= nums1[i], nums2[i] <= 10^4`

## Examples

**Example 1:**
```
Input: nums1 = [60,60,60], nums2 = [10,90,10]
Output: 210
Explanation: Choosing left = 1 and right = 1, we have nums1 = [60,90,60] and nums2 = [10,60,10].
The score is max(sum(nums1), sum(nums2)) = max(210, 80) = 210.
```

**Example 2:**
```
Input: nums1 = [20,40,20,70,30], nums2 = [50,20,50,40,20]
Output: 220
Explanation: Choosing left = 3, right = 4, we have nums1 = [20,40,20,40,20] and nums2 = [50,20,50,70,30].
The score is max(sum(nums1), sum(nums2)) = max(140, 220) = 220.
```

**Example 3:**
```
Input: nums1 = [7,11,13], nums2 = [1,1,1]
Output: 31
Explanation: We choose not to swap any subarray.
The score is max(sum(nums1), sum(nums2)) = max(31, 3) = 31.
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
