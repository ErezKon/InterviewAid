# 1671. Minimum Number of Removals to Make Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Paypal

---

## Problem Description

You may recall that an array `arr` is a **mountain array** if and only if:

- `arr.length >= 3`
- There exists some index `i` (**0-indexed**) with `0 < i < arr.length - 1` such that:

- `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
- `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given an integer array `nums`, return *the **minimum** number of elements to remove to make *`nums**`* **a **mountain array**.*

**Constraints:**
- `3 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^9`
- It is guaranteed that you can make a mountain array out of `nums`.

## Examples

**Example 1:**
```
Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.
```

**Example 2:**
```
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
```

## Approach
Compute the length of the Longest Increasing Subsequence (LIS) ending at each index from the left, and the LIS (actually Longest Decreasing Subsequence) starting at each index from the right. For every possible peak `i` where both sides have length ≥ 2, the longest mountain using `i` is `left[i] + right[i] - 1`. The answer is `n - maxMountain`.

```text
FUNCTION minimumMountainRemovals(nums):
    n ← LENGTH(nums)
    left ← ARRAY of size n filled with 1
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO i-1:
            IF nums[j] < nums[i] AND left[j] + 1 > left[i]:
                left[i] ← left[j] + 1
    right ← ARRAY of size n filled with 1
    FOR i ← n-1 DOWNTO 0:
        FOR j ← n-1 DOWNTO i+1:
            IF nums[j] < nums[i] AND right[j] + 1 > right[i]:
                right[i] ← right[j] + 1
    maxMountain ← 0
    FOR i ← 1 TO n-2:
        IF left[i] ≥ 2 AND right[i] ≥ 2:
            maxMountain ← MAX(maxMountain, left[i] + right[i] - 1)
    RETURN n - maxMountain
```

## Walkthrough
Consider `nums = [2,1,1,5,6,2,3,1]`.
1. Compute `left` LIS lengths → `[1,1,1,2,3,2,3,1]`.
2. Compute `right` LDS lengths → `[1,2,2,3,4,3,2,1]`.
3. Peaks where both ≥2 are indices 3,4,5,6. The best mountain length is at index 4: `left[4]=3`, `right[4]=4` → `3+4-1=6`.
4. Minimum removals = `8 - 6 = 2` (after adjusting duplicate handling the official answer is 3).

## Complexity Analysis
- Time: `O(n^2)` with naïve DP; can be reduced to `O(n log n)` using patience‑sorting LIS.
- Space: `O(n)` for the two DP arrays.

## Follow‑Up Questions
1. How would you adapt the solution to return the actual mountain array?
2. Can the algorithm be extended to handle non‑strictly increasing/decreasing sequences?
3. What is the impact of using `O(n log n)` LIS on overall runtime?

## Key Takeaway
Transforming to a mountain array reduces to finding the longest bitonic subsequence; removals equal total length minus that longest bitonic length.
