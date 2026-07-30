# 3187. Peaks in Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/peaks-in-array](https://leetcode.com/problems/peaks-in-array)
**Companies:** Siemens

---

## Problem Description
Given an integer array `arr`, a *peak* is an index `i` such that `arr[i] > arr[i-1]` and `arr[i] > arr[i+1]`. The array may contain multiple peaks. Return a list of all peak indices.

Constraints: `3 ≤ arr.length ≤ 10⁵`; `-10⁹ ≤ arr[i] ≤ 10⁹`; assume `arr[-1] = arr[n] = -∞` (virtual boundaries).

## Examples
| arr | Output | Explanation |
|-----|--------|-------------|
| [1,3,2,4,1] | [1,3] | Peaks at indices 1 (3) and 3 (4).
| [5,4,3,2,1] | [0] | Only first element is a peak (greater than virtual -∞ on left).

## Approach
A linear scan suffices because each element is compared only with its immediate neighbours.

1. Initialise an empty list `peaks`.
2. For each index `i` from `0` to `len(arr)-1`:
   - Let `left = arr[i-1]` if `i > 0` else `-∞`.
   - Let `right = arr[i+1]` if `i < len(arr)-1` else `-∞`.
   - If `arr[i] > left` **AND** `arr[i] > right`, append `i` to `peaks`.
3. Return `peaks`.

## Walkthrough
For `[1,3,2,4,1]`:
| i | left | arr[i] | right | condition | action |
|---|------|--------|-------|-----------|--------|
|0| -∞ |1|3| false |
|1|1|3|2| true → add 1 |
|2|3|2|4| false |
|3|2|4|1| true → add 3 |
|4|4|1|-∞| false |
Result `[1,3]`.

## Complexity Analysis
- Time: O(n) – single pass through the array.
- Space: O(p) – where `p` is the number of peaks (output size), plus O(1) auxiliary.

## Follow‑Up Questions
1. How would you modify the algorithm to find *local minima* as well?
2. Can you solve it in a single pass without storing the result until the end (streaming)?
3. What if the array is extremely large and stored on disk – how would you minimize I/O?

## Key Takeaway
A straightforward linear scan comparing each element with its neighbours efficiently identifies all peak positions.
