# 850. Rectangle Area II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rectangle-area-ii](https://leetcode.com/problems/rectangle-area-ii)
**Companies:** Flipkart, Google
---

## Problem Description
You are given a 2D array of axis-aligned `rectangles`. Each `rectangle[i] = [xi1, yi1, xi2, yi2]` denotes the `iᵗʰ` rectangle where `(xi1, yi1)` are the coordinates of the **bottom-left corner**, and `(xi2, yi2)` are the coordinates of the **top-right corner**.

Calculate the **total area** covered by all `rectangles` in the plane. Any area covered by two or more rectangles should only be counted **once**.

Return ***the total area***. Since the answer may be too large, return it **modulo** `10⁹ + 7`.

**Constraints:**

- `1 <= rectangles.length <= 200`
- `rectanges[i].length == 4`
- `0 <= xi1, yi1, xi2, yi2 <= 10⁹`
- `xi1 <= xi2`
- `yi1 <= yi2`
- All rectangles have non zero area.

## Examples

```
Example 1:
  Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
  Output: 6
  Explanation: A total area of 6 is covered by all three rectangles, as illustrated in the picture.
    From (1,1) to (2,2), the green and red rectangles overlap.
    From (1,0) to (2,3), all three rectangles overlap.
```

```
Example 2:
  Input: rectangles = [[0,0,1000000000,1000000000]]
  Output: 49
  Explanation: The answer is 10¹⁸ modulo (10⁹ + 7), which is 49.
```

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
