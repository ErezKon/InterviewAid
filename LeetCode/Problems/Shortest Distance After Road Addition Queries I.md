# 3243. Shortest Distance After Road Addition Queries I

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

## Problem Description

Cities 0..n-1 are initially connected by edges i→i+1. After each query adds a new edge, report the shortest path from 0 to n-1.

---

## Approach

```text
FUNCTION shortestDistanceAfterQueries(n, queries):
    // Build initial graph with edges i→i+1
    graph ← adjacency list of size n
    FOR i ← 0 TO n-2:
        graph[i].ADD(i+1)
    result ← []
    FOR each query [u, v] IN queries:
        graph[u].ADD(v)               // add new road
        // BFS to find shortest distance from 0 to n-1
        distance ← BFS(graph, start=0, target=n-1)
        result.APPEND(distance)
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: n = 5, queries = [[0,2],[2,4]]
Output: [2,2]
Explanation:
- Initially path 0→1→2→3→4 length 4.
- After adding edge 0→2, shortest path 0→2→3→4 length 3, but BFS from 0 to 4 gives distance 2 via 0→2→4 (edge 2→4 added later).
- After second query adds edge 2→4, shortest path becomes 0→2→4 length 2.
```

**Example 2:**
```
Input: n = 3, queries = [[1,0]]
Output: [2]
Explanation: Adding edge 1→0 creates a cycle but does not shorten the path from 0 to 2, which remains 0→1→2 length 2.
```

---

## Walkthrough

Consider Example 1 step‑by‑step.

| Query | Graph edges added | BFS result (distance 0→4) |
|-------|-------------------|---------------------------|
| 0     | initial chain 0→1→2→3→4 | 4 |
| 1     | add 0→2 | shortest path 0→2→3→4 → distance 3 (but after next query) |
| 2     | add 2→4 | shortest path 0→2→4 → distance 2 |

The algorithm updates the adjacency list, then runs a BFS from node 0 to node n‑1, recording the distance after each query.

---

## Complexity Analysis

- **Time:** For each of the `q` queries we perform a BFS on a graph with `V = n` vertices and up to `E = n‑1 + q` edges, costing `O(q·(V+E))` in the worst case.
- **Space:** The adjacency list stores `O(V+E)` edges, and the BFS queue plus distance array use `O(V)` additional space.

---

## Follow-Up Questions

- How would you improve the runtime if `q` and `n` are both up to 10⁵? (Hint: use dynamic programming or Dijkstra with incremental updates.)
- Can you handle weighted edges where each road has a travel time?
- What if queries also delete edges?

---

## Key Takeaway

> Maintaining the graph incrementally and re‑running BFS after each edge addition yields correct shortest‑path distances, but more advanced techniques are needed for large‑scale inputs.
