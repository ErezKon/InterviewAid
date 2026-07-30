# 3623. Count Number of Trapezoids I

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, Google, Meta
---

## Problem Description
You are given a list of points in the 2‑D plane with integer coordinates. A trapezoid is defined as a set of four points \((x_1,y_1),(x_2,y_2),(x_3,y_3),(x_4,y_4)\) such that one pair of opposite sides is parallel (i.e., they share the same slope) and the other pair is not. Count the number of distinct unordered quadruples of points that form a valid trapezoid.

## Examples
**Example 1:**
```
Input: points = [[0,0],[1,0],[0,1],[1,2],[2,1]]
Output: 2
Explanation: The trapezoids are formed by points {(0,0),(1,0),(0,1),(1,2)} and {(1,0),(2,1),(0,1),(1,2)}.
```
**Example 2:**
```
Input: points = [[0,0],[1,1],[2,2]]
Output: 0
Explanation: Fewer than four points, no trapezoid possible.
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
- What changes are needed if the definition of a trapezoid requires the non‑parallel sides to be of equal length?

## Key Takeaway
Grouping point pairs by their slope lets you efficiently enumerate candidate parallel sides, turning the geometric counting problem into a manageable combinatorial search.
