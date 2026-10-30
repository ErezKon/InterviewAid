# 561. Array Partition

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/array-partition
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums` of `2n` integers, group these integers into `n` pairs `(a1, b1), (a2, b2), ..., (an, bn)` such that the sum of `min(ai, bi)` for all `i` is **maximized**. Return *the maximized sum*.

**Constraints:**
- `1 <= n <= 10^4`
- `nums.length == 2 * n`
- `-10^4 <= nums[i] <= 10^4`

## Examples
```
Example 1:
  Input: nums = [1,4,3,2]
  Output: 4
  Explanation: All possible pairings (ignoring the ordering of elements) are:
  1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
  2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
  3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
  So the maximum possible sum is 4.
```
```
Example 2:
  Input: nums = [6,2,6,5,1,2]
  Output: 9
  Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.
```

## Approach
Sort the array in non‑decreasing order. Pair consecutive elements; the smaller of each pair is at the even index. Summing elements at even positions yields the maximal score.

```text
FUNCTION arrayPairSum(nums):
    SORT nums ASCENDING
    sum ← 0
    FOR i ← 0 TO LENGTH(nums)-1 STEP 2:
        sum ← sum + nums[i]
    RETURN sum
```

## Walkthrough
For `[6,2,6,5,1,2]` after sorting: `[1,2,2,5,6,6]`. Adding indices 0,2,4 gives `1+2+6 = 9`.

## Complexity Analysis
*Time*: O(n log n) for sorting.
*Space*: O(1) extra if sorting in‑place.

## Follow‑Up Questions
1. How would you solve the problem in linear time using counting sort when the value range is limited?
2. Can you extend the approach to maximize the sum of maximums instead of minimums?
3. What if the array length is odd – how would you handle the leftover element?

## Key Takeaway
Sorting and pairing adjacent elements guarantees the maximum possible sum of minima.
