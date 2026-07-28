# 939. Minimum Area Rectangle

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-area-rectangle
**Companies:** Bytedance, Flipkart, Google, Meta, Microsoft, Snapchat, Verily, Waymo

---
## Problem Description
Given a list of points in the 2D plane, find the smallest area of an axis‑aligned rectangle such that all four of its vertices are among the given points. If no such rectangle exists, return 0.

## Examples
**Example 1**
Input: points = [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: 4
Explanation: The rectangle formed by (1,1),(1,3),(3,1),(3,3) has area 4.

**Example 2**
Input: points = [[0,0],[1,2],[2,1]]
Output: 0
Explanation: No four points form an axis‑aligned rectangle.

## Approach
**Algorithm:** Diagonal Pair Check with Hash Set
Key insight: For any two points that could be opposite corners of an axis‑aligned rectangle (different x and y), the other two corners must also exist in the set.

```text
FUNCTION minAreaRect(points):
    pts ← SET of all point tuples
    minArea ← INFINITY
    n ← LEN(points)
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            (x1, y1) ← points[i]
            (x2, y2) ← points[j]
            IF x1 ≠ x2 AND y1 ≠ y2 THEN
                IF (x1, y2) IN pts AND (x2, y1) IN pts THEN
                    area ← ABS(x1 - x2) * ABS(y1 - y2)
                    minArea ← MIN(minArea, area)
    RETURN minArea IF minArea < INFINITY ELSE 0
```

## Walkthrough
Consider points = [[1,1],[1,3],[3,1],[3,3],[2,2]].

| Pair (i,j) | x1≠x2 & y1≠y2? | Other corners present? | Area |
|------------|----------------|------------------------|------|
| (1,1)-(3,3) | Yes | (1,3) and (3,1) exist | 4 |
| (1,3)-(3,1) | Yes | (1,1) and (3,3) exist | 4 |
All other pairs either share x or y or miss a corner. Minimum area = 4.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n²) due to pair enumeration |
| Space  | O(n) for the hash set of points |

## Follow‑Up Questions
1. How would you adapt the solution to find the rectangle with the **largest** area?
2. Can the algorithm be improved for very large point sets (e.g., using spatial indexing)?
3. How would you handle rectangles that are not axis‑aligned?

## Key Takeaway
Two opposite corners uniquely define an axis‑aligned rectangle; checking existence of the remaining corners with a hash set yields an O(n²) solution.
