# 2848. Points That Intersect With Cars

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/points-that-intersect-with-cars](https://leetcode.com/problems/points-that-intersect-with-cars)
**Companies:** Uber

---

## Problem Description
Given a list of car intervals represented by their start and end positions on a number line, and a list of query points, determine for each point how many cars intersect that point. Return an array of counts corresponding to the query points.

## Examples
**Example 1:**
Input: `cars = [[1,5],[2,6],[4,8]], points = [2,4,7]`
Output: `[2,3,1]`
Explanation: Point 2 lies in intervals [1,5] and [2,6]; point 4 lies in all three intervals; point 7 lies only in [4,8].

**Example 2:**
Input: `cars = [[0,0]], points = [0]`
Output: `[1]`
Explanation: Single point interval intersects the query point.

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
