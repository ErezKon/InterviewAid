# 802. Find Eventual Safe States

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-eventual-safe-states](https://leetcode.com/problems/find-eventual-safe-states)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

Find all nodes that eventually lead to a terminal node (no outgoing edges) regardless of path taken. Nodes in cycles are **not** safe.

---

## Examples

**Example 1:**
```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: Nodes 2,4,5,6 eventually reach terminal nodes. Node 0 and 1 are part of a cycle.
```

**Example 2:**
```
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation: Only node 4 is safe; all others can reach a cycle.
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