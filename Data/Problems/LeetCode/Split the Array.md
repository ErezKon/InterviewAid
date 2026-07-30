# 3046. Split the Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-the-array](https://leetcode.com/problems/split-the-array)
**Companies:** Adobe, Google, Meta, Visa

---

## Problem Description
Given an integer array `nums`, determine whether it is possible to split the array into two non‑empty groups such that each distinct value appears in at most two groups. In other words, after the split, no number should occur more than twice across both groups combined.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4]
Output: true
Explanation: Split into [1,2] and [3,4]; each number appears only once.
```
**Example 2:**
```
Input: nums = [1,1,1,2]
Output: false
Explanation: The number 1 appears three times, which cannot be distributed without exceeding the limit.
```
**Example 3:**
```
Input: nums = [5,5,6,6,7]
Output: true
Explanation: One possible split is [5,6,7] and [5,6]; each distinct value appears at most twice.
```

## Approach
The condition is satisfied iff the maximum frequency of any element does not exceed 2. This follows because we can always place each occurrence of a value into separate groups until the limit is reached.

```text
FUNCTION isPossibleToSplit(nums):
    SET freqMap ← EMPTY MAP
    FOR num IN nums:
        INCREMENT freqMap[num] BY 1
        IF freqMap[num] > 2:
            RETURN false
    RETURN true
```

## Walkthrough
| Step | num | freqMap after step | Decision |
|------|-----|-------------------|----------|
| 1 | 1 | {1:1} | continue |
| 2 | 1 | {1:2} | continue |
| 3 | 1 | {1:3} | exceeds 2 → return false |
The algorithm stops as soon as a frequency exceeds two.

## Complexity Analysis
- **Time:** O(n), where n is the length of `nums`.
- **Space:** O(k), where k is the number of distinct elements (at most n).

## Follow‑Up Questions
1. How would the solution change if each group must have the same size?
2. Can you extend the approach to allow a maximum frequency of `m` instead of 2?
3. What if the array must be split into more than two groups while keeping the same frequency constraint?

## Key Takeaway
Checking the maximum element frequency against the allowed limit directly determines split feasibility.
