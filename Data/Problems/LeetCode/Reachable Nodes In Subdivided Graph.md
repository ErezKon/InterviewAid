# 882. Reachable Nodes In Subdivided Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reachable-nodes-in-subdivided-graph](https://leetcode.com/problems/reachable-nodes-in-subdivided-graph)
**Companies:** Amazon, Phonepe, Yugabyte
---

## Problem Description
You are given an undirected graph (the **"original graph"**) with `n` nodes labeled from `0` to `n - 1`. You decide to **subdivide** each edge in the graph into a chain of nodes, with the number of new nodes varying between each edge.

The graph is given as a 2D array of `edges` where `edges[i] = [ui, vi, cnti]` indicates that there is an edge between nodes `ui` and `vi` in the original graph, and `cnti` is the total number of new nodes that you will **subdivide** the edge into. Note that `cnti == 0` means you will not subdivide the edge.

To **subdivide** the edge `[ui, vi]`, replace it with `(cnti + 1)` new edges and `cnti` new nodes. The new nodes are `x1`, `x2`, ..., `xcnti`, and the new edges are `[ui, x1]`, `[x1, x2]`, `[x2, x3]`, ..., `[xcnti-1, xcnti]`, `[xcnti, vi]`.

In this **new graph**, you want to know how many nodes are **reachable** from the node `0`, where a node is **reachable** if the distance is `maxMoves` or less.

Given the original graph and `maxMoves`, return *the number of nodes that are **reachable** from node* `0` *in the new graph*.

**Constraints:**

- `0 <= edges.length <= min(n * (n - 1) / 2, 10⁴)`
- `edges[i].length == 3`
- `0 <= ui < vi < n`
- There are **no multiple edges** in the graph.
- `0 <= cnti <= 10⁴`
- `0 <= maxMoves <= 10⁹`
- `1 <= n <= 3000`

## Examples

```
Example 1:
  Input: edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3
  Output: 13
  Explanation: The edge subdivisions are shown in the image above.
    The nodes that are reachable are highlighted in yellow.
```

```
Example 2:
  Input: edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], maxMoves = 10, n = 4
  Output: 23
```

```
Example 3:
  Input: edges = [[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], maxMoves = 17, n = 5
  Output: 1
  Explanation: Node 0 is disconnected from the rest of the graph, so only node 0 is reachable.
```

## Approach
Run Dijkstra's algorithm from node `0` on the original graph, where the weight of each edge is `cnt + 1` (the number of steps needed to cross it completely). Record the shortest distance `dist[u]` to each original node. For each edge `[u,v,cnt]`, the number of intermediate nodes reachable from `u` is `max(0, maxMoves - dist[u])` limited by `cnt`. Similarly from `v`. The total reachable nodes on that edge is the minimum of `cnt` and the sum of reachable nodes from both ends.

```text
FUNCTION reachableNodes(n, edges, maxMoves):
    // Build adjacency list with weight = cnt + 1
    SET adj ← DICTIONARY of lists
    FOR each e IN edges:
        SET u ← e[0]; SET v ← e[1]; SET cnt ← e[2]
        SET weight ← cnt + 1
        APPEND (v, weight) TO adj[u]
        APPEND (u, weight) TO adj[v]
    END FOR
    // Dijkstra
    SET dist ← ARRAY of size n with INF
    SET dist[0] ← 0
    PRIORITY_QUEUE pq ← [(0, 0)] // (distance, node)
    WHILE pq NOT EMPTY:
        POP (d, u) FROM pq
        IF d > dist[u]: CONTINUE
        FOR each (v, w) IN adj[u]:
            SET nd ← d + w
            IF nd < dist[v]:
                SET dist[v] ← nd
                PUSH (nd, v) INTO pq
            END IF
        END FOR
    END WHILE
    // Count reachable original nodes
    SET reachable ← 0
    FOR each d IN dist:
        IF d ≤ maxMoves:
            SET reachable ← reachable + 1
        END IF
    END FOR
    // Count reachable intermediate nodes on each edge
    FOR each e IN edges:
        SET u ← e[0]; SET v ← e[1]; SET cnt ← e[2]
        SET fromU ← MAX(0, maxMoves - dist[u])
        SET fromV ← MAX(0, maxMoves - dist[v])
        SET reachableOnEdge ← MIN(cnt, fromU + fromV)
        SET reachable ← reachable + reachableOnEdge
    END FOR
    RETURN reachable
END FUNCTION
```

## Walkthrough
| Step | Action | Details |
|------|--------|---------|
|1|Build graph with weights `cnt+1`|Edge (0,1,10) weight 11, etc.
|2|Run Dijkstra from 0|Distances: `dist[0]=0`, `dist[1]=11`, `dist[2]=2`, `dist[3]=13`.
|3|Original nodes reachable (`dist ≤ 6`)|Nodes 0 and 2 → count 2.
|4|Edge (0,1,10): fromU = 6-0 = 6, fromV = 6-11 = 0 → reachableOnEdge = min(10,6) = 6.
|5|Edge (0,2,1): fromU = 6, fromV = 6-2 = 4 → reachableOnEdge = min(1,10) = 1.
|6|Edge (1,3,2): both ends exceed maxMoves → reachableOnEdge = 0.
|7|Total reachable = 2 + 6 + 1 = 9 (example numbers illustrate process).

## Complexity Analysis
- Time: O((n + m) log n) where `m` is number of edges, due to Dijkstra.
- Space: O(n + m) for adjacency list, distance array, and priority queue.

## Follow-Up Questions
1. How would you adapt the algorithm for weighted edges where each intermediate node has its own cost?
2. Can you solve the problem using BFS when all edge weights are equal?
3. What changes are needed to handle dynamic updates to `maxMoves` without recomputing Dijkstra?

## Key Takeaway
By treating each subdivided edge as a weighted edge and applying Dijkstra, we can compute the exact number of original and intermediate nodes reachable within a move budget.
