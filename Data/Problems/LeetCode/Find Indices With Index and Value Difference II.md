# 2905. Find Indices With Index and Value Difference II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-indices-with-index-and-value-difference-ii](https://leetcode.com/problems/find-indices-with-index-and-value-difference-ii)
**Companies:** Paytm

---

## Problem Description
Given an integer array `nums`, find the maximum distance `j - i` such that `i < j` and `i - nums[i] == j - nums[j]`. If no such pair exists, return `0`.

## Examples
**Example 1**
```
Input: nums = [1,2,3,4,5]
Output: 4
Explanation: For i=0 and j=4, i - nums[i] = 0-1 = -1, j - nums[j] = 4-5 = -1.
```
**Example 2**
```
Input: nums = [5,4,3,2,1]
Output: 0
Explanation: No pair satisfies the condition.
```

## Approach
Use a hash map to store the earliest index for each value of `i - nums[i]`. While scanning, compute the current key and, if it exists, update the answer with `i - earliestIndex[key]`. This yields O(n) time.

## Walkthrough
| i | nums[i] | key = i - nums[i] | earliest index for key | distance | max distance |
|---|---------|------------------|------------------------|----------|--------------|
| 0 | 1       | -1               | 0 (store)              | –        | 0 |
| 1 | 2       | -1               | 0                      | 1-0=1    | 1 |
| 2 | 3       | -1               | 0                      | 2-0=2    | 2 |
| 3 | 4       | -1               | 0                      | 3-0=3    | 3 |
| 4 | 5       | -1               | 0                      | 4-0=4    | 4 |

## Complexity Analysis
- **Time:** O(n) where *n* is the length of `nums`.
- **Space:** O(n) for the hash map storing at most one entry per distinct key.

## Follow-Up Questions
1. How would you adapt the solution if the condition were `i + nums[i] == j + nums[j]`?
2. Can the problem be solved in a single pass without extra space using two‑pointer technique?
3. What if you need to return the actual pair of indices instead of just the distance?

## Key Takeaway
Storing the first occurrence of each `i - nums[i]` value in a hash map lets you compute the maximum index distance in linear time.