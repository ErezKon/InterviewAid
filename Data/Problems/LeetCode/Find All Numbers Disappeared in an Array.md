# 448. Find All Numbers Disappeared in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tinkoff

---

## Problem Description
Given an integer array `nums` of length `n` where each element is in the range `[1, n]`, some numbers appear twice and others once. Return all the numbers in the range `[1, n]` that do **not** appear in `nums`.

## Examples
**Example 1:**
```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Explanation: Numbers 5 and 6 are missing from the array.
```
**Example 2:**
```
Input: nums = [1,1]
Output: [2]
Explanation: The array should contain numbers 1 and 2; 2 is missing.
```

## Approach
We use **index marking**: for each value `v` in the array, treat `|v| - 1` as an index and negate the element at that index to mark its presence. After processing, indices with positive values correspond to missing numbers.

```text
FUNCTION findDisappearedNumbers(nums):
    FOR i ← 0 TO LENGTH(nums) - 1:
        idx ← ABS(nums[i]) - 1
        IF nums[idx] > 0:
            nums[idx] ← -nums[idx]
    result ← []
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] > 0:
            APPEND i + 1 TO result
    RETURN result
```
The algorithm runs in‑place, using only constant extra space.

## Walkthrough
For `nums = [4,3,2,7,8,2,3,1]`:
| i | nums[i] | idx | Action | Array after action |
|---|---------|-----|--------|--------------------|
|0|4|3|negate nums[3]|[4,3,2,-7,8,2,3,1]
|1|3|2|negate nums[2]|[4,3,-2,-7,8,2,3,1]
|2|-2|1|negate nums[1]|[4,-3,-2,-7,8,2,3,1]
|3|-7|6|negate nums[6]|[4,-3,-2,-7,8,2,-3,1]
|4|8|7|negate nums[7]|[4,-3,-2,-7,8,2,-3,-1]
|5|2|1|already negative|[4,-3,-2,-7,8,2,-3,-1]
|6|-3|2|already negative|[4,-3,-2,-7,8,2,-3,-1]
|7|-1|0|negate nums[0]|[-4,-3,-2,-7,8,2,-3,-1]
Second pass finds positive entries at indices 4 and 5 → numbers 5 and 6.

## Complexity Analysis
- **Time:** O(n) – one pass to mark, one pass to collect results.
- **Space:** O(1) extra space (ignoring output list).

## Follow-Up Questions
1. How would you modify the solution to work when numbers are not limited to `[1, n]`?
2. Can you solve the problem using a hash set while still achieving O(n) time?
3. How would you adapt the algorithm to return the missing numbers in sorted order without an extra sort step?

## Key Takeaway
Negating the element at the index derived from each value lets you flag presence in‑place, yielding a linear‑time, constant‑space solution.
