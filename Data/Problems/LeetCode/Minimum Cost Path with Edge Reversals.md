# 3650. Minimum Cost Path with Edge Reversals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-edge-reversals](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals)
**Companies:** Amazon, Asana, Bloomberg, Google, Meta, Microsoft, Oracle, Palantir

---

## Problem Description

You are given a directed, weighted graph with `n` nodes labeled from 0 to `n - 1`, and an array `edges` where `edges[i] = [ui, vi, wi]` represents a directed edge from node `ui` to node `vi` with cost `wi`.

Each node `ui` has a switch that can be used **at most once**: when you arrive at `ui` and have not yet used its switch, you may activate it on one of its incoming edges `vi → ui` reverse that edge to `ui → vi` and **immediately** traverse it.

The reversal is only valid for that single move, and using a reversed edge costs `2 * wi`.

Return the **minimum** total cost to travel from node 0 to node `n - 1`. If it is not possible, return -1.

**Constraints:**
- `2 <= n <= 5 * 10^4`
- `1 <= edges.length <= 10^5`
- `edges[i] = [ui, vi, wi]`
- `0 <= ui, vi <= n - 1`
- `1 <= wi <= 1000`

## Examples

```
Example 1:
  Input: n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]
  Output: 5
  Explanation:
  - Use the path 0 → 1 (cost 3).
  - At node 1 reverse the original edge 3 → 1 into 1 → 3 and traverse it at cost 2 * 1 = 2.
  - Total cost is 3 + 2 = 5.
```

```
Example 2:
  Input: n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]
  Output: 3
  Explanation:
  - No reversal is needed. Take the path 0 → 2 (cost 1), then 2 → 1 (cost 1), then 1 → 3 (cost 1).
  - Total cost is 1 + 1 + 1 = 3.
```

## Approach

**Algorithm:** 0-1 BFS (deque based shortest path for binary edge weights).

- Build an undirected representation where traversing an original edge has cost 0 and traversing the reverse direction has cost 1.
- Perform BFS using a double-ended queue: push cost-0 neighbors to the front, cost-1 neighbors to the back.
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
| Pop  | –                  | Explore 0→1 (cost 0) → push front |
| …    | (continue until target reached) |

The algorithm expands zero-cost edges first, guaranteeing the shortest reversal count.

## Complexity Analysis

- **Time:** `O(V + E)` – each edge examined at most once.
- **Space:** `O(V + E)` for the adjacency list and distance array.

## Follow-Up Questions

- How would you modify the solution to also return the actual path with reversals?
- What if each reversal had a different cost instead of a uniform `1`?
- Can the same technique be applied to weighted graphs with only two distinct weights?

## Key Takeaway

Use **0-1 BFS** for graphs with binary edge costs: push zero-cost moves to the front of a deque and one-cost moves to the back to achieve linear-time shortest paths.
