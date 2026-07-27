# 3928. Minimum Cost to Buy Apples II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-buy-apples-ii](https://leetcode.com/problems/minimum-cost-to-buy-apples-ii)
**Companies:** Amazon

---

## Key Insight

> For each city, find the cheapest way to buy apples: travel to a city with apples, buy, and return. This is a **multi-source shortest path** problem — run Dijkstra from all apple cities simultaneously, with return trip cost doubled.

---

## Approach: Multi-source Dijkstra ✅

```
FUNCTION minCostApples(n, roads, appleCost):
    // For each city i, answer = min over all cities j of:
    //   2 * shortestPath(i, j) + appleCost[j]
    // Reverse perspective: for each city j, it "offers" appleCost[j]
    // Run modified Dijkstra from all cities with initial cost = appleCost[j]
    
    dist ← ARRAY(n, INFINITY)
    pq ← MIN_HEAP()
    FOR j ← 0 TO n-1 DO
        dist[j] ← appleCost[j]
        pq.PUSH((appleCost[j], j))
    
    WHILE pq NOT EMPTY DO
        (cost, u) ← pq.POP()
        IF cost > dist[u] THEN CONTINUE
        FOR (v, w) IN roads[u] DO
            // Travel cost is doubled (round trip)
            newCost ← cost + 2 * w
            IF newCost < dist[v] THEN
                dist[v] ← newCost
                pq.PUSH((newCost, v))
    
    RETURN dist
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Multi-source Dijkstra | **O((V+E) log V)** | **O(V + E)** |

---

## Key Takeaway

> **Multi-source Dijkstra with buying cost as initial distance** — each city starts with its apple cost, and edges cost 2× (round trip). The final distances give the optimal buy-and-return cost for each city.

---
