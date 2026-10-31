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

You are given an array `points` where `points[i] = [x_i, y_i]` represents the coordinates of a point on an infinite plane.

Your task is to find the **maximum **area of a rectangle that:

- Can be formed using **four** of these points as its corners.
- Does **not** contain any other point inside or on its border.
- Has its edges **parallel** to the axes.

Return the **maximum area** that you can obtain or -1 if no such rectangle is possible.

**Constraints:**
- `1 <= points.length <= 10`
- `points[i].length == 2`
- `0 <= x_i, y_i <= 100`
- All the given points are **unique**.

---

## Key Insight

> Enumerate all pairs of points as potential diagonal corners of a rectangle. Check that the other two corners exist and that no points lie inside or on the boundary.

---

## Approach: Enumerate Pairs — O(n² · n) ✅

```text
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

## Examples

**Example 1:**
```
Input: points = [[1,1],[1,3],[3,1],[3,3]]
Output: 4
Explanation: ![img](https://assets.leetcode.com/uploads/2026/02/23/3380_ex0.png)
We can make a rectangle with these 4 points as corners and there is no other point that lies inside or on the border. Hence, the maximum possible area would be 4.
```

**Example 2:**
```
Input: points = [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: -1
Explanation: ![img](https://assets.leetcode.com/uploads/2026/02/23/3380_ex1.png)
There is only one rectangle possible is with points [1,1], [1,3], [3,1] and [3,3] but [2,2] will always lie inside it. Hence, returning -1.
```

**Example 3:**
```
Input: points = [[1,1],[1,3],[3,1],[3,3],[1,2],[3,2]]
Output: 2
Explanation: ![img](https://assets.leetcode.com/uploads/2026/02/23/3380_ex2.png)
The maximum area rectangle is formed by the points [1,3], [1,2], [3,2], [3,3], which has an area of 2. Additionally, the points [1,1], [1,2], [3,1], [3,2] also form a valid rectangle with the same area.
```

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Insert all points into a hash set for O(1) lookup. | Enables quick existence checks. |
| 2 | Iterate over every unordered pair of points as potential diagonal corners. | Enumerates all rectangle candidates. |
| 3 | Skip pairs sharing x or y coordinate (cannot form a rectangle). | Ensures rectangle is axis-aligned. |
| 4 | Verify the other two corners exist in the set. | Guarantees a complete rectangle. |
| 5 | Call `noPointsInside` to ensure no other points lie inside or on the boundary. | Satisfies the interior-free constraint. |
| 6 | Compute area and update the maximum if larger. | Tracks the best solution. |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute-force pairs | **O(n³)** | O(n) |

---

## Follow-Up Questions

- How would you handle a large number of points (n up to 10⁵)?
- Can the problem be extended to non-axis-aligned rectangles?
- What if interior points are allowed but must be minimized?

---

## Key Takeaway

> **Enumerate diagonal corner pairs, verify the other two corners exist, and check the interior constraint.** Feasible for small n.
