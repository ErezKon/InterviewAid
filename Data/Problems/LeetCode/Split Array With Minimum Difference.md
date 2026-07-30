# 3698. Split Array With Minimum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-with-minimum-difference](https://leetcode.com/problems/split-array-with-minimum-difference)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, split it into two non‑empty subarrays `left` and `right` (preserving original order) such that the absolute difference between the sum of `left` and the sum of `right` is minimized. Return the minimum possible absolute difference.

## Examples
- **Input:** `nums = [2, -1, 0, 4, -2, 3]`
  **Output:** `1`
  *Explanation:* Split after index 3 → left sum = 5, right sum = 4, difference = 1.
- **Input:** `nums = [1, 2, 3, 4, 5]`
  **Output:** `3`
  *Explanation:* Best split after index 2 → left sum = 6, right sum = 9.

## Approach
Compute prefix sums while iterating once. At each split point `i` (1 ≤ i < n), the left sum is `prefix[i]` and the right sum is `total - prefix[i]`. Track the minimum absolute difference.

```text
FUNCTION minimumDifference(nums):
    SET total ← SUM of all elements in nums
    SET prefix ← 0
    SET minDiff ← INFINITY
    FOR i ← 0 TO LENGTH(nums) - 2:   // cannot split after last element
        SET prefix ← prefix + nums[i]
        SET diff ← ABS(prefix - (total - prefix))
        IF diff < minDiff:
            SET minDiff ← diff
    RETURN minDiff
```

## Walkthrough
For `nums = [2, -1, 0, 4, -2, 3]`:
| i | prefix | right sum | diff |
|---|--------|-----------|------|
|0|2|6|4|
|1|1|7|6|
|2|1|7|6|
|3|5|3|2|
|4|3|5|2|
Minimum diff becomes `1` at split after index 3.

## Complexity Analysis
- **Time:** Single pass `O(n)`.
- **Space:** `O(1)` extra space.

## Follow‑Up Questions
1. How would you handle the case where the subarrays must have equal length?
2. Can the algorithm be extended to minimize the maximum sum of the two parts instead of the difference?
3. What if the array is circular and the split can wrap around?

## Key Takeaway
A single linear scan with running prefix sums yields the optimal split for minimizing the absolute difference between two parts.
