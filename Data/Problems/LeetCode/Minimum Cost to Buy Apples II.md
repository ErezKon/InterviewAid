# 3928. Minimum Cost to Buy Apples II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-buy-apples-ii](https://leetcode.com/problems/minimum-cost-to-buy-apples-ii)
**Companies:** Amazon

---

## Problem Description

You are given an integer `n` and an integer array `prices` of length `n`, where `prices[i]` is the price of apples at shop `i`.

You are also given a 2D integer array `roads`, where `roads[i] = [ui, vi, costi, taxi]` represents a **bidirectional** road:
- `ui` and `vi` are the shops connected by the road.
- `costi` is the cost to travel the road **without** carrying apples.
- `taxi` is the multiplier applied to `costi` when traveling **with** apples.

For each shop `i`, you can either:
- Buy apples locally at shop `i` for `prices[i]`.
- Travel **empty** to any shop `j` using **any** number of roads, buy apples for `prices[j]`, and return to shop `i` while carrying apples, paying `cost * tax` on each road used for the return trip.

The forward path, where you travel empty, and the return path may be **different**.

Return an integer array `ans` of length `n`, where `ans[i]` is the **minimum** total cost to buy apples starting from shop `i`.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `prices.length == n`
- `1 ≤ prices[i] ≤ 10^9`
- `0 ≤ roads.length ≤ min(n × (n - 1) / 2, 2000)`
- `roads[i] = [ui, vi, costi, taxi]`
- `0 ≤ ui, vi ≤ n - 1`
- `ui != vi`
- `1 ≤ costi ≤ 10^9`
- `1 ≤ taxi ≤ 100`
- There are no **repeated** edges.

## Examples

```
Example 1:
  Input: n = 2, prices = [8,3], roads = [[0,1,1,2]]
  Output: [6,3]
  Explanation:
  Shop i | prices[i] | Shop j | prices[j] | costi | taxi | Travel | Return    | Total          | Minimum
  0      | 8         | 1      | 3         | 1     | 2    | 1      | 1 * 2 = 2 | 1 + 2 + 3 = 6  | min(8, 6) = 6
  1      | 3         | 0      | 8         | 1     | 2    | 1      | 1 * 2 = 2 | 1 + 2 + 8 = 11 | min(3, 11) = 3
  Thus, the answer is [6, 3].
```

```
Example 2:
  Input: n = 3, prices = [9,4,6], roads = [[0,1,1,3],[1,2,4,2]]
  Output: [8,4,6]
  Explanation:
  Shop i | prices[i] | Shop j | prices[j] | costi | taxi | Travel | Return    | Total          | Minimum
  0      | 9         | 1      | 4         | 1     | 3    | 1      | 1 * 3 = 3 | 1 + 3 + 4 = 8  | min(9, 8) = 8
  1      | 4         | 2      | 6         | 4     | 2    | 4      | 4 * 2 = 8 | 4 + 8 + 6 = 18 | min(4, 18) = 4
  2      | 6         | 1      | 4         | 4     | 2    | 4      | 4 * 2 = 8 | 4 + 8 + 4 = 16 | min(6, 16) = 6
  Thus, the answer is [8, 4, 6].
```

```
Example 3:
  Input: n = 3, prices = [10,11,1], roads = [[0,2,1,3],[1,2,3,4],[0,1,5,2]]
  Output: [5,11,1]
  Explanation:
  Shop i | prices[i] | Shop j | prices[j] | costi | taxi | Travel | Return     | Total           | Minimum
  0      | 10        | 2      | 1         | 1     | 3    | 1      | 1 * 3 = 3  | 1 + 3 + 1 = 5   | min(10, 5) = 5
  1      | 11        | 2      | 1         | 3     | 4    | 3      | 3 * 4 = 12 | 3 + 12 + 1 = 16 | min(11, 16) = 11
  2      | 1         | 0      | 10        | 1     | 3    | 1      | 1 * 3 = 3  | 1 + 3 + 10 = 14 | min(1, 14) = 1
  Thus, the answer is [5, 11, 1].
```

## Approach

**Algorithm:** Multi‑source Dijkstra (all apple cities as sources)

Treat each city `j` as a source with initial distance equal to its apple price `appleCost[j]`. When expanding an edge `(u, v, w)`, add `2*w` because traveling from `u` to `j` and back incurs a round‑trip cost. The resulting distance `dist[i]` after the algorithm finishes equals the minimum `appleCost[j] + 2 * shortestPath(i, j)`.

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
| 1 | city 1 (cost 1) | 1 | 1→0 (2) → nd = 1+4 =5 | dist[0]=5 |
| 2 | city 0 (5) | 5 | 0→1 (2) → nd=5+4=9 (no change) |
| … | … | … | … | … |

The final `dist` array gives the optimal buy‑and‑return cost for each city.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O((V+E) log V)** – Dijkstra on `n` vertices and `|edges|` edges |
| Space  | **O(V + E)** – adjacency list, distance array, priority queue |

## Follow‑Up Questions

1. How would the solution adapt if the return trip cost were a different multiplier than 2?
2. Can we handle dynamic updates to road weights or apple prices without recomputing from scratch?
3. What if only a subset of cities are allowed as purchase locations?

## Key Takeaway

Running Dijkstra from all cities simultaneously, seeded with their apple prices and using doubled edge weights, yields the minimum round‑trip purchase cost for every city in a single pass.
