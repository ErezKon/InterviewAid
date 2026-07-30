# 3285. Find Indices of Stable Mountains

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-indices-of-stable-mountains](https://leetcode.com/problems/find-indices-of-stable-mountains)
**Companies:** Google

---

## Problem Description
Given an integer array `heights`, an index `i` is called a *stable mountain* if there exists a left index `l < i` and a right index `r > i` such that `heights[l] < heights[i]` and `heights[r] < heights[i]`. Return all indices that are stable mountains. The array length is up to 10⁵.

## Examples
**Example 1**
```
Input: heights = [1,3,2,4,1]
Output: [1,3]
Explanation: Index 1 (value 3) has left 0 (1) and right 2 (2) lower than it. Index 3 (value 4) has left 2 (2) and right 4 (1) lower than it.
```
**Example 2**
```
Input: heights = [5,4,3,2,1]
Output: []
Explanation: No index has a higher value than both a left and a right neighbor.
```

## Approach
Perform two passes to compute the maximum height seen so far from the left and from the right. An index `i` is a stable mountain if `heights[i]` is greater than both `maxLeft[i-1]` and `maxRight[i+1]`.

## Walkthrough
| i | heights[i] | maxLeft (before i) | maxRight (after i) | Stable? |
|---|------------|-------------------|--------------------|---------|
| 0 | 1          | -∞                | 4                  | No |
| 1 | 3          | 1                 | 4                  | No (3 < 4) |
| 2 | 2          | 3                 | 4                  | No |
| 3 | 4          | 3                 | 1                  | Yes |
| 4 | 1          | 4                 | -∞                | No |
Indices 1 and 3 satisfy the condition.

## Complexity Analysis
- **Time:** O(n) for two linear scans.
- **Space:** O(n) for the auxiliary left/right max arrays (can be reduced to O(1) with two‑pointer technique).

## Follow-Up Questions
1. How would you modify the solution to return the longest stable mountain segment?
2. Can you solve it in O(1) extra space using a two‑pointer approach?
3. What if the array is streamed and you cannot store it entirely?

## Key Takeaway
By precomputing the maximum heights on both sides, you can identify indices that are higher than any element on their left and right in linear time.