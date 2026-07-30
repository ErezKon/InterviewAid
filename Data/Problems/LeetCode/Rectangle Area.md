# 223. Rectangle Area

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rectangle-area](https://leetcode.com/problems/rectangle-area)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia, Tesla

---

## Problem Description
Given the coordinates of two axis-aligned rectangles in a 2D plane, compute the total area covered by the two rectangles. Each rectangle is defined by its bottom-left corner `(ax1, ay1)` and top-right corner `(ax2, ay2)` for the first rectangle, and similarly `(bx1, by1)` and `(bx2, by2)` for the second. Overlapping area should be counted only once.

## Examples
**Example 1:**
```
Input: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4,
       bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
Output: 45
Explanation: The first rectangle area is 24, the second is 27, and the overlapping area is 6. Total = 24 + 27 - 6 = 45.
```
**Example 2:**
```
Input: ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2,
       bx1 = -1, by1 = -1, bx2 = 1, by2 = 1
Output: 16
Explanation: The second rectangle lies completely inside the first, so the total area equals the area of the first rectangle.
```

## Approach
Compute the area of each rectangle individually. Then compute the overlap width and height by taking the intersection of the x‑intervals and y‑intervals. The overlapping area is the product of these dimensions (or zero if they do not intersect). Subtract the overlap from the sum of individual areas.

## Pseudocode
```text
FUNCTION computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):
    // Individual rectangle areas
    SET area1 ← (ax2 - ax1) * (ay2 - ay1)
    SET area2 ← (bx2 - bx1) * (by2 - by1)

    // Overlap dimensions
    SET overlapWidth ← MAX(0, MIN(ax2, bx2) - MAX(ax1, bx1))
    SET overlapHeight ← MAX(0, MIN(ay2, by2) - MAX(ay1, by1))
    SET overlapArea ← overlapWidth * overlapHeight

    RETURN area1 + area2 - overlapArea
```

## Walkthrough
| Step | Values | overlapWidth | overlapHeight | overlapArea |
|------|--------|--------------|---------------|-------------|
| Compute widths | ax2‑ax1 = 6, bx2‑bx1 = 9 | MIN(3,9)=3, MAX(-3,0)=0 → 3‑0=3 | MIN(4,2)=2, MAX(0,-1)=0 → 2‑0=2 | 3*2=6 |
| Final area | 6*4=24, 9*3=27 | 24+27‑6 = 45 |

## Complexity Analysis
- **Time:** O(1) – constant arithmetic operations.
- **Space:** O(1) – no additional data structures.

## Follow‑Up Questions
1. How would you extend the solution to compute the union area of *k* rectangles?
2. What changes are needed if the rectangles can be rotated (non‑axis aligned)?
3. Can the algorithm be adapted to return the exact shape of the union (e.g., as a set of non‑overlapping rectangles)?

## Key Takeaway
The union area of two axis‑aligned rectangles equals the sum of their individual areas minus the area of their intersection, which can be computed with simple interval overlap formulas.
