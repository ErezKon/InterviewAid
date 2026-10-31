# 3454. Separate Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/separate-squares-ii](https://leetcode.com/problems/separate-squares-ii)
**Companies:** Amazon, Google

---

## Problem Description

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]` represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the **minimum** y-coordinate value of a horizontal line such that the total area covered by squares above the line *equals* the total area covered by squares below the line.

Answers within `10^-5` of the actual answer will be accepted.

**Note**: Squares **may** overlap. Overlapping areas should be counted **only once** in this version.

**Constraints:**

- `1 <= squares.length <= 5 * 10^4`
- `squares[i] = [xi, yi, li]`
- `squares[i].length == 3`
- `0 <= xi, yi <= 10^9`
- `1 <= li <= 10^9`
- The total area of all the squares will not exceed `10^15`.

---

## Examples

```
Example 1:
  Input: squares = [[0,0,1],[2,2,1]]
  Output: 1.00000
  Explanation: Any horizontal line between y = 1 and y = 2 results in an equal split, with 1 square unit above and 1 square unit below.
  The minimum y-value is 1.
```

```
Example 2:
  Input: squares = [[0,0,2],[1,1,1]]
  Output: 1.00000
  Explanation: Since the blue square (the 1x1 square at (1,1)) overlaps with the red square (the 2x2 square at (0,0)), it will not be counted again.
  Thus, the line y = 1 splits the squares into two equal parts.
```

---

## Approach

Sweep a horizontal line upward over the y-events (bottom and top edge of each square). A segment tree over the compressed x-coordinates keeps the **covered width** of the union at the current height. Each strip between consecutive event y's contributes `coveredWidth * dy` of union area. After computing the total union area, scan the strips again and find the strip where the cumulative area reaches half; inside that strip the area grows linearly, so the answer is found by interpolation.

```text
FUNCTION separateSquaresII(squares):
    xs ← sorted unique {x, x+side for each square}
    events ← []
    FOR each [x, y, side] IN squares:
        events.APPEND((y,        +1, x, x+side))   // bottom edge: add x-interval
        events.APPEND((y + side, -1, x, x+side))   // top edge: remove x-interval
    SORT events by y
    // Segment tree over xs: count[node] = cover count, covered[node] = covered width
    strips ← []; total ← 0; prevY ← events[0].y
    FOR each (y, type, x1, x2) IN events:
        IF y > prevY:
            w ← covered[root]                       // union width in (prevY, y)
            strips.APPEND((prevY, y, w))
            total ← total + w * (y - prevY)
            prevY ← y
        SEGTREE_UPDATE(x1, x2, type)
    half ← total / 2; acc ← 0
    FOR each (y0, y1, w) IN strips:
        IF w > 0 AND acc + w * (y1 - y0) ≥ half:
            RETURN y0 + (half - acc) / w            // linear interpolation inside strip
        acc ← acc + w * (y1 - y0)

FUNCTION SEGTREE_UPDATE(node covering [xs[l], xs[r]], a, b, v):
    // standard range add; covered[node] ← xs[r]-xs[l] IF count[node] > 0
    //                     ELSE 0 for leaves, ELSE covered[left] + covered[right]
```

---

## Walkthrough

Example 1: squares = [[0,0,1],[2,2,1]] → xs = [0,1,2,3].

| Event y | Strip before event | Covered width | Strip area | Update |
|---------|--------------------|---------------|------------|--------|
| 0 | - | - | - | add [0,1] |
| 1 | (0,1) | 1 | 1 | remove [0,1] |
| 2 | (1,2) | 0 | 0 | add [2,3] |
| 3 | (2,3) | 1 | 1 | remove [2,3] |

total = 2, half = 1. Scanning strips: strip (0,1) has w = 1 and 0 + 1 ≥ 1 → return 0 + (1 - 0)/1 = **1.00000** (expected output).

Example 2: the 1x1 square lies inside the 2x2 one, so the covered width is 2 on (0,2) and total = 4; the first strip (0,1) reaches half = 2 → y = 0 + 2/2 = 1.00000.

---

## Complexity Analysis

- **Time:** O(n log n) – sorting 2n events and one O(log n) segment-tree update per event; the final strip scan is O(n).
- **Space:** O(n) for the compressed coordinates, events, strips and segment tree.

---

## Follow-Up Questions

1. How would you adapt the algorithm for a **vertical** dividing line?
2. How would you answer many queries "union area below y" efficiently after preprocessing?
3. What changes are needed if squares can be **rotated** arbitrarily?

---

## Key Takeaway

Combining **coordinate compression**, a **sweep-line union area** computation with a segment tree, and **linear interpolation** inside the critical strip yields an exact split of overlapping geometric shapes.
