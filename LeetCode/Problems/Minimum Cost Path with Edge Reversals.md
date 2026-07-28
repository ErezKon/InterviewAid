# 3650. Minimum Cost Path with Edge Reversals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-edge-reversals](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals)
**Companies:** Amazon, Asana, Bloomberg, Google, Meta, Microsoft, Oracle, Palantir

---

## Problem Description

Given a directed graph with `n` nodes labeled `0 … n-1` and a list of directed edges, you may traverse an edge in its original direction at zero cost or reverse its direction at a cost of one. Starting from `source`, find the minimum total cost required to reach `target`. If `target` is unreachable, return `-1`.

## Examples

1. **Input:** `n = 5`, `edges = [[0,1],[2,1],[2,3],[4,3]]`, `source = 0`, `target = 3`
   **Output:** `1`
   **Explanation:** Reverse edge `2→1` to `1→2` (cost 1) and follow `0→1→2→3`.
2. **Input:** `n = 3`, `edges = [[0,1],[1,2]]`, `source = 0`, `target = 2`
   **Output:** `0`
   **Explanation:** All edges already point from source to target.

## Approach

**Algorithm:** 0‑1 BFS (deque based shortest path for binary edge weights).

- Build an undirected representation where traversing an original edge has cost 0 and traversing the reverse direction has cost 1.
- Perform BFS using a double‑ended queue: push cost‑0 neighbors to the front, cost‑1 neighbors to the back.
- The first time we pop `target` we have the minimum cost.

```text
FUNCTION minCostPath(n, edges, source, target):
    // Build adjacency list with (neighbor, cost)
    graph ← ARRAY of empty lists size n
    FOR (u, v) IN edges DO
        APPEND (v, 0) TO graph[u]          // original direction, cost 0
        APPEND (u, 1) TO graph[v]          // reversed direction, cost 1

    dist ← ARRAY(n, INFINITY)
    dist[source] ← 0
    deque ← DEQUE()
    deque.PUSH_FRONT((source, 0))

    WHILE deque NOT EMPTY DO
        (node, curCost) ← deque.POP_FRONT()
        IF curCost > dist[node] THEN CONTINUE
        FOR (nbr, w) IN graph[node] DO
            newCost ← curCost + w
            IF newCost < dist[nbr] THEN
                dist[nbr] ← newCost
                IF w = 0 THEN
                    deque.PUSH_FRONT((nbr, newCost))
                ELSE
                    deque.PUSH_BACK((nbr, newCost))

    RETURN dist[target] IF dist[target] ≠ INFINITY ELSE -1
```

## Walkthrough

| Step | Deque (front→back) | Distances                     |
|------|--------------------|------------------------------|
| Init | [(0,0)]            | [0,∞,∞,∞,∞]                  |
| Pop  | –                  | Explore 0→1 (cost 0) → push front |
| …    | (continue until target reached) |

The algorithm expands zero‑cost edges first, guaranteeing the shortest reversal count.

## Complexity Analysis

- **Time:** `O(V + E)` – each edge examined at most once.
- **Space:** `O(V + E)` for the adjacency list and distance array.

## Follow‑Up Questions

- How would you modify the solution to also return the actual path with reversals?
- What if each reversal had a different cost instead of a uniform `1`?
- Can the same technique be applied to weighted graphs with only two distinct weights?

## Key Takeaway

Use **0‑1 BFS** for graphs with binary edge costs: push zero‑cost moves to the front of a deque and one‑cost moves to the back to achieve linear‑time shortest paths.
