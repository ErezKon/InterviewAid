# 3731. Find Missing Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-missing-elements](https://leetcode.com/problems/find-missing-elements)
**Companies:** Bloomberg, Google

---

## Problem Description
Given a **sorted** array `nums` of distinct integers and two integers `lower` and `upper` representing a closed interval `[lower, upper]`, return all the numbers in the interval that are **missing** from `nums`. The result should be returned as a list of integers in ascending order.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [2,5,7]`, `lower = 1`, `upper = 8` | `[1,3,4,6,8]` | Numbers 1,3,4,6,8 are not present in `nums`.
| `nums = []`, `lower = 3`, `upper = 5` | `[3,4,5]` | All numbers in the interval are missing.
| `nums = [1,2,3]`, `lower = 1`, `upper = 3` | `[]` | No missing numbers.

## Approach
Iterate through the interval from `lower` to `upper` while maintaining an index into `nums`. For each value `v`:
- If `v` equals `nums[idx]`, advance `idx`.
- Otherwise, `v` is missing and is added to the answer list.
Because `nums` is sorted, this runs in linear time relative to the size of the interval.

## Walkthrough
Consider `nums = [2,5,7]`, `lower = 1`, `upper = 8`:
| v | idx | nums[idx] | Action | Missing List |
|---|-----|-----------|--------|--------------|
| 1 | 0 | 2 | v < nums[idx] → add 1 | [1]
| 2 | 0 | 2 | equal → idx = 1 | [1]
| 3 | 1 | 5 | v < nums[idx] → add 3 | [1,3]
| 4 | 1 | 5 | add 4 | [1,3,4]
| 5 | 1 | 5 | equal → idx = 2 | [1,3,4]
| 6 | 2 | 7 | add 6 | [1,3,4,6]
| 7 | 2 | 7 | equal → idx = 3 | [1,3,4,6]
| 8 | 3 | - | add 8 | [1,3,4,6,8]

## Complexity Analysis
- **Time:** O(`upper` - `lower` + 1) – one pass over the interval.
- **Space:** O(k) where k is the number of missing elements (output size).

## Follow-Up Questions
- How would you modify the algorithm if `nums` could contain duplicates?
- Can you return the missing ranges in a compact string format like `"1->3,5"`?
- What if the interval size is huge (e.g., up to 10⁹) but `nums` is small?

## Key Takeaway
A single linear scan using the sorted property of the input array efficiently yields all missing numbers within a given range.
