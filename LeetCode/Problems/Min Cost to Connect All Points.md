# 1584. Min Cost to Connect All Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/min-cost-to-connect-all-points](https://leetcode.com/problems/min-cost-to-connect-all-points)
**Companies:** Amazon, Directi, Flipkart, Google, Meta, Microsoft, Nutanix, Paypay, Tiktok, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` points on a 2D plane, connect all points with the **minimum total Manhattan distance**. The cost between `(x1,y1)` and `(x2,y2)` is `|x1-x2| + |y1-y2|`. Return the minimum cost to make all points connected (MST).

**Constraints:**
- `1 ≤ points.length ≤ 1000`

---

## Examples

**Example 1:**
```
Input:  points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
```

---

## Key Insight

> This is a **Minimum Spanning Tree** problem on a complete graph. Since every pair of points is connected, there are O(n²) edges. Prim's algorithm with a heap is efficient here — no need to enumerate all edges upfront.

---

## Approach: Prim's Algorithm — O(n² log n) ✅

```
FUNCTION minCostConnectPoints(points):
    n ← LEN(points)
    visited ← SET()
    heap ← [(0, 0)]    // (cost, pointIdx)
    totalCost ← 0

    WHILE LEN(visited) < n DO
        (cost, i) ← heap.POP_MIN()
        IF i IN visited THEN CONTINUE
        visited.ADD(i)
        totalCost ← totalCost + cost

        FOR j ← 0 TO n - 1 DO
            IF j NOT IN visited THEN
                dist ← ABS(points[i][0]-points[j][0]) + ABS(points[i][1]-points[j][1])
                heap.PUSH((dist, j))

    RETURN totalCost
```

---

## Walkthrough

```
points = [[0,0],[2,2],[3,10],[5,2],[7,0]]

Start at point 0. totalCost=0
Visit 0: push edges to 1(4), 2(13), 3(7), 4(7)
Pop (4,1): visit 1. totalCost=4. Push edges from 1.
Pop (7,3): visit 3. totalCost=11.
Pop (7,4): visit 4. totalCost=18.
Pop (2,2): cost to 2 from best neighbor = ... eventually totalCost=20

Result: 20 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prim's with heap | **O(n² log n)** | **O(n²)** |
| Kruskal's | O(n² log n) | O(n²) |

Complete graph → Prim's is often better than Kruskal's (avoids sorting all O(n²) edges).

---

## Follow-Up Questions

1. **Why Prim's over Kruskal's?** With a complete graph (n² edges), Prim's avoids generating and sorting all edges upfront.
2. **Can we optimize further?** Prim's with adjacency array (no heap) runs in O(n²) for dense graphs.
3. **What if the metric is Euclidean instead of Manhattan?** Same MST algorithm, just change the distance formula.

---

## Key Takeaway

> **MST on complete graphs** — Prim's with a min-heap is the go-to. Start from any node, greedily add the cheapest edge connecting a new node. For dense graphs, the O(n²) Prim's variant is optimal.

---
