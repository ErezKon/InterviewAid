# 847. Shortest Path Visiting All Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-visiting-all-nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You have an undirected, connected graph of `n` nodes labeled from `0` to `n - 1`. You are given an array `graph` where `graph[i]` is a list of all the nodes connected with node `i` by an edge.

Return *the length of the shortest path that visits every node*. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.

**Constraints:**
- `n == graph.length`
- `1 <= n <= 12`
- `0 <= graph[i].length < n`
- `graph[i]` does not contain `i`.
- If `graph[a]` contains `b`, then `graph[b]` contains `a`.
- The input graph is always connected.

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

**Example 1:**
```
Input: graph = [[1,2,3],[0],[0],[0]]
Output: 4
Explanation: One possible path is [1,0,2,0,3]
```

**Example 2:**
```
Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
Output: 4
Explanation: One possible path is [0,1,4,2,3]
```

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
