# 3625. Count Number of Trapezoids II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-trapezoids-ii](https://leetcode.com/problems/count-number-of-trapezoids-ii)
**Companies:** Google, Meta

---

## 1. Problem Description

You are given a 2D integer array `points` where `points[i] = [x_i, y_i]` represents the coordinates of the `i^th` point on the Cartesian plane.

Return the number of unique **trapezoids* that can be formed by choosing any four distinct points from `points`.

A** ****trapezoid** is a convex quadrilateral with **at least one pair** of parallel sides. Two lines are parallel if and only if they have the same slope.

**Constraints:**
- `4 <= points.length <= 500`
- `–1000 <= x_i, y_i <= 1000`
- All points are pairwise distinct.

---

## 2. Examples

**Example 1:**
```
Input: points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]
Output: 2
Explanation: There are two distinct ways to pick four points that form a trapezoid:
- The points [-3,2], [2,3], [3,2], [2,-3] form one trapezoid.
- The points [2,3], [3,2], [3,0], [2,-3] form another trapezoid.
```

**Example 2:**
```
Input: points = [[0,0],[1,0],[0,1],[2,1]]
Output: 1
Explanation: There is only one trapezoid which can be formed.
```

---

## 3. Approach: Slope Grouping + Combinatorics — O(n² log n) ✅

```text
FUNCTION countTrapezoids(points):
    // Compute slope for every unordered pair of points
    slopeMap ← defaultdict(list)  // slope → list of (i, j) indices
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            dy ← points[j].y - points[i].y
            dx ← points[j].x - points[i].x
            slope ← reducedFraction(dy, dx)
            slopeMap[slope].APPEND((i, j))
    
    total ← 0
    FOR each slope, edges IN slopeMap:
        m ← LENGTH(edges)
        // Count all unordered pairs of edges
        pairCount ← m * (m - 1) / 2
        // Subtract pairs that share an endpoint
        shared ← 0
        endpointFreq ← defaultdict(int)
        FOR (i, j) IN edges:
            endpointFreq[i] += 1
            endpointFreq[j] += 1
        FOR freq IN endpointFreq.VALUES():
            shared += freq * (freq - 1) / 2
        total += pairCount - shared
    
    // Each rectangle is counted twice (once per parallel direction)
    rectangleCount ← countRectangles(points)
    RETURN total - rectangleCount
```

---

## 4. Walkthrough

| Step | Action | Insight |
|------|--------|---------|
| 1 | Generate all point pairs and compute their reduced slope. | Groups edges that could be opposite sides of a trapezoid. |
| 2 | For each slope group, count all unordered edge pairs (`pairCount`). | Potential parallel side pairs. |
| 3 | Remove pairs that share a vertex (`shared`). | Ensures the four vertices are distinct. |
| 4 | Sum `pairCount - shared` over all slopes → candidates for trapezoids. | Every candidate has exactly one pair of parallel sides. |
| 5 | Subtract rectangles counted twice using a separate rectangle counter. | Guarantees “exactly one” pair of parallel sides. |

---

## 5. Complexity Analysis

- **Time:** O(n² log n) – generating all pairs (O(n²)) and inserting into a hash map with slope reduction (log maxCoordinate).
- **Space:** O(n²) – storing all edge pairs grouped by slope.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to count only **isosceles trapezoids**?
2. Can the solution be extended to **3‑dimensional points** to count trapezoidal faces of a polyhedron?
3. What if the input size is huge (≥10⁵ points)? Discuss approximation or randomized techniques.

---

## Key Takeaway

> Trapezoid detection: group edges by slope, pick two non‑adjacent parallel edges, then subtract parallelograms. Slope representation as reduced fractions avoids floating‑point issues.
