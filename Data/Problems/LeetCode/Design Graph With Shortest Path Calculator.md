# 2642. Design Graph With Shortest Path Calculator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-graph-with-shortest-path-calculator](https://leetcode.com/problems/design-graph-with-shortest-path-calculator)
**Companies:** Nike, Samsung

---

## Problem Description

Design a directed weighted graph supporting `addEdge(from, to, cost)` and `shortestPath(node1, node2)`.

---

## Examples

**Example 1:**
```
Input:
addEdge(0, 1, 4)
addEdge(0, 2, 2)
addEdge(1, 2, 5)
addEdge(1, 3, 10)
addEdge(2, 4, 3)
shortestPath(0, 3) => 14
```
**Explanation:** The shortest path from node 0 to node 3 is 0 → 2 → 4 → 3 with total cost 14.

**Example 2:**
```
Input:
addEdge(0, 1, 1)
addEdge(1, 2, 2)
shortestPath(2, 0) => -1
```
**Explanation:** No path exists from node 2 back to node 0, so return -1.

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
2. Can you improve query time by preprocessing all‑pairs shortest paths?
3. How would you handle negative edge weights?

---

## Key Takeaway

> **Adjacency list + Dijkstra per query. Dynamic edge addition is O(1) — just append to the adjacency list. Each shortest path query runs fresh Dijkstra.**