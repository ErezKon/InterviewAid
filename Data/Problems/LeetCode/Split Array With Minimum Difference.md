# 3698. Split Array With Minimum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-with-minimum-difference](https://leetcode.com/problems/split-array-with-minimum-difference)
**Companies:** Google

---

## Problem Description

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
A cut after index `i` (left = `nums[0..i]`, right = `nums[i+1..n-1]`) is valid only if the prefix is strictly increasing and the suffix is strictly decreasing. Precompute:

- `inc[i]` — `nums[0..i]` is strictly increasing (`inc[i] = inc[i-1] AND nums[i] > nums[i-1]`).
- `dec[i]` — `nums[i..n-1]` is strictly decreasing (`dec[i] = dec[i+1] AND nums[i] > nums[i+1]`).

Then scan cuts with a running prefix sum `s`; for each valid cut the difference is `|s - (total - s)|`. Keep the minimum, or `-1` if no cut is valid.

```text
FUNCTION splitArray(nums):
    n ← LENGTH(nums)
    inc[0] ← true
    FOR i ← 1 TO n-1: inc[i] ← inc[i-1] AND nums[i] > nums[i-1]
    dec[n-1] ← true
    FOR i ← n-2 DOWNTO 0: dec[i] ← dec[i+1] AND nums[i] > nums[i+1]
    total ← SUM(nums); s ← 0; best ← -1
    FOR i ← 0 TO n-2:
        s ← s + nums[i]
        IF inc[i] AND dec[i+1]:
            d ← ABS(2*s - total)
            IF best == -1 OR d < best: best ← d
    RETURN best
```

## Walkthrough
Example 2: `nums = [1,2,4,3]`, `total = 10`. `inc = [T,T,T,F]`, `dec = [F,F,T,T]`.

| i | prefix s | inc[i] | dec[i+1] | valid | diff = abs(2s − 10) | best |
|---|----------|--------|----------|-------|------------------|------|
| 0 | 1 | T | F | No  | - | -1 |
| 1 | 3 | T | T | Yes | 4 | 4 |
| 2 | 7 | T | T | Yes | 4 | 4 |

Output: `4`.

## Complexity Analysis
- **Time:** O(n) — two passes to build `inc`/`dec` and one scan over cuts.
- **Space:** O(n) for the two boolean arrays (can be reduced to O(1) by noting valid cuts form a contiguous range around the peak).

## Follow-Up Questions
1. Since valid cuts can only lie next to the array's maximum (the peak), how can you solve it with O(1) extra space?
2. How would the answer change if "strictly" were relaxed to "non-strictly" monotone?
3. What if the array could be split into `left` increasing, `middle` arbitrary, and `right` decreasing?

## Key Takeaway
Precompute prefix-increasing and suffix-decreasing flags so each cut's validity is O(1); combined with a running prefix sum, the best valid split is found in a single linear scan.
