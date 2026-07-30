# 3625. Count Number of Trapezoids II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-trapezoids-ii](https://leetcode.com/problems/count-number-of-trapezoids-ii)
**Companies:** Google, Meta

---

## 1. Problem Description

Given a set of points in 2D, count the number of quadruples that form a trapezoid (exactly one pair of parallel sides).

---

## 2. Examples

**Example 1:**
```
Input: points = [[0,0],[1,1],[2,0],[1,-1]]
Output: 1
Explanation: The four points form a single trapezoid with the top side parallel to the bottom side.
```

**Example 2:**
```
Input: points = [[0,0],[1,2],[2,4],[3,6]]
Output: 0
Explanation: All points are collinear, so no trapezoid can be formed.
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
