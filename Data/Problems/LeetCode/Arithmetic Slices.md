# 413. Arithmetic Slices

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/arithmetic-slices
**Companies:** Aetion, Amazon, Baidu, Google, Meta, Tiktok
---

## Problem Description
An integer array is called arithmetic if it consists of **at least three elements** and if the difference between any two consecutive elements is the same.

- For example, `[1,3,5,7,9]`, `[7,7,7,7]`, and `[3,-1,-5,-9]` are arithmetic sequences.

Given an integer array `nums`, return *the number of arithmetic **subarrays** of* `nums`.

A **subarray** is a contiguous subsequence of the array.

**Constraints:**
- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`

## Examples
```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 3
  Explanation: We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.
```
```
Example 2:
  Input: nums = [1]
  Output: 0
```

## Approach
Iterate once, maintaining `curr` – the number of arithmetic slices ending at the current index. If the last three elements keep the same difference, extend the previous slices (`curr += 1`) and add `curr` to the answer. Otherwise reset `curr`.

```text
FUNCTION numberOfArithmeticSlices(nums):
    n ← LENGTH(nums)
    count ← 0
    curr ← 0
    FOR i ← 2 TO n-1:
        IF nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:
            curr ← curr + 1
            count ← count + curr
        ELSE:
            curr ← 0
    RETURN count
```

## Walkthrough
For `nums = [1,2,3,4]`:
- i=2: diff equal → curr=1, count=1 (slice [1,2,3])
- i=3: diff equal → curr=2, count=3 (adds slices [2,3,4] and [1,2,3,4])
Result = 3.

## Complexity Analysis
*Time*: O(n) – single pass.
*Space*: O(1) – only a few counters.

## Follow-Up Questions
1. How would you modify the solution to return the list of all arithmetic slices?
2. Can you solve the problem using a sliding-window instead of DP?
3. What changes are needed if the array may contain floating-point numbers?

## Key Takeaway
A linear scan that tracks how many slices end at each position yields the total count in O(n) time.
