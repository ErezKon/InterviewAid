# 3123. Find Edges in Shortest Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-edges-in-shortest-paths](https://leetcode.com/problems/find-edges-in-shortest-paths)
**Companies:** Doordash, Weride

---

## Problem Description

Given a weighted undirected graph, mark each edge as `true` if it lies on **any** shortest path from node 0 to node n-1.

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1,2],[1,2,2],[0,2,4],[2,3,1],[3,4,3],[2,4,5]]
Output: [true,true,false,true,true,false]
Explanation: The shortest distance from 0 to 4 is 6. Edges (0,1), (1,2), (2,3), (3,4) lie on a shortest path.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]]
Output: [true,true,false]
Explanation: Shortest distance is 2 via edges (0,1) and (1,2). Edge (0,2) is not on any shortest path.
```

---

## Approach: Two Dijkstras — O(E log V) ✅

```text
FUNCTION findEdgesInShortestPaths(n, edges):
    distS ← dijkstra(0, n, edges)          // shortest from source
    distT ← dijkstra(n-1, n, edges)        // shortest from target
    shortest ← distS[n-1]
    result ← []
    FOR [u, v, w] IN edges:
        IF distS[u] + w + distT[v] == shortest OR distS[v] + w + distT[u] == shortest:
            result.ADD(true)
        ELSE:
            result.ADD(false)
    RETURN result
```

---

## Walkthrough

Consider the first example above.
| Step | Action | distS | distT |
|------|--------|-------|-------|
| 1 | Run Dijkstra from 0 | `[0,2,4,5,6]` | — |
| 2 | Run Dijkstra from 4 | `[…]` (distances to 4) | `[6,4,3,3,0]` |
| 3 | Shortest distance = 6 |
| 4 | Evaluate each edge using the formula; edges that satisfy are marked true. |

---

## Complexity Analysis

- **Time:** Two Dijkstra runs `O(E log V)` plus a linear scan of edges `O(E)` → `O(E log V)`.
- **Space:** Adjacency list and distance arrays `O(V + E)`.

---

## Follow-Up Questions

1. How would you modify the algorithm for directed graphs?
2. Can you return the actual shortest paths instead of just edge markings?
3. What if edge weights can be negative but no negative cycles?

---

## Key Takeaway

> **Two Dijkstras (from source and target). An edge is on a shortest path if its weight perfectly bridges the shortest distances from both ends.**