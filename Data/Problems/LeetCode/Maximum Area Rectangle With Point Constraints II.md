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

There are n points on an infinite plane. You are given two integer arrays `xCoord` and `yCoord` where `(xCoord[i], yCoord[i])` represents the coordinates of the `i^th` point.

Your task is to find the **maximum **area of a rectangle that:

- Can be formed using **four** of these points as its corners.
- Does **not** contain any other point inside or on its border.
- Has its edges **parallel** to the axes.

Return the **maximum area** that you can obtain or -1 if no such rectangle is possible.

**Constraints:**
- `1 <= xCoord.length == yCoord.length <= 2 * 10^5`
- `0 <= xCoord[i], yCoord[i] <= 8 * 10^7`
- All the given points are **unique**.

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
Input: xCoord = [1,1,3,3], yCoord = [1,3,1,3]
Output: 4
Explanation: ![img](https://assets.leetcode.com/uploads/2024/11/02/example1.png)
We can make a rectangle with these 4 points as corners and there is no other point that lies inside or on the border. Hence, the maximum possible area would be 4.
```

**Example 2:**
```
Input: xCoord = [1,1,3,3,2], yCoord = [1,3,1,3,2]
Output: -1
Explanation: ![img](https://assets.leetcode.com/uploads/2024/11/02/example2.png)
There is only one rectangle possible is with points [1,1], [1,3], [3,1] and [3,3] but [2,2] will always lie inside it. Hence, returning -1.
```

**Example 3:**
```
Input: xCoord = [1,1,3,3,1,3], yCoord = [1,3,1,3,2,2]
Output: 2
Explanation: ![img](https://assets.leetcode.com/uploads/2024/11/02/example3.png)
The maximum area rectangle is formed by the points [1,3], [1,2], [3,2], [3,3], which has an area of 2. Additionally, the points [1,1], [1,2], [3,1], [3,2] also form a valid rectangle with the same area.
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
