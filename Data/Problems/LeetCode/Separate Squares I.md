# 3453. Separate Squares I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-squares-i](https://leetcode.com/problems/separate-squares-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given axis-aligned squares on a plane, find a horizontal line y-coordinate that divides the total area equally above and below.

---

## Examples

**Example 1:**
```
Input: squares = [[0,0,2],[3,1,3]]
Output: 2.0
Explanation: The total area is 4 + 9 = 13. A line at y = 2.0 splits the area into 6.5 above and 6.5 below.
```

**Example 2:**
```
Input: squares = [[-1,-1,4]]
Output: 1.0
Explanation: Single square of side 4 has area 16. The line through its center y = 1.0 divides the area equally.
```

---

## Approach

```
FUNCTION separateSquares(squares):
    // Determine search bounds
    lo ← minimum y-coordinate among squares
    hi ← maximum (y + side) among squares
    totalArea ← Σ (side * side) for each square
    WHILE hi - lo > 1e-6:
        mid ← (lo + hi) / 2
        areaBelow ← 0
        FOR each [x, y, side] IN squares:
            // Clip square to region below mid
            top ← MIN(y + side, mid)
            IF top > y:
                areaBelow ← areaBelow + (top - y) * side
        IF areaBelow < totalArea / 2:
            lo ← mid
        ELSE:
            hi ← mid
    RETURN (lo + hi) / 2
```

Binary search on the y‑coordinate because the area below a line is a monotonic function.

---

## Walkthrough

Consider squares = [[0,0,2],[3,1,3]].
| Step | lo | hi | mid | areaBelow |
|------|----|----|-----|-----------|
| Init | 0  | 6  | —   | — |
| 1    | 0  | 6  | 3   | 9 (first square fully below, second partially) |
| 2    | 0  | 3  | 1.5 | 4.5 |
| 3    | 1.5| 3  | 2.25| 6.125 |
| …    | …  | …  | …   | … |
The loop converges to y ≈ 2.0, where areaBelow = totalArea/2.

---

## Complexity Analysis

- **Time:** O(n · log(precision)) – each binary‑search iteration scans all *n* squares.
- **Space:** O(1) – only constant extra variables are used.

---

## Follow-Up Questions

1. How would you extend the solution to find a vertical line that splits the area equally?
2. What if the squares are not axis‑aligned (rotated)?
3. Can you compute the exact line without binary search using geometric formulas?

---

## Key Takeaway

The area below a horizontal line is monotonic, enabling a binary‑search solution that iteratively narrows the line position until the split is balanced.
