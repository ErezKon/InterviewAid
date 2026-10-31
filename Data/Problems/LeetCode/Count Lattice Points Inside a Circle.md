# 2249. Count Lattice Points Inside a Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-lattice-points-inside-a-circle](https://leetcode.com/problems/count-lattice-points-inside-a-circle)
**Companies:** Rubrik

---

## 1. Problem Description

Given a 2D integer array `circles` where `circles[i] = [x_i, y_i, r_i]` represents the center `(x_i, y_i)` and radius `r_i` of the `i^th` circle drawn on a grid, return *the **number of lattice points** **that are present inside **at least one** circle*.

**Note:**

- A **lattice point** is a point with integer coordinates.
- Points that lie **on the circumference of a circle** are also considered to be inside it.

**Constraints:**
- `1 <= circles.length <= 200`
- `circles[i].length == 3`
- `1 <= x_i, y_i <= 100`
- `1 <= r_i <= min(x_i, y_i)`

---

## 2. Approach: Enumerate + Set — O(n × r²) ✅

```text
FUNCTION countLatticePoints(circles):
    points ← SET()
    FOR each (cx, cy, r) IN circles:
        FOR x FROM cx - r TO cx + r:
            FOR y FROM cy - r TO cy + r:
                IF (x - cx)^2 + (y - cy)^2 ≤ r^2:
                    points.ADD((x, y))
    RETURN SIZE(points)
```

---

## 3. Examples

**Example 1:**
```
Input: circles = [[2,2,1]]
Output: 5
Explanation: The figure above shows the given circle.
The lattice points present inside the circle are (1, 2), (2, 1), (2, 2), (2, 3), and (3, 2) and are shown in green.
Other points such as (1, 1) and (1, 3), which are shown in red, are not considered inside the circle.
Hence, the number of lattice points present inside at least one circle is 5.
```

**Example 2:**
```
Input: circles = [[2,2,2],[3,4,1]]
Output: 16
Explanation: The figure above shows the given circles.
There are exactly 16 lattice points which are present inside at least one circle.
Some of them are (0, 2), (2, 0), (2, 4), (3, 2), and (4, 4).
```

---

## 4. Walkthrough

Take Example 1 (`circles = [[0,0,1],[2,2,2]]`):
1. Initialize empty set `points`.
2. Process first circle (center 0,0 radius 1): iterate x from -1 to 1, y from -1 to 1, add points whose squared distance ≤1.
   - Added points: (-1,-1),(-1,0),(-1,1),(0,-1),(0,0),(0,1),(1,-1),(1,0),(1,1).
3. Process second circle (center 2,2 radius 2): iterate x from 0 to 4, y from 0 to 4, check distance condition, add new points.
4. After both circles, the set contains 15 unique lattice points.

---

## 5. Complexity Analysis

- **Time:** For each circle we examine a square of side `2r+1`, giving O(n × r²) where `n` is number of circles.
- **Space:** O(total unique lattice points) stored in the set.

---

## 6. Follow-Up Questions

1. How would you improve the algorithm for large radii where enumeration becomes expensive?
2. Can you adapt the solution to work with floating-point circle definitions while still counting integer points?
3. What data structure could replace the set to support counting without storing all points explicitly?

---

## Key Takeaway

> For small radii, brute-force enumeration of the bounding box combined with a set to deduplicate yields a simple and effective solution.
