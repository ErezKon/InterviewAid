# 852. Peak Index in a Mountain Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peak-index-in-a-mountain-array](https://leetcode.com/problems/peak-index-in-a-mountain-array)
**Companies:** Accenture, Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Qualcomm, Tcs

---

## Problem Description
You are given an integer **mountain** array `arr` of length `n` where the values increase to a **peak element** and then decrease.

Return the index of the peak element.

Your task is to solve it in `O(log(n))` time complexity.

**Constraints:**

- `3 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^6`
- `arr` is **guaranteed** to be a mountain array.

## Examples

```
Example 1:
  Input: arr = [0,1,0]
  Output: 1
```

```
Example 2:
  Input: arr = [0,2,1,0]
  Output: 1
```

```
Example 3:
  Input: arr = [0,10,5,2]
  Output: 1
```
<!-- Peak at index 1 with value 2. -->

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
- Time: O(log n) – each iteration halves the search space.
- Space: O(1) – only constant extra variables.

## Follow-Up Questions
1. How would you find the peak in an array that may contain multiple peaks?
2. Can you adapt the algorithm to work with a “valley” array (decreasing then increasing)?
3. What if the array is streamed and you cannot access random indices?

## Key Takeaway
Binary search on the monotonic slope efficiently locates the unique peak in a mountain array using O(log n) time and O(1) space.
