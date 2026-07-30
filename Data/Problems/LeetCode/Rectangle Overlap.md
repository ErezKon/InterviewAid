# 836. Rectangle Overlap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rectangle-overlap](https://leetcode.com/problems/rectangle-overlap)
**Companies:** Amazon, Meta, Microsoft, Qualcomm
---

## Problem Description
Given two axis-aligned rectangles `rec1` and `rec2`, each represented as `[x1, y1, x2, y2]` where `(x1, y1)` is the bottom-left corner and `(x2, y2)` is the top-right corner, determine whether the two rectangles overlap (i.e., share a positive‑area region).

## Examples
- **Example 1:** `rec1 = [0,0,2,2]`, `rec2 = [1,1,3,3]` → `true` (they intersect in a 1×1 square).
- **Example 2:** `rec1 = [0,0,1,1]`, `rec2 = [1,0,2,1]` → `false` (they only touch at the edge, no area overlap).

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
