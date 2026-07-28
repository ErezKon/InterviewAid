# 850. Rectangle Area II

**Difficulty:** 🔴 Hard
**Companies:** Flipkart, Google
---

## Problem Description
Given a list of axis-aligned rectangles on a 2D plane, each represented by its bottom-left and top-right coordinates `[x1, y1, x2, y2]`, compute the total area covered by the union of all rectangles. Overlapping regions should be counted only once.

## Examples
- **Example 1:** `rectangles = [[0,0,2,2],[1,0,3,1]]` → total area `5`. The first rectangle covers area 4, the second adds 2 but overlaps a 1‑unit strip, so union area is 5.
- **Example 2:** `rectangles = [[0,0,1,1],[1,0,2,1],[0,1,1,2],[1,1,2,2]]` → total area `4`. Four unit squares form a 2×2 block without overlap.

## Approach
Use a sweep line algorithm with coordinate compression. Sweep vertically, maintaining active horizontal intervals in a segment tree or multiset to compute covered width at each y‑step.

```text
FUNCTION RectangleUnionArea(rectangles):
    // 1. Collect all unique x-coordinates for compression
    SET xs ← sorted unique list of all x1 and x2 from rectangles
    CREATE map xIndex ← map each x to its index in xs
    // 2. Build events for sweep line: (y, type, x1, x2)
    // type = +1 for rectangle entering, -1 for leaving
    SET events ← []
    FOR each [x1, y1, x2, y2] IN rectangles:
        APPEND (y1, +1, x1, x2) TO events
        APPEND (y2, -1, x1, x2) TO events
    SORT events BY y ASCENDING
    // 3. Segment tree over compressed x intervals to track coverage count
    INITIALIZE segTree over range 0..len(xs)-2 with count ← 0, coveredLength ← 0
    SET prevY ← events[0].y
    SET area ← 0
    FOR each (y, type, x1, x2) IN events:
        SET dy ← y - prevY
        SET coveredWidth ← segTree.root.coveredLength
        SET area ← area + coveredWidth * dy
        // Update segment tree for current event interval
        SET left ← xIndex[x1]
        SET right ← xIndex[x2] - 1
        segTree.UPDATE(left, right, type) // increment/decrement count
        SET prevY ← y
    RETURN area
```

## Walkthrough
Consider `rectangles = [[0,0,2,2],[1,0,3,1]]`.
1. Unique x-coordinates: `[0,1,2,3]` → intervals: `[0-1],[1-2],[2-3]`.
2. Events: `(0,+1,0,2)`, `(0,+1,1,3)`, `(1,-1,1,3)`, `(2,-1,0,2)` sorted by y.
3. Sweep:
   - At y=0, `dy=0`, area=0. Add intervals `[0-2]` and `[1-3]` → covered width = 3.
   - Move to y=1, `dy=1`, area += 3*1 = 3. Remove `[1-3]` → covered width = 2.
   - Move to y=2, `dy=1`, area += 2*1 = 2. Total area = 5.

## Complexity Analysis
- **Time:** `O(N log N)` where `N` is number of rectangles (sorting + segment‑tree updates).
- **Space:** `O(N)` for events, compressed coordinates, and segment tree.

## Follow-Up Questions
1. How would you modify the algorithm to also return the actual union polygon?
2. Can the solution be adapted for rectangles with rotation (non‑axis aligned)?
3. What is the impact on complexity if coordinates are up to 10⁹ and need 64‑bit arithmetic?

## Key Takeaway
Sweeping a vertical line while maintaining active horizontal coverage via a segment tree (or multiset) efficiently computes the union area of many overlapping rectangles.
