# 3588. Find Maximum Area of a Triangle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-area-of-a-triangle](https://leetcode.com/problems/find-maximum-area-of-a-triangle)
**Companies:** Docusign, Google

---

## Problem Description
Given an array `points` where each element is a pair `[x, y]` representing a point on the 2D plane, choose three distinct points that form a triangle with the maximum possible area. Return the maximum area. The area of a triangle with vertices `(x1,y1)`, `(x2,y2)`, `(x3,y3)` is `| (x1(y2‑y3) + x2(y3‑y1) + x3(y1‑y2) ) / 2 |`.

## Examples
**Example 1**
```
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2.0
Explanation: The triangle formed by (0,0), (2,0) and (0,2) has area 2.
```
**Example 2**
```
Input: points = [[1,0],[0,0],[0,1]]
Output: 0.5
```

## Approach
A straightforward O(n³) enumeration checks every triple and computes its area using the shoelace formula. For larger inputs, compute the convex hull first (O(n log n)) and then apply the rotating‑calipers technique to examine only hull vertices, achieving O(m²) where *m* is hull size.

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
- **Time:** O(n³) for the naïve enumeration; O(m²) after convex‑hull optimisation.
- **Space:** O(1) extra space (aside from input storage).

## Follow‑Up Questions
1. How would you adapt the algorithm to return the actual three points that achieve the maximum area?
2. Can the rotating‑calipers method be extended to find the maximum‑area triangle on a set of points in 3‑D?
3. What if the points are given as floating‑point coordinates – how would you handle precision?

## Key Takeaway
Enumerating all triples and applying the shoelace formula directly yields the maximum triangle area; for larger datasets, limiting the search to convex‑hull vertices dramatically reduces work.
