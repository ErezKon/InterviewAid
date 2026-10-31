# 3588. Find Maximum Area of a Triangle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-area-of-a-triangle](https://leetcode.com/problems/find-maximum-area-of-a-triangle)
**Companies:** Docusign, Google

---

## Problem Description
You are given a 2D array `coords` of size `n x 2`, representing the coordinates of `n` points in an infinite Cartesian plane.

Find **twice** the **maximum** area of a triangle with its corners at *any* three elements from `coords`, such that at least one side of this triangle is **parallel** to the x-axis or y-axis. Formally, if the maximum area of such a triangle is `A`, return `2 * A`.

If no such triangle exists, return -1.

**Note** that a triangle *cannot* have zero area.

> *Note: the Approach / Walkthrough below were written for a different (unrestricted max-area) problem and do not enforce the axis-parallel side requirement. Correct idea: for each x, track min/max y (a vertical side) and use the global min/max x as the farthest third vertex; symmetrically for each y. O(n).*

## Examples
**Example 1:**
```
Input: coords = [[1,1],[1,2],[3,2],[3,3]]
Output: 2
Explanation: The triangle with corners (1,1), (1,2), (3,2) has base 1 and height 2. Hence its area is 1/2 * base * height = 1, and 2 * A = 2.
```
**Example 2:**
```
Input: coords = [[1,1],[2,2],[3,3]]
Output: -1
Explanation: The only possible triangle has corners (1, 1), (2, 2), and (3, 3). None of its sides are parallel to the x-axis or the y-axis.
```

## Constraints
- `1 <= n == coords.length <= 10^5`
- `1 <= coords[i][0], coords[i][1] <= 10^6`
- All `coords[i]` are **unique**.

## Approach
A straightforward O(n³) enumeration checks every triple and computes its area using the shoelace formula. For larger inputs, compute the convex hull first (O(n log n)) and then apply the rotating-calipers technique to examine only hull vertices, achieving O(m²) where *m* is hull size.

### Pseudocode (simple enumeration)
```text
FUNCTION maxTriangleArea(points):
    SET maxArea ← 0
    SET n ← LENGTH(points)
    FOR i ← 0 TO n-3:
        FOR j ← i+1 TO n-2:
            FOR k ← j+1 TO n-1:
                SET area ← ABS( points[i][0]*(points[j][1]-points[k][1])
                                 + points[j][0]*(points[k][1]-points[i][1])
                                 + points[k][0]*(points[i][1]-points[j][1]) ) / 2
                IF area > maxArea:
                    SET maxArea ← area
    RETURN maxArea
```

## Walkthrough
For `points = [[0,0],[0,1],[1,0],[0,2],[2,0]]` the triple `(0,0),(2,0),(0,2)` yields:
```
area = |0*(0-2) + 2*(2-0) + 0*(0-0)| / 2 = 4 / 2 = 2
```
No other triple gives a larger value, so the answer is `2`.

## Complexity Analysis
- **Time:** O(n³) for the naïve enumeration; O(m²) after convex-hull optimisation.
- **Space:** O(1) extra space (aside from input storage).

## Follow-Up Questions
1. How would you adapt the algorithm to return the actual three points that achieve the maximum area?
2. Can the rotating-calipers method be extended to find the maximum-area triangle on a set of points in 3-D?
3. What if the points are given as floating-point coordinates – how would you handle precision?

## Key Takeaway
Enumerating all triples and applying the shoelace formula directly yields the maximum triangle area; for larger datasets, limiting the search to convex-hull vertices dramatically reduces work.
