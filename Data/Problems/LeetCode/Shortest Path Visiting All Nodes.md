# 847. Shortest Path Visiting All Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-visiting-all-nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

Given an undirected graph, find the shortest path that visits **every node** (can revisit nodes and edges).

---

## Approach: BFS + Bitmask — O(2ⁿ·n²) ✅

```text
FUNCTION shortestPathLength(graph):
    n = len(graph)
    allVisited = (1 << n) - 1
    queue = [(i, 1 << i, 0) for i in range(n)]
    visited = {(i, 1 << i) for i in range(n)}

    WHILE queue:
        (node, mask, dist) = queue.DEQUEUE()
        IF mask == allVisited: RETURN dist

        FOR neighbor IN graph[node]:
            newMask = mask | (1 << neighbor)
            IF (neighbor, newMask) NOT IN visited:
                visited.ADD((neighbor, newMask))
                queue.ENQUEUE((neighbor, newMask, dist + 1))

    RETURN -1
```

State = (current node, bitmask of visited nodes). BFS guarantees shortest path.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `graph = [[1,2,3],[0],[0],[0]]` | `4` | Starting from any node, the shortest path that visits all 4 nodes requires 4 steps. |
| `graph = [[1],[0,2,4],[1,3],[2,4],[1,3]]` | `4` | One optimal path: 0→1→2→3→4.

---

## Walkthrough

Consider `graph = [[1,2,3],[0],[0],[0]]` (4 nodes, node 0 connected to all others).
1. Initialize queue with states `(0,001,0)`, `(1,010,0)`, `(2,100,0)`, `(3,1000,0)`.
2. BFS expands states level by level, merging visited masks.
3. When a state reaches mask `1111` (all nodes visited), its distance is returned. The first such state occurs after 4 moves.

---

## Complexity Analysis

- **Time:** O(2ⁿ·n²) – each state (node, mask) is processed once; transitions iterate over neighbors.
- **Space:** O(2ⁿ·n) – storing visited states.

---

## Follow-Up Questions

1. How would you modify the algorithm to return the actual path, not just its length?
2. Can you solve the problem using dynamic programming with memoization instead of BFS?
3. What changes if the graph is directed?

---

## Key Takeaway

Representing visited nodes as a bitmask and performing BFS over (node, mask) states yields the shortest path that covers all nodes in exponential‑time but optimal for the problem constraints.
