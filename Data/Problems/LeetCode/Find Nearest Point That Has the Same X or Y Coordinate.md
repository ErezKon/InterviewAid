# 1779. Find Nearest Point That Has the Same X or Y Coordinate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate)
**Companies:** Amazon, Doordash, Google

---

## Problem Description
You are given two integers, `x` and `y`, which represent your current location on a Cartesian grid: `(x, y)`. You are also given an array `points` where each `points[i] = [a_i, b_i]` represents that a point exists at `(a_i, b_i)`. A point is **valid** if it shares the same x-coordinate or the same y-coordinate as your location.

Return *the index **(0-indexed)** of the **valid** point with the smallest **Manhattan distance** from your current location*. If there are multiple, return *the valid point with the **smallest** index*. If there are no valid points, return `-1`.

The **Manhattan distance** between two points `(x1, y1)` and `(x2, y2)` is `abs(x1 - x2) + abs(y1 - y2)`.

**Constraints:**
- `1 <= points.length <= 10^4`
- `points[i].length == 2`
- `1 <= x, y, a_i, b_i <= 10^4`

## Examples
```
Example 1:
  Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
  Output: 2
  Explanation: Of all the points, only [3,1], [2,4] and [4,4] are valid. Of the valid points, [2,4] and [4,4] have the smallest Manhattan distance from your current location, with a distance of 1. [2,4] has the smallest index, so return 2.
```

```
Example 2:
  Input: x = 3, y = 4, points = [[3,4]]
  Output: 0
  Explanation: The answer is allowed to be on the same location as your current location.
```

```
Example 3:
  Input: x = 3, y = 4, points = [[2,3]]
  Output: -1
  Explanation: There are no valid points.
```

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
