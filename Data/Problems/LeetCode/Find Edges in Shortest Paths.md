# 3123. Find Edges in Shortest Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-edges-in-shortest-paths](https://leetcode.com/problems/find-edges-in-shortest-paths)
**Companies:** Doordash, Weride

---

## Problem Description

You are given an undirected weighted graph of `n` nodes numbered from 0 to `n - 1`. The graph consists of `m` edges represented by a 2D array `edges`, where `edges[i] = [a_i, b_i, w_i]` indicates that there is an edge between nodes `a_i` and `b_i` with weight `w_i`.

Consider all the shortest paths from node 0 to node `n - 1` in the graph. You need to find a **boolean** array `answer` where `answer[i]` is `true` if the edge `edges[i]` is part of **at least** one shortest path. Otherwise, `answer[i]` is `false`.

Return the array `answer`.

**Note** that the graph may not be connected.

**Constraints:**

- `2 <= n <= 5 * 10^4`
- `m == edges.length`
- `1 <= m <= min(5 * 10^4, n * (n - 1) / 2)`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `1 <= w_i <= 10^5`
- There are no repeated edges.

---

## Examples

```
Example 1:
  Input: n = 6, edges = [[0,1,4],[0,2,1],[1,3,2],[1,4,3],[1,5,1],[2,3,1],[3,5,3],[4,5,2]]
  Output: [true,true,true,false,true,true,true,false]
  Explanation: The following are all the shortest paths between nodes 0 and 5:
  - The path 0 -> 1 -> 5: The sum of weights is 4 + 1 = 5.
  - The path 0 -> 2 -> 3 -> 5: The sum of weights is 1 + 1 + 3 = 5.
  - The path 0 -> 2 -> 3 -> 1 -> 5: The sum of weights is 1 + 1 + 2 + 1 = 5.
```

```
Example 2:
  Input: n = 4, edges = [[2,0,1],[0,1,1],[0,3,4],[3,2,2]]
  Output: [true,false,false,true]
  Explanation: There is one shortest path between nodes 0 and 3, which is the path 0 -> 2 -> 3 with the sum of weights 1 + 2 = 3.
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