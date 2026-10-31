# 3285. Find Indices of Stable Mountains

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-indices-of-stable-mountains](https://leetcode.com/problems/find-indices-of-stable-mountains)
**Companies:** Google

---

## Problem Description
There are `n` mountains in a row, and each mountain has a height. You are given an integer array `height` where `height[i]` represents the height of mountain `i`, and an integer `threshold`.

A mountain is called **stable** if the mountain just before it (**if it exists**) has a height **strictly greater** than `threshold`. **Note** that mountain 0 is **not** stable.

Return an array containing the indices of *all* **stable** mountains in **any** order.

**Constraints:**

- `2 <= n == height.length <= 100`
- `1 <= height[i] <= 100`
- `1 <= threshold <= 100`

## Examples

```
Example 1:
  Input: height = [1,2,3,4,5], threshold = 2
  Output: [3,4]
  Explanation:
  - Mountain 3 is stable because height[2] == 3 is greater than threshold == 2.
  - Mountain 4 is stable because height[3] == 4 is greater than threshold == 2.
```

```
Example 2:
  Input: height = [10,1,10,1,10], threshold = 3
  Output: [1,3]
```

```
Example 3:
  Input: height = [10,1,10,1,10], threshold = 10
  Output: []
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
- **Space:** O(n) for the auxiliary left/right max arrays (can be reduced to O(1) with two-pointer technique).

## Follow-Up Questions
1. How would you modify the solution to return the longest stable mountain segment?
2. Can you solve it in O(1) extra space using a two-pointer approach?
3. What if the array is streamed and you cannot store it entirely?

## Key Takeaway
By precomputing the maximum heights on both sides, you can identify indices that are higher than any element on their left and right in linear time.