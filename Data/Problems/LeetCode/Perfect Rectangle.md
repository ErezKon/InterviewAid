# 391. Perfect Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/perfect-rectangle](https://leetcode.com/problems/perfect-rectangle)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an array `rectangles` where `rectangles[i] = [x_i, y_i, a_i, b_i]` represents an axis-aligned rectangle. The bottom-left point of the rectangle is `(x_i, y_i)` and the top-right point of it is `(a_i, b_i)`.

Return `true` *if all the rectangles together form an exact cover of a rectangular region*.

**Constraints:**

- `1 <= rectangles.length <= 2 * 10^4`
- `rectangles[i].length == 4`
- `-10^5 <= x_i < a_i <= 10^5`
- `-10^5 <= y_i < b_i <= 10^5`

## Examples

```
Example 1:
  Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
  Output: true
  Explanation: All 5 rectangles together form an exact cover of a rectangular region.
```

```
Example 2:
  Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
  Output: false
  Explanation: Because there is a gap between the two rectangular regions.
```

```
Example 3:
  Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
  Output: false
  Explanation: Because two of the rectangles overlap with each other.
```

## Approach
Use area summation and corner-point tracking.

1. Initialise `totalArea ← 0` and an empty set `corners`.
2. For each rectangle `[x1, y1, x2, y2]`:
   - Add its area `(x2 - x1) * (y2 - y1)` to `totalArea`.
   - For each of its four corners `(x1,y1)`, `(x1,y2)`, `(x2,y1)`, `(x2,y2)`:
     * If the corner is already in `corners`, remove it (toggle off).
     * Otherwise, add it (toggle on).
3. After processing all rectangles, `corners` should contain exactly four points – the corners of the bounding rectangle.
4. Compute the bounding rectangle from those four points: `minX, minY, maxX, maxY`.
5. The cover is perfect iff `totalArea == (maxX - minX) * (maxY - minY)` **and** `len(corners) == 4`.

## Walkthrough
For the first example, after toggling corners the set ends with `{(1,1),(1,4),(4,1),(4,4)}` – the outer rectangle corners. The summed area equals `(4-1)*(4-1)=9`, matching the total area, so return true.

## Complexity Analysis
- Time: O(N) where N is the number of rectangles – each processed once.
- Space: O(N) in the worst case for the corner set, but typically O(1) extra beyond the four final corners.

## Follow-Up Questions
1. How would you adapt the algorithm to handle rectangles that may be rotated (non-axis aligned)?
2. Can you detect the exact location of any overlap or gap instead of just a boolean result?
3. What changes are needed if the input size grows to 10⁶ rectangles – can you use streaming techniques?

## Key Takeaway
By comparing the total area with the area of the bounding rectangle and ensuring only the four extreme corners remain after toggling, we can verify a perfect rectangle cover in linear time.
