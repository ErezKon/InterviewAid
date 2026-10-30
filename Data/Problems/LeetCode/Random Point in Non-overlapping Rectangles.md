# 497. Random Point in Non-overlapping Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-point-in-non-overlapping-rectangles](https://leetcode.com/problems/random-point-in-non-overlapping-rectangles)

**Companies:** Google, Uber
---

## Problem Description
You are given an array of non-overlapping axis-aligned rectangles `rects` where `rects[i] = [ai, bi, xi, yi]` indicates that `(ai, bi)` is the bottom-left corner point of the `iᵗʰ` rectangle and `(xi, yi)` is the top-right corner point of the `iᵗʰ` rectangle. Design an algorithm to pick a random integer point inside the space covered by one of the given rectangles. A point on the perimeter of a rectangle is included in the space covered by the rectangle.

Any integer point inside the space covered by one of the given rectangles should be equally likely to be returned.

**Note** that an integer point is a point that has integer coordinates.

Implement the `Solution` class:

- `Solution(int[][] rects)` Initializes the object with the given rectangles `rects`.
- `int[] pick()` Returns a random integer point `[u, v]` inside the space covered by one of the given rectangles.

**Constraints:**

- `1 <= rects.length <= 100`
- `rects[i].length == 4`
- `-10⁹ <= ai < xi <= 10⁹`
- `-10⁹ <= bi < yi <= 10⁹`
- `xi - ai <= 2000`
- `yi - bi <= 2000`
- All the rectangles do not overlap.
- At most `10⁴` calls will be made to `pick`.

## Examples

```
Example 1:
  Input: ["Solution", "pick", "pick", "pick", "pick", "pick"]
         [[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]
  Output: [null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]
  Explanation:
    Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
    solution.pick(); // return [1, -2]
    solution.pick(); // return [1, -1]
    solution.pick(); // return [-1, -2]
    solution.pick(); // return [-2, -2]
    solution.pick(); // return [0, 0]
```

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
