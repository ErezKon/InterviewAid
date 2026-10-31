# 2615. Sum of Distances

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-distances](https://leetcode.com/problems/sum-of-distances)
**Companies:** Amazon, Bny Mellon, Google, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `nums`. There exists an array `arr` of length `nums.length`, where `arr[i]` is the sum of `|i - j|` over all `j` such that `nums[j] == nums[i]` and `j != i`. If there is no such `j`, set `arr[i]` to be `0`.

Return *the array* `arr`*.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [1,3,1,1,2]
Output: [5,0,3,4,0]
Explanation:
When i = 0, nums[0] == nums[2] and nums[0] == nums[3]. Therefore, arr[0] = |0 - 2| + |0 - 3| = 5.
When i = 1, arr[1] = 0 because there is no other index with value 3.
When i = 2, nums[2] == nums[0] and nums[2] == nums[3]. Therefore, arr[2] = |2 - 0| + |2 - 3| = 3.
When i = 3, nums[3] == nums[0] and nums[3] == nums[2]. Therefore, arr[3] = |3 - 0| + |3 - 2| = 4.
When i = 4, arr[4] = 0 because there is no other index with value 2.
```

**Example 2:**
```
Input: nums = [0,5,3]
Output: [0,0,0]
Explanation: Since each element in nums is distinct, arr[i] = 0 for all i.
```

## Approach
Group indices by value. For each group, pre-compute prefix sums of the sorted indices. For an index at position `i` in its group, the distance sum equals `idx*i - prefix[i]` (left side) plus `(prefix[n] - prefix[i+1]) - idx*(n-i-1)` (right side).

## Walkthrough
| Value | Indices | Prefix sums | Calculation for idx=2 |
|-------|---------|-------------|------------------------|
| 1 | [0,2,3] | [0,0,2,5] | left = 2*1-0 = 2; right = (5-2)-2*1 = 1; total = 3 |

## Complexity Analysis
Time: O(n) to build groups and compute prefix sums.
Space: O(n) for storing groups and prefix arrays.

## Follow-Up Questions
* How would you adapt the solution for a streaming input where the array grows over time?
* Can the method be extended to compute sums of squared distances?
* What if the distance metric is Manhattan distance in a 2-D grid of values?

## Key Takeaway
Using prefix sums on sorted index groups enables O(1) per-element distance computation after linear preprocessing.
