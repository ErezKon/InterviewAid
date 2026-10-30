# 1637. Widest Vertical Area Between Two Points Containing No Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points)
**Companies:** Amazon, General Motors, Google, Microsoft

---

## Problem Description

Given `n` `points` on a 2D plane where `points[i] = [x_i, y_i]`, Return *the **widest vertical area** between two points such that no points are inside the area.*

A **vertical area** is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The **widest vertical area** is the one with the maximum width.

Note that points **on the edge** of a vertical area **are not** considered included in the area.

**Constraints:**
- `n == points.length`
- `2 <= n <= 10^5`
- `points[i].length == 2`
- `0 <= x_i, y_i <= 10^9`

## Examples

**Example 1:**
```
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Both the red and the blue area are optimal.
```

**Example 2:**
```
Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3
```

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
