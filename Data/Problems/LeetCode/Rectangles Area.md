# 1459. Rectangles Area

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rectangles-area](https://leetcode.com/problems/rectangles-area)
**Companies:** Twitter
---

## Problem Description
Given a list of axis-aligned rectangles, each defined by `[x1, y1, x2, y2]` where `(x1, y1)` is the bottom‑left corner and `(x2, y2)` is the top‑right corner, compute the total area covered by the union of all rectangles. Overlapping regions must be counted only once.

## Examples
- **Example 1:** `rectangles = [[0,0,2,2],[1,0,3,1]]` → total area `5`. The first rectangle contributes area 4, the second adds 2 but overlaps a 1‑unit strip.
- **Example 2:** `rectangles = [[0,0,1,1],[1,0,2,1],[0,1,1,2],[1,1,2,2]]` → total area `4`. Four unit squares form a 2×2 block without overlap.

## Approach
Apply a sweep line algorithm similar to Rectangle Area II. Sweep vertically, maintaining active horizontal intervals to compute covered width at each y‑step. Use coordinate compression and a segment tree (or multiset) to track interval coverage counts.

```text
FUNCTION UnionRectanglesArea(rectangles):
    // 1. Collect and compress x-coordinates
    SET xs ← sorted unique list of all x1 and x2 from rectangles
    CREATE map xIdx ← map each x to its index in xs
    // 2. Build sweep events: (y, type, x1, x2)
    SET events ← []
    FOR each [x1, y1, x2, y2] IN rectangles:
        APPEND (y1, +1, x1, x2) TO events   // rectangle enters
        APPEND (y2, -1, x1, x2) TO events   // rectangle leaves
    SORT events BY y ASCENDING
    // 3. Segment tree over compressed x intervals
    INITIALIZE segTree over range 0..len(xs)-2 with count ← 0, coveredLength ← 0
    SET prevY ← events[0].y
    SET area ← 0
    FOR each (y, type, x1, x2) IN events:
        SET dy ← y - prevY
        SET coveredWidth ← segTree.root.coveredLength
        SET area ← area + coveredWidth * dy
        // Update coverage for current event interval
        SET left ← xIdx[x1]
        SET right ← xIdx[x2] - 1
        segTree.UPDATE(left, right, type) // increment or decrement count
        SET prevY ← y
    RETURN area
```

## Walkthrough
For `rectangles = [[0,0,2,2],[1,0,3,1]]`:
1. Unique x: `[0,1,2,3]` → intervals `[0-1],[1-2],[2-3]`.
2. Events: `(0,+1,0,2)`, `(0,+1,1,3)`, `(1,-1,1,3)`, `(2,-1,0,2)`.
3. Sweep steps compute covered width 3 between y=0 and y=1, then width 2 between y=1 and y=2, yielding area `3*1 + 2*1 = 5`.

## Complexity Analysis
- **Time:** `O(N log N)` where `N` is the number of rectangles (sorting and segment‑tree updates).
- **Space:** `O(N)` for events, compressed coordinates, and the segment tree.

## Follow-Up Questions
1. How would you modify the algorithm to also return the exact union polygon?
2. Can the method be adapted for rectangles with rotation (non‑axis aligned)?
3. What are the trade‑offs between using a segment tree versus a balanced BST for active intervals?

## Key Takeaway
Sweeping a line while maintaining active horizontal coverage via a segment tree efficiently computes the union area of many overlapping rectangles.
