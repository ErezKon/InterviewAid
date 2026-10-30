# 836. Rectangle Overlap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rectangle-overlap](https://leetcode.com/problems/rectangle-overlap)
**Companies:** Amazon, Meta, Microsoft, Qualcomm
---

## Problem Description
An axis-aligned rectangle is represented as a list `[x1, y1, x2, y2]`, where `(x1, y1)` is the coordinate of its bottom-left corner, and `(x2, y2)` is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

Two rectangles overlap if the area of their intersection is **positive**. To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two axis-aligned rectangles `rec1` and `rec2`, return `true` *if they overlap, otherwise return* `false`.

**Constraints:**

- `rec1.length == 4`
- `rec2.length == 4`
- `-10⁹ <= rec1[i], rec2[i] <= 10⁹`
- `rec1` and `rec2` represent a valid rectangle with a non-zero area.

## Examples

```
Example 1:
  Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
  Output: true
  Explanation: The rectangles overlap in the region with corners at (1,1), (2,1), (1,2), and (2,2).
    This region has positive area, so the rectangles overlap.
```

```
Example 2:
  Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
  Output: false
  Explanation: The rectangles share the vertical edge where x = 1, but they do not have any common interior region.
    Since their intersection has zero area, the rectangles do not overlap.
```

```
Example 3:
  Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
  Output: false
  Explanation: The rectangles are completely separate. Rectangle rec1 ends at x = 1 and y = 1, while rec2 starts at x = 2 and y = 2.
    Therefore, they have no common points and do not overlap.
```

## Approach
Two rectangles overlap iff their projections on both the x‑axis and y‑axis intersect with positive length. This can be checked with simple inequality comparisons.

```text
FUNCTION IsRectangleOverlap(rec1, rec2):
    // Unpack coordinates
    SET x1a ← rec1[0]; SET y1a ← rec1[1]; SET x2a ← rec1[2]; SET y2a ← rec1[3]
    SET x1b ← rec2[0]; SET y1b ← rec2[1]; SET x2b ← rec2[2]; SET y2b ← rec2[3]
    // Overlap exists when intervals intersect on both axes
    RETURN (x1a < x2b) AND (x1b < x2a) AND (y1a < y2b) AND (y1b < y2a)
```

## Walkthrough
| Step | Condition Checked | Result |
|------|-------------------|--------|
| 1 | `x1a < x2b` (0 < 3) | true |
| 2 | `x1b < x2a` (1 < 2) | true |
| 3 | `y1a < y2b` (0 < 3) | true |
| 4 | `y1b < y2a` (1 < 2) | true |
All true → rectangles overlap.

## Complexity Analysis
- **Time:** `O(1)` – constant number of comparisons.
- **Space:** `O(1)` – no extra data structures.

## Follow-Up Questions
1. How would you modify the check for rectangles that may be rotated (non‑axis aligned)?
2. Extend the solution to return the overlapping region coordinates.
3. What if the rectangles are defined by center point, width, and height?

## Key Takeaway
Overlap of axis‑aligned rectangles reduces to checking interval intersection on both axes with four simple comparisons.
