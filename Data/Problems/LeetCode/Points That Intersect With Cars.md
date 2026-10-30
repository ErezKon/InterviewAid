# 2848. Points That Intersect With Cars

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/points-that-intersect-with-cars](https://leetcode.com/problems/points-that-intersect-with-cars)
**Companies:** Uber

---

## Problem Description

> *Note: the Approach/Walkthrough below answer per-point coverage queries, a different problem. Correct idea: mark every integer point in `[start_i, end_i]` (or use a difference array over `1..100`) and count points with coverage > 0.*

You are given a **0-indexed** 2D integer array `nums` representing the coordinates of the cars parking on a number line. For any index `i`, `nums[i] = [start_i, end_i]` where `start_i` is the starting point of the `i`th car and `end_i` is the ending point of the `i`th car.

Return *the number of integer points on the line that are covered with **any part** of a car.*

**Constraints:**
- `1 <= nums.length <= 100`
- `nums[i].length == 2`
- `1 <= start_i <= end_i <= 100`

## Examples

**Example 1:**
```
Input: nums = [[3,6],[1,5],[4,7]]
Output: 7
Explanation: All the points from 1 to 7 intersect at least one car, therefore the answer would be 7.
```

**Example 2:**
```
Input: nums = [[1,3],[5,8]]
Output: 7
Explanation: Points intersecting at least one car are 1, 2, 3, 5, 6, 7, 8. There are a total of 7 points, therefore the answer would be 7.
```

## Approach
Use a sweep line (difference array) technique:
1. For each car interval `[l, r]`, increment `diff[l]` and decrement `diff[r+1]`.
2. Prefix‑sum the `diff` array to obtain `active[i]` = number of cars covering position `i`.
3. For each query point, answer is `active[point]`.
This runs in O(N + M + R) where R is the coordinate range after compression.

## Walkthrough
| Step | Action | State |
|------|--------|-------|
|1|Add diff updates for intervals|`diff[1] +=1, diff[6] -=1; diff[2] +=1, diff[7] -=1; diff[4] +=1, diff[9] -=1`|
|2|Compute prefix sums|`active = [0,1,2,2,3,3,2,1,1]` (example after compression) |
|3|Answer queries|`point 2 → 2, point 4 → 3, point 7 → 1`|

## Complexity Analysis
Time: O(N + M + R) → O(N log N) after coordinate compression.
Space: O(R) for the diff array (or O(N) with map compression).

## Follow-Up Questions
1. How would you handle dynamic updates where intervals are added or removed?
2. Can you solve it without coordinate compression if coordinates are bounded?
3. Extend to 2‑D rectangles intersecting query points.

## Key Takeaway
A sweep line with a difference array efficiently counts overlapping intervals for many point queries.
