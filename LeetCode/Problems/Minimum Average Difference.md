# 2256. Minimum Average Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-average-difference](https://leetcode.com/problems/minimum-average-difference)
**Companies:** Amazon, Meta

---

## Problem Description

Given an integer array `nums` of length `n`, for each index `i` compute the absolute difference between the average of the first `i+1` elements and the average of the remaining `n-i-1` elements (the latter average is considered `0` when `i` is the last index). Return the index with the smallest such difference; if there are multiple, return the smallest index.

Constraints:
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [2,5,3,9,5,3]
Output: 3
Explanation: The average differences are [2,2,1,1,2,3]; the minimum is 1 at indices 2 and 3, so return the smaller index 2.
```

**Example 2:**
```
Input: nums = [0]
Output: 0
Explanation: Only one element, left average = 0, right average = 0, difference = 0.
```

---

## Approach

**Algorithm:** Prefix sums. Iterate once, maintaining the sum of elements seen so far. For each position compute:
- `leftAvg = floor(leftSum / (i+1))`
- `rightAvg = floor((total - leftSum) / (n-i-1))` (or `0` if denominator is `0`).
Track the minimum absolute difference and its index.

Pseudocode:
```text
FUNCTION minimumAverageDifference(nums):
    n ← LEN(nums)
    total ← SUM(nums)
    leftSum ← 0
    minDiff ← INFINITY
    answer ← 0
    FOR i ← 0 TO n-1 DO
        leftSum ← leftSum + nums[i]
        leftAvg ← leftSum DIV (i + 1)
        IF i < n-1 THEN
            rightAvg ← (total - leftSum) DIV (n - i - 1)
        ELSE
            rightAvg ← 0
        diff ← ABS(leftAvg - rightAvg)
        IF diff < minDiff THEN
            minDiff ← diff
            answer ← i
    RETURN answer
```
---

## Walkthrough

For `nums = [2,5,3,9,5,3]`:
1. `total = 27`.
2. Iterate computing left/right averages and differences; the smallest difference `1` occurs at indices `2` and `3`, so the function returns `2`.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum scan | O(n) | O(1) |
---

## Follow‑Up Questions

1. How would you modify the solution to return all indices achieving the minimum difference?
2. Can the algorithm be adapted to work with floating‑point averages without integer division?
3. What changes are needed if the array is streamed and you cannot store it entirely?
---

## Key Takeaway

> A single pass with prefix sums lets you compute left and right averages for every split point, yielding an O(n) solution.
