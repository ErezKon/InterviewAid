# 2473. Minimum Cost to Buy Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-buy-apples](https://leetcode.com/problems/minimum-cost-to-buy-apples)
**Companies:** Directi, Medianet

---

## Key Insight

> Same idea as the II variant: for each starting city, find the minimum `2 * shortestPath(start, j) + appleCost[j]`. Use multi-source Dijkstra with initial distances set to apple costs, and edge weights doubled for the round trip.

---

## Approach: Multi-source Dijkstra ✅

```
FUNCTION minCostBuyApples(n, roads, appleCost, k):
    // k = travel cost multiplier for return trip
    dist ← ARRAY(n, INFINITY)
    pq ← MIN_HEAP()
    FOR j ← 0 TO n-1 DO
        dist[j] ← appleCost[j]
        pq.PUSH((appleCost[j], j))
    
    WHILE pq NOT EMPTY DO
        (cost, u) ← pq.POP()
        IF cost > dist[u] THEN CONTINUE
        FOR (v, w) IN roads[u] DO
            newCost ← cost + (1 + k) * w
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

> **Multi-source Dijkstra** — initialize all cities with their apple cost, then propagate with round-trip edge weights. Solves all cities in one pass.

---
