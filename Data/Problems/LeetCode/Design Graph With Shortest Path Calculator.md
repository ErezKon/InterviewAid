# 2642. Design Graph With Shortest Path Calculator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-graph-with-shortest-path-calculator](https://leetcode.com/problems/design-graph-with-shortest-path-calculator)
**Companies:** Nike, Samsung

---

## Problem Description

There is a **directed weighted** graph that consists of `n` nodes numbered from `0` to `n - 1`. The edges of the graph are initially represented by the given array `edges` where `edges[i] = [from_i, to_i, edgeCost_i]` meaning that there is an edge from `from_i` to `to_i` with the cost `edgeCost_i`.

Implement the `Graph` class:

- `Graph(int n, int[][] edges)` initializes the object with `n` nodes and the given edges.
- `addEdge(int[] edge)` adds an edge to the list of edges where `edge = [from, to, edgeCost]`. It is guaranteed that there is no edge between the two nodes before adding this one.
- `int shortestPath(int node1, int node2)` returns the **minimum** cost of a path from `node1` to `node2`. If no path exists, return `-1`. The cost of a path is the sum of the costs of the edges in the path.

**Constraints:**

- `1 <= n <= 100`
- `0 <= edges.length <= n * (n - 1)`
- `edges[i].length == edge.length == 3`
- `0 <= from_i, to_i, from, to, node1, node2 <= n - 1`
- `1 <= edgeCost_i, edgeCost <= 10^6`
- There are no repeated edges and no self-loops in the graph at any point.
- At most `100` calls will be made for `addEdge`.
- At most `100` calls will be made for `shortestPath`.

---

## Examples

```
Example 1:
  Input:
  ["Graph", "shortestPath", "shortestPath", "addEdge", "shortestPath"]
  [[4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]], [3, 2], [0, 3], [[1, 3, 4]], [0, 3]]
  Output:
  [null, 6, -1, null, 6]
  Explanation:
  Graph g = new Graph(4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]);
  g.shortestPath(3, 2); // return 6. The shortest path from 3 to 2 is 3 -> 0 -> 1 -> 2 with a total cost of 3 + 2 + 1 = 6.
  g.shortestPath(0, 3); // return -1. There is no path from 0 to 3.
  g.addEdge([1, 3, 4]); // We add an edge from node 1 to node 3.
  g.shortestPath(0, 3); // return 6. The shortest path from 0 to 3 now is 0 -> 1 -> 3 with a total cost of 2 + 4 = 6.
```

<!-- previous (non-official) example notes (edges 0-1:4, 0-2:2, 1-2:5, 1-3:10, 2-4:3), kept hidden:
**Explanation:** The shortest path from node 0 to node 3 is 0 → 2 → 4 → 3 with total cost 14.
**Explanation:** No path exists from node 2 back to node 0, so return -1.
-->

---

## Approach

```text
CLASS Graph:
    CONSTRUCTOR(n):
        SET adj ← empty map of lists
        SET nodeCount ← n

    FUNCTION addEdge(from, to, cost):
        APPEND (to, cost) TO adj[from]

    FUNCTION shortestPath(start, target):
        // Dijkstra's algorithm on the current graph
        SET dist ← array of size nodeCount filled with INF
        SET dist[start] ← 0
        INITIALIZE minHeap ← [(0, start)] // (distance, node)
        WHILE minHeap IS NOT EMPTY:
            SET (d, u) ← EXTRACT-MIN(minHeap)
            IF u == target: RETURN d
            IF d > dist[u]: CONTINUE
            FOR EACH (v, w) IN adj[u]:
                IF dist[u] + w < dist[v]:
                    SET dist[v] ← dist[u] + w
                    INSERT (dist[v], v) INTO minHeap
        RETURN -1 // target unreachable
```

---

## Walkthrough

| Step | Operation | Heap (distance, node) | dist array |
|------|-----------|-----------------------|------------|
| 1 | addEdge(0,1,4) | – | adj[0] = [(1,4)] |
| 2 | addEdge(0,2,2) | – | adj[0] = [(1,4),(2,2)] |
| 3 | addEdge(1,2,5) | – | adj[1] = [(2,5)] |
| 4 | addEdge(1,3,10) | – | adj[1] = [(2,5),(3,10)] |
| 5 | addEdge(2,4,3) | – | adj[2] = [(4,3)] |
| 6 | shortestPath(0,3) | minHeap = [(0,0)] | dist = [0,INF,INF,INF,INF] |
| 7 | POP (0,0) → explore 0 | push (4,1), (2,2) | dist = [0,4,2,INF,INF] |
| 8 | POP (2,2) → explore 2 | push (5,4) | dist = [0,4,2,INF,5] |
| 9 | POP (4,1) → explore 1 | push (14,3) (5+5 ignored) | dist = [0,4,2,14,5] |
|10 | POP (5,4) → no outgoing edges |
|11 | POP (14,3) → target reached, return 14 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for `addEdge`; O((V+E) log V) for each `shortestPath` using Dijkstra |
| **Space** | O(V + E) for adjacency list and priority queue |

---

## Follow-Up Questions

1. How would you modify the design to support edge deletions efficiently?
2. Can you improve query time by preprocessing all-pairs shortest paths?
3. How would you handle negative edge weights?

---

## Key Takeaway

> **Adjacency list + Dijkstra per query. Dynamic edge addition is O(1) — just append to the adjacency list. Each shortest path query runs fresh Dijkstra.**