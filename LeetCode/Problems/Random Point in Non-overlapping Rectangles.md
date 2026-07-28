# 497. Random Point in Non-overlapping Rectangles

**Difficulty:** 🟡 Medium

**Companies:** Google, Uber
---

## Problem Description
Given a list of axis‑aligned, non‑overlapping rectangles, design a system that returns a random point such that each point inside the union of rectangles is chosen with equal probability. The rectangles are defined by their bottom‑left and top‑right coordinates.

## Examples
- Input: rectangles = [[1,1,2,2],[3,3,5,5]] → possible output: (1.5,1.8) or (4.2,4.7)
- Input: rectangles = [[-2,0,0,2]] → output: any point within the single rectangle, e.g., (-1,1.5)

## Approach
Use area‑weighted selection. Compute each rectangle's area, build a prefix‑sum array, and binary‑search a random value to pick a rectangle. Then generate a uniform point inside the chosen rectangle.

```text
FUNCTION pickRandomPoint(rectangles):
    // Preprocess once
    SET areas ← []
    SET prefix ← []
    SET total ← 0
    FOR each rect IN rectangles:
        SET w ← rect.x2 - rect.x1
        SET h ← rect.y2 - rect.y1
        SET area ← w * h
        APPEND area TO areas
        SET total ← total + area
        APPEND total TO prefix
    END FOR
    // Pick rectangle
    SET r ← RANDOM(0, total)
    SET idx ← BINARY_SEARCH(prefix, r)
    SET chosen ← rectangles[idx]
    // Uniform point inside
    SET x ← RANDOM(chosen.x1, chosen.x2)
    SET y ← RANDOM(chosen.y1, chosen.y2)
    RETURN (x, y)
END FUNCTION
```

## Walkthrough
| Step | Action | Details |
|------|--------|---------|
|1|Compute areas|Rect1 area=1, Rect2 area=4 → prefix=[1,5]|
|2|Random value|Suppose r=3.2 → binary search finds idx=1 (second rectangle)|
|3|Generate point|x ∈ [3,5], y ∈ [3,5] → e.g., (4.1,4.8)|

## Complexity Analysis
- Time: O(N) preprocessing, O(log N) per query for binary search.
- Space: O(N) for prefix array.

## Follow-Up Questions
1. How would you handle dynamic updates (adding/removing rectangles)?
2. Extend to weighted rectangles where selection probability differs from area.
3. Generalize to 3‑D boxes.

## Key Takeaway
Uniform random selection across multiple rectangles can be achieved by area‑weighted prefix sums and binary search, followed by uniform sampling within the chosen rectangle.
