# 2662. Minimum Cost of a Path With Special Roads

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads](https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads)
**Companies:** Samsung

---

## Key Insight

> Model as a graph problem. Nodes are start, target, and all special road endpoints. Edges: Manhattan distance between any two points, plus special road shortcuts. Run **Dijkstra** to find shortest path.

---

## Approach: Dijkstra on Key Points ✅

```
FUNCTION minimumCost(start, target, specialRoads):
    // Key points: start, target, all special road start/end points
    // Edge weights: Manhattan distance OR special road cost (whichever is less)
    
    dist ← MAP with default INFINITY
    dist[start] ← 0
    pq ← MIN_HEAP((0, start))
    
    WHILE pq NOT EMPTY DO
        (cost, pos) ← pq.POP()
        IF cost > dist[pos] THEN CONTINUE
        
        // Try going directly to target
        // Try each special road
        FOR (x1, y1, x2, y2, roadCost) IN specialRoads DO
            // Go to road start + take road
            newCost ← cost + manhattan(pos, (x1,y1)) + roadCost
            IF newCost < dist[(x2,y2)] THEN
                dist[(x2,y2)] ← newCost
                pq.PUSH((newCost, (x2,y2)))
    
    RETURN MIN(dist[target], MIN(dist[p] + manhattan(p, target) FOR p))
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Dijkstra | **O(n² log n)** | **O(n)** |

Where n = number of special roads.

---

## Key Takeaway

> **Sparse graph Dijkstra** — treat special road endpoints as graph nodes, with Manhattan distance edges between all pairs and shortcut edges for the roads.

---
