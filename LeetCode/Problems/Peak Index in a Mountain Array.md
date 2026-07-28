# 852. Peak Index in a Mountain Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peak-index-in-a-mountain-array](https://leetcode.com/problems/peak-index-in-a-mountain-array)
**Companies:** Accenture, Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Qualcomm, Tcs

---

## Problem Description
Given an integer array `arr` that is guaranteed to be a mountain array (strictly increasing then strictly decreasing), return the index of the peak element—the element that is greater than its neighbors.

Constraints: `3 ≤ arr.length ≤ 10⁵`; `0 ≤ arr[i] ≤ 10⁹`; there exists exactly one peak.

## Examples
| arr | Output | Explanation |
|-----|--------|-------------|
| [1,3,5,4,2] | 2 | `arr[2]=5` is greater than `arr[1]=3` and `arr[3]=4`.
| [0,2,1,0] | 1 | Peak at index 1 with value 2.

## Approach
Use binary search on the slope direction.

1. Initialise `lo = 0`, `hi = len(arr) - 1`.
2. While `lo < hi`:
   - Compute `mid = (lo + hi) // 2`.
   - If `arr[mid] < arr[mid + 1]`, the slope is ascending, so the peak lies to the right → `lo = mid + 1`.
   - Else the slope is descending or at peak → `hi = mid`.
3. When loop ends, `lo` (or `hi`) points to the peak index.

## Walkthrough
For `[1,3,5,4,2]`:
| step | lo | hi | mid | arr[mid] vs arr[mid+1] | action |
|------|----|----|-----|-----------------------|--------|
| 1 | 0 | 4 | 2 | 5 > 4 → descending | hi = 2 |
| 2 | 0 | 2 | 1 | 3 < 5 → ascending | lo = 2 |
Loop ends, `lo = 2` → peak index.

## Complexity Analysis
- Time: O(log n) – each iteration halves the search space.
- Space: O(1) – only constant extra variables.

## Follow‑Up Questions
1. How would you find the peak in an array that may contain multiple peaks?
2. Can you adapt the algorithm to work with a “valley” array (decreasing then increasing)?
3. What if the array is streamed and you cannot access random indices?

## Key Takeaway
Binary search on the monotonic slope efficiently locates the unique peak in a mountain array using O(log n) time and O(1) space.
