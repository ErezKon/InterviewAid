# 3143. Maximum Points Inside the Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-points-inside-the-square](https://leetcode.com/problems/maximum-points-inside-the-square)
**Companies:** Hashedin

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a 2D array `points` and a string `s` where, `points[i]` represents the coordinates of point `i`, and `s[i]` represents the **tag** of point `i`.

A **valid** square is a square centered at the origin `(0, 0)`, has edges parallel to the axes, and **does not** contain two points with the same tag.

Return the **maximum** number of points contained in a **valid** square.

Note:

- A point is considered to be inside the square if it lies on or within the square's boundaries.
- The side length of the square can be zero.

**Constraints:**
- `1 <= s.length, points.length <= 10^5`
- `points[i].length == 2`
- `-10^9 <= points[i][0], points[i][1] <= 10^9`
- `s.length == points.length`
- `points` consists of distinct coordinates.
- `s` consists only of lowercase English letters.

---

## Examples

```
Example 1:
  Input: points = [[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], s = "abdca"
  Output: 2
  Explanation: The square of side length 4 covers two points points[0] and points[1].
```

```
Example 2:
  Input: points = [[1,1],[-2,-2],[-2,2]], s = "abb"
  Output: 1
  Explanation: The square of side length 2 covers one point, which is points[0].
```

```
Example 3:
  Input: points = [[1,1],[-1,-1],[2,-2]], s = "ccd"
  Output: 0
  Explanation: It's impossible to make any valid squares centered at the origin such that it covers only one point among points[0] and points[1].
```

---

## Key Insight

> For each label, find its **closest point** (by Chebyshev distance = max(|x|, |y|)). The square can grow up to the point where a duplicate label would be included. Sort points by distance and greedily include until a label repeats.

---

## Approach

```
FUNCTION maxPointsInsideSquare(points, s)
    // For each label, track the two smallest distances
    minDist ← map: label → [smallest, secondSmallest]

    FOR i ← 0 TO n-1 DO
        d ← MAX(|points[i][0]|, |points[i][1]|)
        Update minDist[s[i]] with d

    // The square size limit = min of all "second smallest" distances (causes conflict)
    limit ← MIN of all second-smallest distances across labels
    // Count labels whose smallest distance < limit
    RETURN count of labels with smallest distance < limit
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(26)** — per-label tracking |

---

## Key Takeaway

> **Chebyshev distance + per-label tracking** — find the maximum square side before any label conflict occurs. The bottleneck is the closest duplicate label.
