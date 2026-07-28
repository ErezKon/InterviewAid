# 2473. Minimum Cost to Buy Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-buy-apples](https://leetcode.com/problems/minimum-cost-to-buy-apples)
**Companies:** Directi, Medianet

---

## Problem Description

You are given an undirected weighted graph with `n` cities (0‑indexed) and a list of roads `edges` where each edge is `[u, v, w]` representing a bidirectional road of travel cost `w`. Each city `i` sells an apple at price `appleCost[i]`. Starting from any city, you may travel to a city, purchase one apple, and return to the start city. The round‑trip travel cost equals twice the shortest‑path distance between the two cities. For every city `i`, compute the minimum total cost to obtain an apple and return home.

Constraints:
- `1 ≤ n ≤ 10^5`
- `0 ≤ w, appleCost[i] ≤ 10^9`
- The graph is connected.

## Examples

**Example 1**
```
Input: n = 3, edges = [[0,1,2],[1,2,2]], appleCost = [5,1,4]
Output: [5,1,5]
Explanation:
- City 0: buying locally costs 5; buying from city 1 costs 2*2 + 1 = 5.
- City 1: cheapest is buying locally for 1.
- City 2: buying locally costs 4, buying from city 1 costs 2*2 + 1 = 5, so answer is 4.
```

**Example 2**
```
Input: n = 4, edges = [[0,1,3],[1,2,1],[2,3,4]], appleCost = [10,2,8,3]
Output: [8,2,6,5]
```

## Approach

**Algorithm:** Multi‑source Dijkstra (all apple cities as sources)

Treat each city `j` as a source with initial distance equal to its apple price `appleCost[j]`. When expanding an edge `(u, v, w)`, add `2*w` because the round‑trip travel cost is incurred twice. The resulting distance `dist[i]` after the algorithm finishes equals the minimum `appleCost[j] + 2 * shortestPath(i, j)`.

```text
FUNCTION minCostApples(n, edges, appleCost):
    // Build adjacency list
    graph ← ADJ_LIST(n)
    FOR (u, v, w) IN edges DO
        graph[u].APPEND((v, w))
        graph[v].APPEND((u, w))
    END FOR
    // Initialise distances with apple costs
    dist ← ARRAY(n, INFINITY)
    pq ← MIN_HEAP()
    FOR j ← 0 TO n-1 DO
        dist[j] ← appleCost[j]
        pq.PUSH((dist[j], j))
    END FOR
    // Dijkstra with doubled edge weight
    WHILE pq NOT EMPTY DO
        (d, u) ← pq.POP()
        IF d > dist[u] THEN CONTINUE
        FOR (v, w) IN graph[u] DO
            nd ← d + 2 * w
            IF nd < dist[v] THEN
                dist[v] ← nd
                pq.PUSH((nd, v))
            END IF
        END FOR
    END WHILE
    RETURN dist
```

## Walkthrough

| Step | Extracted node | Current distance | Edge relaxed | Updated distance |
|------|----------------|------------------|--------------|------------------|
| 1 | city 1 (cost 1) | 1 | 1→0 (2) → nd = 1 + 4 = 5 | dist[0] = 5 |
| 2 | city 0 (5) | 5 | 0→1 (2) → nd = 5 + 4 = 9 (no change) |
| 3 | city 2 (4) | 4 | 2→1 (2) → nd = 4 + 4 = 8 (no improvement) |
| … | … | … | … | … |

The final `dist` array provides the optimal buy‑and‑return cost for each city.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O((V+E) log V)** – Dijkstra on `n` vertices and `|edges|` edges |
| Space  | **O(V + E)** – adjacency list, distance array, priority queue |

## Follow‑Up Questions

1. How would the algorithm change if the return trip cost were a different multiplier than 2?
2. Can we support dynamic updates to road weights or apple prices without recomputing from scratch?
3. What if only a subset of cities are allowed as purchase locations?

## Key Takeaway

Running Dijkstra from all cities simultaneously, seeded with their apple prices and using doubled edge weights, yields the minimum round‑trip purchase cost for every city in a single pass.
