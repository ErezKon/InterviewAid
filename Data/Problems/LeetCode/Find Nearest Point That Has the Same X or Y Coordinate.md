# 1779. Find Nearest Point That Has the Same X or Y Coordinate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate)
**Companies:** Amazon, Doordash, Google

---

## Problem Description
Given your location `(x, y)` on a 2‑D plane and an array `points` where `points[i] = [px_i, py_i]` represents the coordinates of the *i*‑th point, return the index of the point that shares **either** the same `x` **or** the same `y` coordinate with you and has the smallest Manhattan distance. If there are multiple such points, return the smallest index. If no point shares an `x` or `y` coordinate, return `-1`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `x=3, y=4, points=[[1,2],[3,1],[2,4],[2,3]]` | `1` | Point `[3,1]` shares `x=3` with distance `|3-3|+|1-4|=3`. Point `[2,4]` shares `y=4` with distance `|2-3|+|4-4|=1` → index `2` is closer, but index `2` is larger than `1`? Actually distance 1 is smallest, so answer `2`. Adjust example: use points `[[1,2],[3,1],[2,4],[3,4]]` → both index `1` and `3` share `x=3` or `y=4` with distance `3` and `0` respectively, answer `3`.
| `x=1, y=1, points=[[2,2],[3,3]]` | `-1` | No point shares `x` or `y`.
| `x=0, y=0, points=[[0,5],[5,0],[0,0]]` | `0` | Multiple points share a coordinate; index `0` has distance `5`, index `1` distance `5`, index `2` distance `0` (smallest).

## Approach
Iterate through `points` while tracking the best candidate:
- If a point shares `x` or `y`, compute its Manhattan distance `|px - x| + |py - y|`.
- Update the best index when the distance is smaller, or when equal but the index is lower.
Return the final best index (or `-1`).

## Walkthrough
For `x=3, y=4, points=[[1,2],[3,1],[2,4],[3,4]]`:
| i | point | shares? | distance | best index |
|---|-------|----------|----------|------------|
| 0 | (1,2) | no | - | - |
| 1 | (3,1) | x matches | 3 | 1 |
| 2 | (2,4) | y matches | 1 | 2 (smaller distance) |
| 3 | (3,4) | both match | 0 | 3 (smallest distance) |
Result = 3.

## Complexity Analysis
- **Time:** O(m) where m = number of points.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you extend the solution to return the actual nearest point instead of its index?
- Can the algorithm be adapted for 3‑D coordinates?
- What if you need to handle ties by returning the point with the smallest Manhattan distance **and** smallest Euclidean distance?

## Key Takeaway
A single linear scan that checks coordinate equality and computes Manhattan distance efficiently finds the nearest valid point.
