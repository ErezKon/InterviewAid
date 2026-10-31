# 3623. Count Number of Trapezoids I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-trapezoids-i](https://leetcode.com/problems/count-number-of-trapezoids-i)
**Companies:** Bloomberg, Google, Meta
---

## Problem Description

You are given a 2D integer array `points`, where `points[i] = [x_i, y_i]` represents the coordinates of the `i^th` point on the Cartesian plane.

A **horizontal** **trapezoid** is a convex quadrilateral with **at least one pair** of horizontal sides (i.e. parallel to the x-axis). Two lines are parallel if and only if they have the same slope.

Return the  number of unique ****horizontal* *trapezoids*** that can be formed by choosing any four distinct points from `points`.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `4 <= points.length <= 10^5`
- `–10^8 <= x_i, y_i <= 10^8`
- All points are pairwise distinct.

## Examples

**Example 1:**
```
Input: points = [[1,0],[2,0],[3,0],[2,2],[3,2]]
Output: 3
Explanation: There are three distinct ways to pick four points that form a horizontal trapezoid:
  Using points [1,0], [2,0], [3,2], and [2,2].
  Using points [2,0], [3,0], [3,2], and [2,2].
  Using points [1,0], [3,0], [3,2], and [2,2].
```

**Example 2:**
```
Input: points = [[0,0],[1,0],[0,1],[2,1]]
Output: 1
Explanation: There is only one horizontal trapezoid that can be formed.
```

## Approach
1. For every unordered pair of points compute its slope as a reduced fraction `(dy,dx)`. Store pairs sharing the same slope in a map.
2. For each slope group, any two disjoint pairs can serve as the parallel sides of a trapezoid.
3. Iterate over each slope group, enumerate unordered pair combinations, and check that the four points are distinct and that the other two sides are not parallel (their slopes differ).
4. Increment the count for each valid quadruple.
The core insight is that parallel sides must share a slope, so grouping by slope reduces the search space.

## Walkthrough
| Step | Pair indices | Slope (dy/dx) | Group |
|------|--------------|---------------|-------|
| 1    | (0,1)        | 0/1           | group A |
| 2    | (2,3)        | 2/1           | group B |
| …    | …            | …             | … |
When two pairs belong to the same group and involve four distinct points, they form the parallel sides of a trapezoid.

## Complexity Analysis
- **Time:** O(P²) in the worst case, where P = number of point pairs (≈ n²). Grouping by slope cuts down constant factors.
- **Space:** O(P) to store the slope map.

## Follow-Up Questions
- How would you adapt the algorithm for collinear points where many pairs share the same slope?
- Can the solution be improved to O(n²) using combinatorial formulas instead of explicit pair enumeration?
- What changes are needed if the definition of a trapezoid requires the non-parallel sides to be of equal length?

## Key Takeaway
Grouping point pairs by their slope lets you efficiently enumerate candidate parallel sides, turning the geometric counting problem into a manageable combinatorial search.
