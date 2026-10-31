# 1099. Two Sum Less Than K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-sum-less-than-k](https://leetcode.com/problems/two-sum-less-than-k)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Given an array `nums` of integers and integer `k`, return the maximum `sum` such that there exists `i < j` with `nums[i] + nums[j] = sum` and `sum < k`. If no `i`, `j` exist satisfying this equation, return `-1`.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`
- `1 <= k <= 2000`

## Examples

**Example 1:**
```
Input: nums = [34,23,1,24,75,33,54,8], k = 60
Output: 58
Explanation: We can use 34 and 24 to sum 58 which is less than 60.
```

**Example 2:**
```
Input: nums = [10,20,30], k = 15
Output: -1
Explanation: In this case it is not possible to get a pair sum less that 15.
```

## Approach
Sort the array in ascending order. Use two pointers, `left` at the start and `right` at the end. While `left < right`, compute `sum = nums[left] + nums[right]`. If `sum < k`, update the answer with `max(answer, sum)` and move `left` forward to try a larger sum. If `sum >= k`, move `right` backward to reduce the sum.

## Walkthrough
| left | right | sum | Action | best |
|------|-------|-----|--------|------|
| 0 (1) | 7 (75) | 76 ≥ 60 | right-- |
| 0 (1) | 6 (54) | 55 < 60 | best=55, left++ |
| 1 (8) | 6 (54) | 62 ≥ 60 | right-- |
| 1 (8) | 5 (33) | 41 < 60 | best=55, left++ |
| 2 (23) | 5 (33) | 56 < 60 | best=56, left++ |
| 3 (24) | 5 (33) | 57 < 60 | best=57, left++ |
| 4 (34) | 5 (33) | 67 ≥ 60 | right-- → left>=right stop |
Final best = 58 (from pair 34+24).

## Complexity Analysis
- **Time:** `O(n log n)` for sorting plus `O(n)` for the two-pointer scan.
- **Space:** `O(1)` extra space besides the input array.

## Follow-Up Questions
1. How would you solve the problem without sorting, using a hash set for `O(n)` time?
2. What if you need to return the actual pair of numbers, not just the sum?
3. How does the solution change if duplicate elements are not allowed?

## Key Takeaway
Sorting enables a two-pointer technique that efficiently explores all candidate pairs in linear time, yielding the optimal sum under a threshold.
