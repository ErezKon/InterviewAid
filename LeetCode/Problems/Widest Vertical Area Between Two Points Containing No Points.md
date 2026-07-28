# 1637. Widest Vertical Area Between Two Points Containing No Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points)
**Companies:** Amazon, General Motors, Google, Microsoft
---

## Problem Description
Given a list of points `points` on a 2‑D plane, each represented as `[x, y]`, find the maximum width of a vertical area that contains no points. A vertical area is defined by two x‑coordinates `x1 < x2`; its width is `x2 - x1`. Return the largest such width.

## Examples
- Input: `[[8,7],[9,9],[7,4],[9,7]]` → Output: `1`
  (Sorted x‑coordinates: 7,8,9 → max gap = 1.)
- Input: `[[3,1],[9,2],[6,1],[9,0],[4,0]]` → Output: `3`
  (Sorted x‑coordinates: 3,4,6,9 → max gap = 3.)

## Approach
Extract all x‑coordinates, sort them, and compute the maximum difference between consecutive x values.

```text
FUNCTION maxWidthOfVerticalArea(points):
    SET xs ← SORTED LIST of unique x values from points
    SET maxGap ← 0
    FOR i ← 0 TO LENGTH(xs)-2:
        SET gap ← xs[i+1] - xs[i]
        IF gap > maxGap:
            SET maxGap ← gap
    RETURN maxGap
```

## Walkthrough
| Step | xs (sorted) | Gap | maxGap |
|------|-------------|-----|--------|
| 0    | [7,8,9]     | 1   | 1 |
| 1    | …           | 1   | 1 |
Result = 1.

## Complexity Analysis
- Time: O(n log n) for sorting `n` points.
- Space: O(n) to store the sorted x‑coordinates.

## Follow‑Up Questions
- How would you adapt the solution for the widest horizontal area?
- What if points could be added dynamically and you needed to maintain the max gap?
- Can you solve it in O(n) using a bucket sort when coordinates are bounded?

## Key Takeaway
Sorting the unique x‑coordinates and scanning adjacent gaps yields the widest empty vertical strip.
