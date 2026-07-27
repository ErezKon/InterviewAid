# 413. Arithmetic Slices

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/arithmetic-slices
**Companies:** Aetion, Amazon, Baidu, Google, Meta, Tiktok
---

## Problem Description
Given an integer array `nums`, an *arithmetic slice* is a subarray of length ≥ 3 where the difference between consecutive elements is constant. Return the total number of arithmetic slices in the array.

## Examples
**Example 1**
```
Input: nums = [1,2,3,4]
Output: 3
Explanation: The arithmetic slices are [1,2,3], [2,3,4], and [1,2,3,4].
```
**Example 2**
```
Input: nums = [1,2,4,6]
Output: 0
Explanation: No subarray of length ≥3 forms an arithmetic progression.
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

## Follow‑Up Questions
1. How would you modify the solution to return the list of all arithmetic slices?
2. Can you solve the problem using a sliding‑window instead of DP?
3. What changes are needed if the array may contain floating‑point numbers?

## Key Takeaway
A linear scan that tracks how many slices end at each position yields the total count in O(n) time.
