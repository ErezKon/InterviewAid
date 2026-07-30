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

Given 2D `points` and a string `s` (labels), find the **maximum side length** of a square centered at origin such that no two points inside share the same label. Return the max number of points inside.

**Constraints:**
- `1 <= points.length <= 10^5`

---

## Examples

**Example 1:**
```
Input:  points = [[2,2],[-1,-2],[-4,4],[-3,1],[3,-3]], s = "abdca"
Output: 2
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
