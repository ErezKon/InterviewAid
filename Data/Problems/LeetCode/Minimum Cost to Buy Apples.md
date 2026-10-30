# 2473. Minimum Cost to Buy Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-buy-apples](https://leetcode.com/problems/minimum-cost-to-buy-apples)
**Companies:** Directi, Medianet

---

## Problem Description

You are given a positive integer `n` representing `n` cities numbered from `1` to `n`. You are also given a **2D** array `roads`, where `roads[i] = [ai, bi, costi]` indicates that there is a **bidirectional** road between cities `ai` and `bi` with a cost of traveling equal to `costi`.

You can buy apples in **any** city you want, but some cities have different costs to buy apples. You are given the 1-based array `appleCost` where `appleCost[i]` is the cost of buying one apple from city `i`.

You start at some city, traverse through various roads, and eventually buy **exactly** one apple from **any** city. After you buy that apple, you have to return back to the city you **started** at, but now the cost of all the roads will be **multiplied** by a given factor `k`.

Given the integer `k`, return *a 1-based array* `answer` *of size* `n` *where* `answer[i]` *is the **minimum** total cost to buy an apple if you start at city* `i`.

**Constraints:**
- `2 ≤ n ≤ 1000`
- `1 ≤ roads.length ≤ 2000`
- `1 ≤ ai, bi ≤ n`
- `ai != bi`
- `1 ≤ costi ≤ 10^5`
- `appleCost.length == n`
- `1 ≤ appleCost[i] ≤ 10^5`
- `1 ≤ k ≤ 100`
- There are no repeated edges.

## Examples

```
Example 1:
  Input: n = 4, roads = [[1,2,4],[2,3,2],[2,4,5],[3,4,1],[1,3,4]], appleCost = [56,42,102,301], k = 2
  Output: [54,42,48,51]
  Explanation: The minimum cost for each starting city is the following:
  - Starting at city 1: You take the path 1 -> 2, buy an apple at city 2, and finally take the path 2 -> 1. The total cost is 4 + 42 + 4 * 2 = 54.
  - Starting at city 2: You directly buy an apple at city 2. The total cost is 42.
  - Starting at city 3: You take the path 3 -> 2, buy an apple at city 2, and finally take the path 2 -> 3. The total cost is 2 + 42 + 2 * 2 = 48.
  - Starting at city 4: You take the path 4 -> 3 -> 2 then you buy at city 2, and finally take the path 2 -> 3 -> 4. The total cost is 1 + 2 + 42 + 1 * 2 + 2 * 2 = 51.
```

```
Example 2:
  Input: n = 3, roads = [[1,2,5],[2,3,1],[3,1,2]], appleCost = [2,3,1], k = 3
  Output: [2,3,1]
  Explanation: It is always optimal to buy the apple in the starting city.
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
