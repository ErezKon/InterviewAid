# 802. Find Eventual Safe States

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-eventual-safe-states](https://leetcode.com/problems/find-eventual-safe-states)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a **0-indexed** 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a **terminal node** (or another safe node).

Return *an array containing all the **safe nodes** of the graph*. The answer should be sorted in **ascending** order.

**Constraints:**

- `n == graph.length`
- `1 <= n <= 10^4`
- `0 <= graph[i].length <= n`
- `0 <= graph[i][j] <= n - 1`
- `graph[i]` is sorted in a strictly increasing order.
- The graph may contain self-loops.
- The number of edges in the graph will be in the range `[1, 4 * 10^4]`.

---

## Examples

```
Example 1:
  Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
  Output: [2,4,5,6]
  Explanation: The given graph is shown above (in the official illustration).
  Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
  Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
```

```
Example 2:
  Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
  Output: [4]
  Explanation:
  Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
```

---

## Approach: Reverse Topological Sort — O(V+E) ✅

```text
FUNCTION eventualSafeNodes(graph):
    n ← LENGTH(graph)
    reverseGraph ← ARRAY of empty lists size n
    outDegree ← ARRAY of zeros size n

    FOR u ← 0 TO n-1:
        outDegree[u] ← LENGTH(graph[u])
        FOR v IN graph[u]:
            reverseGraph[v].ADD(u)

    queue ← [i FOR i IF outDegree[i] == 0]   // terminal nodes
    safe ← SET(queue)

    WHILE queue NOT EMPTY:
        node ← queue.DEQUEUE()
        FOR prev IN reverseGraph[node]:
            outDegree[prev] ← outDegree[prev] - 1
            IF outDegree[prev] == 0:
                safe.ADD(prev)
                queue.ENQUEUE(prev)

    RETURN SORTED(safe)
```

---

## Walkthrough

Consider Example 1:
| Step | Action | outDegree | safe set |
|------|--------|-----------|----------|
| 1 | Initialize outDegree from graph | `[2,2,1,1,1,0,0]` | `{5,6}` |
| 2 | Queue starts with nodes 5,6 (outDegree 0) |
| 3 | Dequeue 5, update its predecessors (2,4) → outDegree becomes `[2,2,0,1,0,0,0]` → add 2,4 to queue and safe |
| 4 | Dequeue 6 (no predecessors) |
| 5 | Dequeue 2, update predecessor 1 → outDegree `[2,1,0,1,0,0,0]` |
| 6 | Dequeue 4, update predecessor 3 → outDegree `[2,1,0,0,0,0,0]` → add 3 to queue and safe |
| 7 | Dequeue 3, update predecessor 0 → outDegree `[1,1,0,0,0,0,0]` |
| 8 | Dequeue 0, update predecessor none (cycle remains) |
Result safe nodes: `{2,4,5,6}`.

---

## Complexity Analysis

- **Time:** Each edge is processed twice (once building reverse graph, once during BFS) → `O(V + E)`.
- **Space:** Reverse graph, outDegree array, queue, and safe set → `O(V + E)`.

---

## Follow-Up Questions

1. How would you solve the problem using depth‑first search with node coloring?
2. Can the algorithm be adapted to return the actual safe paths instead of just safe nodes?
3. What changes are needed if the graph is given as an adjacency matrix?

---

## Key Takeaway

> **Safe nodes = not in any cycle. Reverse topological sort: start from terminal nodes (out-degree 0), propagate backwards. Equivalent to cycle detection via coloring DFS.**