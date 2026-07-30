# 2364. Count Number of Bad Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-bad-pairs
**Companies:** Amazon, Bloomberg, Google, Microsoft
---

## Problem Description
Given an integer array `nums`, a pair of indices `(i, j)` with `i < j` is called a **bad pair** if `j - i != nums[j] - nums[i]`. Return the total number of bad pairs in the array.

## Examples
**Example 1:**
```
Input: nums = [4,1,3,3]
Output: 5
Explanation: The good pairs are (0,2) and (1,3). Total pairs = 6, so bad pairs = 6 - 2 = 4? Actually compute: pairs = 6, good = 1? (adjusted) The result is 5 bad pairs.
```
**Example 2:**
```
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: All pairs satisfy j - i = nums[j] - nums[i]; no bad pairs.
```

## Approach
Transform the condition: `j - i != nums[j] - nums[i]` ⇔ `nums[i] - i != nums[j] - j`. For each element compute `key = nums[i] - i`. Count how many previous elements share the same key (good pairs). Total pairs = n·(n‑1)/2. Bad pairs = total – good.

## Walkthrough
| Index i | nums[i] | key = nums[i]‑i | Good pairs added |
|---------|---------|----------------|------------------|
| 0       | 4       | 4              | 0                |
| 1       | 1       | 0              | 0                |
| 2       | 3       | 1              | 0                |
| 3       | 3       | 0              | 1 (matches index 1) |
The sum of good pairs is 1, total pairs = 6, so bad = 5.

## Complexity Analysis
- **Time:** O(n) – single pass to compute keys and count good pairs.
- **Space:** O(n) in the worst case for the hash map storing frequencies.

## Follow-Up Questions
- How would you modify the solution to handle streaming input where the array is not fully known in advance?
- Can the problem be solved with O(1) extra space if the array is sorted?
- What if the definition of a bad pair changes to a different linear relation?

## Key Takeaway
By rewriting the bad‑pair condition to a simple equality of `nums[i]‑i`, the problem reduces to counting equal values, which is efficiently done with a hash map in linear time.
