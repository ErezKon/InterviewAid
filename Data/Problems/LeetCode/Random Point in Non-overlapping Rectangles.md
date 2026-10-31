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
Use weighted selection by the number of **integer points** in each rectangle (not its geometric area): a rectangle `[a, b, x, y]` contains `(x - a + 1) * (y - b + 1)` lattice points, perimeter included. Build a prefix-sum array of these counts, draw a uniform integer `r` in `[1, total]`, binary-search the rectangle that owns `r`, and map the offset of `r` inside that rectangle to a unique point.

```text
FUNCTION Constructor(rects):
    SET prefix ← []
    SET total ← 0
    FOR each [a, b, x, y] IN rects:
        SET total ← total + (x - a + 1) * (y - b + 1)   // integer points, inclusive
        APPEND total TO prefix
    END FOR

FUNCTION pick():
    SET r ← RANDOM_INT(1, total)                       // inclusive
    SET idx ← leftmost i with prefix[i] >= r           // binary search
    SET [a, b, x, y] ← rects[idx]
    SET offset ← r - (idx > 0 ? prefix[idx-1] : 0) - 1 // 0-based inside rectangle
    SET W ← x - a + 1
    RETURN [a + offset MOD W, b + offset DIV W]
END FUNCTION
```

Every integer point corresponds to exactly one value of `r`, so all points are equally likely.

## Walkthrough
Example 1: `rects = [[-2,-2,1,1],[2,2,4,6]]`.

- Rect 0 has `4 * 4 = 16` points, rect 1 has `3 * 5 = 15` points → `prefix = [16, 31]`, `total = 31`.
- Any `r` in `[1,16]` picks rect 0 (width `W = 4`); `r` in `[17,31]` picks rect 1.

| pick | r (random) | idx | offset | point `[a + off%4, b + off//4]` |
|------|-----------|-----|--------|---------------------------------|
|1|4|0|3|`[1, -2]`|
|2|8|0|7|`[1, -1]`|
|3|2|0|1|`[-1, -2]`|
|4|1|0|0|`[-2, -2]`|
|5|11|0|10|`[0, 0]`|

These draws reproduce the official output `[null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]` (any uniformly random output is accepted).

## Complexity Analysis
- Time: O(N) preprocessing, O(log N) per query for binary search.
- Space: O(N) for prefix array.

## Follow-Up Questions
1. How would you handle dynamic updates (adding/removing rectangles)?
2. Extend to weighted rectangles where selection probability differs from area.
3. Generalize to 3-D boxes.

## Key Takeaway
Uniform random selection across multiple rectangles can be achieved by area-weighted prefix sums and binary search, followed by uniform sampling within the chosen rectangle.
