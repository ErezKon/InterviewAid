# 3380. Maximum Area Rectangle With Point Constraints I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i)
**Companies:** Google, Ukg

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Enumerate Pairs — O(n² · n)](#approach-enumerate-pairs--on²--n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given points on a 2D plane, find the maximum area **axis-aligned rectangle** whose four corners are among the given points. Additionally, no other points should lie **inside or on the boundary** of the rectangle.

**Constraints:**
- Small n (brute-force feasible).

---

## Key Insight

> Enumerate all pairs of points as potential diagonal corners of a rectangle. Check that the other two corners exist and that no points lie inside or on the boundary.

---

## Approach: Enumerate Pairs — O(n² · n) ✅

```
FUNCTION maxRectArea(points):
    pointSet = SET(points)
    result = -1
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            (x1,y1), (x2,y2) = points[i], points[j]
            IF x1 == x2 OR y1 == y2: CONTINUE
            // Check other two corners exist
            IF (x1,y2) IN pointSet AND (x2,y1) IN pointSet:
                // Check no points inside or on boundary
                IF noPointsInside(points, x1, y1, x2, y2):
                    result = MAX(result, ABS((x2-x1) * (y2-y1)))
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute-force pairs | **O(n³)** | O(n) |

---

## Key Takeaway

> **Enumerate diagonal corner pairs, verify the other two corners exist, and check the interior constraint.** Feasible for small n.
