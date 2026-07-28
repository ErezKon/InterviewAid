# 391. Perfect Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/perfect-rectangle](https://leetcode.com/problems/perfect-rectangle)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given a list of axis‑aligned rectangles represented as `[x1, y1, x2, y2]` (bottom‑left and top‑right coordinates), determine whether they together form an exact cover of a rectangular region with no overlaps and no gaps.

Constraints: `1 ≤ rectangles.length ≤ 10⁴`; coordinates are integers in the range `[-10⁴, 10⁴]`.

## Examples
| rectangles | Output | Explanation |
|------------|--------|-------------|
| [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]] | true | The five small rectangles exactly cover the region `[1,1,4,4]` without overlap.
| [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]] | false | Gaps exist between the groups of rectangles.

## Approach
Use area summation and corner‑point tracking.

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

## Follow‑Up Questions
1. How would you adapt the algorithm to handle rectangles that may be rotated (non‑axis aligned)?
2. Can you detect the exact location of any overlap or gap instead of just a boolean result?
3. What changes are needed if the input size grows to 10⁶ rectangles – can you use streaming techniques?

## Key Takeaway
By comparing the total area with the area of the bounding rectangle and ensuring only the four extreme corners remain after toggling, we can verify a perfect rectangle cover in linear time.
