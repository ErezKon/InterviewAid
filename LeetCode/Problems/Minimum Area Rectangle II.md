# 963. Minimum Area Rectangle II

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-area-rectangle-ii
**Companies:** Google, Verily

---
## Problem Description
Given a set of points in the 2D plane, find the rectangle (not necessarily axis-aligned) with the smallest possible area such that all four vertices of the rectangle are among the given points. If no rectangle can be formed, return 0.

## Examples
**Example 1**
Input: points = [[1,2],[2,1],[1,0],[0,1]]
Output: 2
Explanation: The rectangle formed by points (0,1), (1,2), (2,1), (1,0) has area 2.

**Example 2**
Input: points = [[0,0],[1,1],[2,2]]
Output: 0
Explanation: No four points form a rectangle.

## Approach
**Algorithm:** Diagonal Grouping (Hash Map)
Key insight: In any rectangle, the two diagonals share the same midpoint and have equal length. By grouping all point pairs by their midpoint and squared distance, any two pairs in the same group form a rectangle. Compute its area using the cross product of two adjacent sides.

```text
FUNCTION minAreaFreeRect(points):
    n ← LEN(points)
    diags ← MAP from (midX, midY, dist) TO LIST of point‑pair indices
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            midX ← (points[i][0] + points[j][0]) / 2
            midY ← (points[i][1] + points[j][1]) / 2
            dist ← (points[i][0] - points[j][0])^2 + (points[i][1] - points[j][1])^2
            diags[(midX, midY, dist)].ADD((i, j))
    minArea ← INFINITY
    FOR each group IN diags.VALUES():
        FOR each (i1, j1), (i2, j2) IN ALL PAIR COMBINATIONS of group:
            // vectors of two adjacent sides
            v1 ← points[i1] - points[i2]
            v2 ← points[i1] - points[j2]
            area ← ABS(cross(v1, v2))
            minArea ← MIN(minArea, area)
    RETURN minArea IF minArea < INFINITY ELSE 0
```

## Walkthrough
Consider the first example points = [[1,2],[2,1],[1,0],[0,1]].

| Pair | Midpoint | Squared Distance |
|------|----------|-------------------|
| (1,2)-(2,1) | (1.5,1.5) | 2 |
| (1,2)-(1,0) | (1,1)   | 4 |
| (1,2)-(0,1) | (0.5,1.5) | 2 |
| (2,1)-(1,0) | (1.5,0.5) | 2 |
| (2,1)-(0,1) | (1,1)   | 4 |
| (1,0)-(0,1) | (0.5,0.5) | 2 |

Pairs with the same midpoint (1,1) and distance 4 are (1,2)-(1,0) and (2,1)-(0,1). These form a rectangle. Vectors from (1,2) to (1,0) and (1,2) to (2,1) give area |cross| = 2.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n² + g²) where g is the size of the largest group (worst‑case O(n²)) |
| Space  | O(n²) for storing all point pairs |

## Follow‑Up Questions
1. How would you modify the algorithm to return the rectangle’s coordinates instead of just the area?
2. Can the solution be adapted to find the minimum‑area **axis‑aligned** rectangle?
3. What if the input size is very large (e.g., 10⁵ points); can you design a sub‑quadratic approximation?

## Key Takeaway
Two diagonals with identical midpoints and lengths uniquely define a rectangle; grouping point pairs by these properties enables an O(n²) solution.
