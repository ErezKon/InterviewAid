# 3453. Separate Squares I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-squares-i](https://leetcode.com/problems/separate-squares-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]` represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the **minimum** y-coordinate value of a horizontal line such that the total area of the squares above the line *equals* the total area of the squares below the line.

Answers within `10^-5` of the actual answer will be accepted.

**Note**: Squares **may** overlap. Overlapping areas should be counted **multiple times**.

**Constraints:**

- `1 <= squares.length <= 5 * 10^4`
- `squares[i] = [xi, yi, li]`
- `squares[i].length == 3`
- `0 <= xi, yi <= 10^9`
- `1 <= li <= 10^9`
- The total area of all the squares will not exceed `10^12`.

---

## Examples

```
Example 1:
  Input: squares = [[0,0,1],[2,2,1]]
  Output: 1.00000
  Explanation: Any horizontal line between y = 1 and y = 2 will have 1 square unit above it and 1 square unit below it.
  The lowest option is 1.
```

```
Example 2:
  Input: squares = [[0,0,2],[1,1,1]]
  Output: 1.16667
  Explanation: The areas are:
  - Below the line: 7/6 * 2 (Red) + 1/6 (Blue) = 15/6 = 2.5.
  - Above the line: 5/6 * 2 (Red) + 5/6 (Blue) = 15/6 = 2.5.
  Since the areas above and below the line are equal, the output is 7/6 = 1.16667.
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
