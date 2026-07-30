# 2249. Count Lattice Points Inside a Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-lattice-points-inside-a-circle](https://leetcode.com/problems/count-lattice-points-inside-a-circle)
**Companies:** Rubrik

---

## 1. Problem Description

Given multiple circles `(x, y, r)`, count the number of integer-coordinate lattice points that lie inside or on the boundary of at least one circle.

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
Input: circles = [[0,0,1],[2,2,2]]
Output: 15
Explanation:
First circle covers points (0,0),(0,1),(1,0),(1,1),(-1,0),(0,-1),(-1,-1),(-1,1),(1,-1).
Second circle adds additional points; total unique lattice points = 15.
```

**Example 2:**
```
Input: circles = [[1,1,1]]
Output: 5
Explanation: Points are (1,1),(0,1),(2,1),(1,0),(1,2).
```

---

## 4. Walkthrough

Take Example 1 (`circles = [[0,0,1],[2,2,2]]`):
1. Initialize empty set `points`.
2. Process first circle (center 0,0 radius 1): iterate x from -1 to 1, y from -1 to 1, add points whose squared distance ≤1.
   - Added points: (-1,-1),(-1,0),(-1,1),(0,-1),(0,0),(0,1),(1,-1),(1,0),(1,1).
3. Process second circle (center 2,2 radius 2): iterate x from 0 to 4, y from 0 to 4, check distance condition, add new points.
4. After both circles, the set contains 15 unique lattice points.

---

## 5. Complexity Analysis

- **Time:** For each circle we examine a square of side `2r+1`, giving O(n × r²) where `n` is number of circles.
- **Space:** O(total unique lattice points) stored in the set.

---

## 6. Follow-Up Questions

1. How would you improve the algorithm for large radii where enumeration becomes expensive?
2. Can you adapt the solution to work with floating‑point circle definitions while still counting integer points?
3. What data structure could replace the set to support counting without storing all points explicitly?

---

## Key Takeaway

> For small radii, brute‑force enumeration of the bounding box combined with a set to deduplicate yields a simple and effective solution.
