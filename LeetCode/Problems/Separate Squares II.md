# 3454. Separate Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/separate-squares-ii](https://leetcode.com/problems/separate-squares-ii)
**Companies:** Amazon, Google

---

## Problem Description

Same as Separate Squares I but squares can **overlap**. Find a horizontal line that divides the **union area** equally. Requires computing union area below a given y.

---

## Examples

**Example 1:**
```
Input: squares = [[0,0,2],[1,1,3]]
Output: 1.5
Explanation: The union area of the two overlapping squares is 13. The line y = 1.5 splits the union area into 6.5 above and 6.5 below.
```

**Example 2:**
```
Input: squares = [[-2,-2,4], [0,0,2]]
Output: 0.0
Explanation: The larger square covers the smaller one. The line through its center y = 0 splits the total union area equally.
```

---

## Approach

Use **coordinate compression + sweep line** to compute union area below a candidate y, then binary search on y.

```text
FUNCTION separateSquaresII(squares):
    // Preprocess all y‑coordinates (bottom and top of each square)
    ys ← sorted unique {y, y+side for each square}
    // Binary search on y-coordinate
    lo ← minimum y in ys
    hi ← maximum y in ys
    totalArea ← computeUnionArea(squares, hi)  // area of all squares
    WHILE hi - lo > 1e-6:
        mid ← (lo + hi) / 2
        areaBelow ← computeUnionArea(squares, mid)
        IF areaBelow < totalArea / 2:
            lo ← mid
        ELSE:
            hi ← mid
    RETURN (lo + hi) / 2

FUNCTION computeUnionArea(squares, limitY):
    // Sweep line over x‑axis for strips below limitY
    events ← []
    FOR each [x, y, side] IN squares:
        top ← MIN(y + side, limitY)
        IF top > y:
            events.APPEND((x, y, top))   // rectangle slice
    // Coordinate‑compress x‑coordinates of all event edges
    xs ← sorted unique {x, x+side for each event}
    area ← 0
    FOR i ← 0 TO LENGTH(xs)-2:
        xStart ← xs[i]
        xEnd   ← xs[i+1]
        width  ← xEnd - xStart
        // Collect y‑intervals covering this x‑strip
        intervals ← []
        FOR each (ex, ey, etop) IN events:
            IF ex ≤ xStart AND ex + side ≥ xEnd:
                intervals.APPEND((ey, etop))
        merged ← mergeIntervals(intervals)
        height ← SUM(end - start FOR (start, end) IN merged)
        area ← area + width * height
    RETURN area
```

---

## Walkthrough

Consider squares = [[0,0,2],[1,1,3]].
1. **Compression:** y‑coordinates = {0,2,1,4} → sorted → [0,1,2,4].
2. **Binary search:** lo=0, hi=4, mid=2.
   - `computeUnionArea` up to y=2 gives area 7.5 (partial overlap).
   - Total union area = 13, half = 6.5 → areaBelow > half, set hi=2.
3. Next mid=1 → areaBelow ≈ 5.2 < 6.5, set lo=1.
4. Continue until convergence → y ≈ 1.5.
The table below shows a few iterations:
| lo | hi | mid | areaBelow |
|----|----|-----|-----------|
| 0  | 4  | 2   | 7.5 |
| 0  | 2  | 1   | 5.2 |
| 1  | 2  | 1.5 | 6.5 |
The algorithm stops when the interval width < 1e‑6.

---

## Complexity Analysis

- **Time:** O((n + m) · log precision) where *n* is number of squares and *m* is number of x‑segments after compression (worst‑case O(n²)). Each binary‑search step scans all events.
- **Space:** O(n + m) for storing events and compressed coordinates.

---

## Follow‑Up Questions

1. How would you adapt the algorithm for a **vertical** dividing line?
2. Can the problem be solved in **O(n log n)** using advanced geometry data structures?
3. What changes are needed if squares can be **rotated** arbitrarily?

---

## Key Takeaway

Combining **coordinate compression**, a **sweep‑line union area** computation, and **binary search** on the line position yields an exact split of overlapping geometric shapes.
