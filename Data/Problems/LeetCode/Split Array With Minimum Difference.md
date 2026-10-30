# 3698. Split Array With Minimum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-with-minimum-difference](https://leetcode.com/problems/split-array-with-minimum-difference)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below ignore the monotonicity requirement. Correct idea: prefix sums plus `inc[i]` (is `nums[0..i]` strictly increasing) and `dec[i]` (is `nums[i..n-1]` strictly decreasing); consider only cuts `i` with `inc[i] && dec[i+1]`, minimising `|s[i] − (total − s[i])|`; return `-1` if none. O(n).*

You are given an integer array `nums`.

Split the array into **exactly** two subarrays, `left` and `right`, such that `left` is **strictly increasing** and `right` is **strictly decreasing**.

Return the **minimum possible absolute difference** between the sums of `left` and `right`. If no valid split exists, return `-1`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,3,2]
Output: 2
Explanation:
| i | left   | right  | Validity | left sum | right sum | Absolute difference |
|---|--------|--------|----------|----------|-----------|---------------------|
| 0 | [1]    | [3, 2] | Yes      | 1        | 5         | |1 - 5| = 4         |
| 1 | [1, 3] | [2]    | Yes      | 4        | 2         | |4 - 2| = 2         |
Thus, the minimum absolute difference is 2.
```

**Example 2:**
```
Input: nums = [1,2,4,3]
Output: 4
Explanation:
| i | left      | right     | Validity | left sum | right sum | Absolute difference |
|---|-----------|-----------|----------|----------|-----------|---------------------|
| 0 | [1]       | [2, 4, 3] | No       | 1        | 9         | -                   |
| 1 | [1, 2]    | [4, 3]    | Yes      | 3        | 7         | |3 - 7| = 4         |
| 2 | [1, 2, 4] | [3]       | Yes      | 7        | 3         | |7 - 3| = 4         |
Thus, the minimum absolute difference is 4.
```

**Example 3:**
```
Input: nums = [3,1,2]
Output: -1
Explanation: No valid split exists, so the answer is -1.
```

## Approach
Compute prefix sums while iterating once. At each split point `i` (1 ≤ i < n), the left sum is `prefix[i]` and the right sum is `total - prefix[i]`. Track the minimum absolute difference.

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
Minimum diff becomes `1` at split after index 3.

## Complexity Analysis
- **Time:** Single pass `O(n)`.
- **Space:** `O(1)` extra space.

## Follow‑Up Questions
1. How would you handle the case where the subarrays must have equal length?
2. Can the algorithm be extended to minimize the maximum sum of the two parts instead of the difference?
3. What if the array is circular and the split can wrap around?

## Key Takeaway
A single linear scan with running prefix sums yields the optimal split for minimizing the absolute difference between two parts.
