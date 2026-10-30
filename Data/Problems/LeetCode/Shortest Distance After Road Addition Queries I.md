# 3243. Shortest Distance After Road Addition Queries I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i)

**Companies:** Amazon, Google, Microsoft
---

## Problem Description

You are given an integer `n` and a 2D integer array `queries`.

There are `n` cities numbered from `0` to `n - 1`. Initially, there is a **unidirectional** road from city `i` to city `i + 1` for all `0 <= i < n - 1`.

`queries[i] = [ui, vi]` represents the addition of a new **unidirectional** road from city `ui` to city `vi`. After each query, you need to find the **length** of the **shortest path** from city `0` to city `n - 1`.

Return an array `answer` where for each `i` in the range `[0, queries.length - 1]`, `answer[i]` is the *length of the shortest path* from city `0` to city `n - 1` after processing the **first** `i + 1` queries.

**Constraints:**

- `3 <= n <= 500`
- `1 <= queries.length <= 500`
- `queries[i].length == 2`
- `0 <= queries[i][0] < queries[i][1] < n`
- `1 < queries[i][1] - queries[i][0]`
- There are no repeated roads among the queries.

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

```
Example 1:
  Input: n = 5, queries = [[2,4],[0,2],[0,4]]
  Output: [3,2,1]
  Explanation:
  After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3 (0 -> 1 -> 2 -> 4).
  After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2 (0 -> 2 -> 4).
  After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1 (0 -> 4).
```

```
Example 2:
  Input: n = 4, queries = [[0,3],[0,2]]
  Output: [1,1]
  Explanation:
  After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.
  After the addition of the road from 0 to 2, the length of the shortest path remains 1.
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
