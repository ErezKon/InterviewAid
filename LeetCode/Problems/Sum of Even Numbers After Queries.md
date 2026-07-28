# 985. Sum of Even Numbers After Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-even-numbers-after-queries](https://leetcode.com/problems/sum-of-even-numbers-after-queries)
**Companies:** Indeed

---

## Problem Description
You are given an integer array `nums` and a list of queries `queries`. Each query is a pair `[val, idx]`. For each query, add `val` to `nums[idx]` and then compute the sum of all even numbers in the updated array. Return an array of these sums.

## Examples
**Example 1:**
Input: `nums = [1,2,3,4]`, `queries = [[1,0],[ -3,1],[ -4,0],[2,3]]`
Output: `[8,6,2,4]`
Explanation: After each query the array becomes `[2,2,3,4]`, `[2,-1,3,4]`, `[-2,-1,3,4]`, `[-2,-1,3,6]` with even sums 8,6,2,4.

## Approach
Maintain a running total of even elements. For each query, adjust the total based on the old and new value at `idx`: if the old value was even, subtract it; after updating, if the new value is even, add it.

## Walkthrough
| Query | old value | new value | even sum before | adjustment | even sum after |
|-------|-----------|-----------|----------------|------------|----------------|
| [1,0] | 1 (odd) | 2 (even) | 6 | +2 | 8 |
| [-3,1] | 2 (even) | -1 (odd) | 8 | -2 | 6 |
| ... |

## Complexity Analysis
Time: O(q) where q is number of queries.
Space: O(1) extra.

## Follow-Up Questions
* How would you modify the solution to handle range updates instead of single‑index updates?
* Can you support queries that ask for the sum of odd numbers as well?
* What if the array is extremely large and stored on disk?

## Key Takeaway
Tracking the even‑sum incrementally avoids recomputing it from scratch after each update.
