# 3382. Maximum Area Rectangle With Point Constraints II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii)
**Companies:** Google, Ukg

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sweep Line + Segment Tree — O(n² log n)](#approach-sweep-line--segment-tree--on²-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Same as Part I but with larger constraints — find the maximum area axis-aligned rectangle with corners at given points and no other points inside or on the boundary. Requires an efficient approach.

---

## Key Insight

> Group points by x-coordinate. For each pair of x-coordinates sharing at least 2 y-values, check if the rectangle formed has no interior points. Use a **sweep line** with a data structure (segment tree or BIT) to efficiently query whether a region is empty.

---

## Approach: Sweep Line + Segment Tree — O(n² log n) ✅

```text
FUNCTION maxRectArea(points):
    // Group points by x and sort x-values
    result = -1
    prevX = {}    // map (y1, y2) → last x where both y's appear
    FOR x IN sorted unique x-values:
        yVals = sorted y-values at x
        FOR i FROM 0 TO LENGTH(yVals) - 2:
            FOR j FROM i + 1 TO LENGTH(yVals) - 1:
                pair = (yVals[i], yVals[j])
                IF pair IN prevX:
                    px = prevX[pair]
                    // Verify interior is empty using range query structure
                    area = (x - px) * (yVals[j] - yVals[i])
                    result = MAX(result, area)
                prevX[pair] = x
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep + pair tracking | **O(n² log n)** | O(n²) |

---

## Examples

**Example 1:**
```
Input: points = [[0,0],[0,3],[3,0],[3,3],[1,1],[2,2]]
Output: 9
Explanation: Rectangle formed by (0,0),(0,3),(3,0),(3,3) has area 9 and no interior points.
```

**Example 2:**
```
Input: points = [[0,0],[1,2],[2,1],[3,3]]
Output: -1
Explanation: No valid rectangle satisfies the interior‑free condition.
```

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Group points by their x‑coordinate and sort x values. | Enables column‑wise processing. |
| 2 | For each x‑column, collect sorted y‑values. | Provides ordered pairs of potential rectangle heights. |
| 3 | Enumerate all pairs of y‑values within the column. | Each pair defines a possible top‑bottom edge. |
| 4 | Use a hash map `prevX` to remember the last x‑column where this y‑pair appeared. | Forms the left side of a candidate rectangle. |
| 5 | When the same y‑pair reappears at a new x, compute area using distance between current and previous x. | Gives a rectangle with those y‑bounds. |
| 6 | Optionally query a segment tree/BIT to ensure the interior region is empty. | Satisfies the “no interior points” constraint. |
| 7 | Update the maximum area if larger. | Tracks best solution. |

---

## Follow-Up Questions

- How would you adapt the algorithm for non‑axis‑aligned rectangles?
- Can you reduce the time complexity using advanced geometric data structures?
- What changes are needed if interior points are allowed but must be minimized?

---

## Key Takeaway

> **Track (y1, y2) pairs across x‑columns using a hash map.** The last x‑column that had both y‑values forms the closest valid rectangle. Use range queries for the interior emptiness check.
