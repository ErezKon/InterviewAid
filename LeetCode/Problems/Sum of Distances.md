# 2615. Sum of Distances

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-distances](https://leetcode.com/problems/sum-of-distances)
**Companies:** Amazon, Bny Mellon, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, for each index `i` compute the sum of absolute distances between `i` and all other indices `j` where `nums[j] == nums[i]`. Return the array of these sums.

## Examples
**Example 1:**
Input: `nums = [1,2,1,1,3]`
Output: `[5,0,3,4,0]`
Explanation: For index 0 (value 1), distances to other 1s at indices 2 and 3 are |0‑2|+|0‑3| = 5.

**Example 2:**
Input: `nums = [10,5,10,10]`
Output: `[5,0,3,4]`

## Approach
Group indices by value. For each group, pre‑compute prefix sums of the sorted indices. For an index at position `i` in its group, the distance sum equals `idx*i - prefix[i]` (left side) plus `(prefix[n] - prefix[i+1]) - idx*(n-i-1)` (right side).

## Walkthrough
| Value | Indices | Prefix sums | Calculation for idx=2 |
|-------|---------|-------------|------------------------|
| 1 | [0,2,3] | [0,0,2,5] | left = 2*1‑0 = 2; right = (5‑2)‑2*1 = 1; total = 3 |

## Complexity Analysis
Time: O(n) to build groups and compute prefix sums.
Space: O(n) for storing groups and prefix arrays.

## Follow-Up Questions
* How would you adapt the solution for a streaming input where the array grows over time?
* Can the method be extended to compute sums of squared distances?
* What if the distance metric is Manhattan distance in a 2‑D grid of values?

## Key Takeaway
Using prefix sums on sorted index groups enables O(1) per‑element distance computation after linear preprocessing.
