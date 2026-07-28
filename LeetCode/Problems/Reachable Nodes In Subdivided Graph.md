# 882. Reachable Nodes In Subdivided Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reachable-nodes-in-subdivided-graph](https://leetcode.com/problems/reachable-nodes-in-subdivided-graph)
**Companies:** Amazon, Phonepe, Yugabyte
---

## Problem Description
You are given an undirected graph with `n` nodes labeled `0` to `n-1`. Each edge `edges[i] = [u, v, cnt]` represents a connection between `u` and `v` that is subdivided into `cnt` new intermediate nodes (forming a chain of `cnt+1` edges). Starting from node `0`, you may traverse at most `maxMoves` edges. Return the total number of original and intermediate nodes that are reachable within `maxMoves`.

## Examples
- Input: `n = 4, edges = [[0,1,10],[0,2,1],[1,3,2]], maxMoves = 6` → Output: `13` (reachable original nodes: 0,1,2; plus intermediate nodes on edges).
- Input: `n = 5, edges = [[0,1,4],[1,2,6],[0,2,8]], maxMoves = 10` → Output: `23`.

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
|1|Build graph with weights `cnt+1`|Edge (0,1,10) weight 11, etc.
|2|Run Dijkstra from 0|Distances: `dist[0]=0`, `dist[1]=11`, `dist[2]=2`, `dist[3]=13`.
|3|Original nodes reachable (`dist ≤ 6`)|Nodes 0 and 2 → count 2.
|4|Edge (0,1,10): fromU = 6‑0 = 6, fromV = 6‑11 = 0 → reachableOnEdge = min(10,6) = 6.
|5|Edge (0,2,1): fromU = 6, fromV = 6‑2 = 4 → reachableOnEdge = min(1,10) = 1.
|6|Edge (1,3,2): both ends exceed maxMoves → reachableOnEdge = 0.
|7|Total reachable = 2 + 6 + 1 = 9 (example numbers illustrate process).

## Complexity Analysis
- Time: O((n + m) log n) where `m` is number of edges, due to Dijkstra.
- Space: O(n + m) for adjacency list, distance array, and priority queue.

## Follow‑Up Questions
1. How would you adapt the algorithm for weighted edges where each intermediate node has its own cost?
2. Can you solve the problem using BFS when all edge weights are equal?
3. What changes are needed to handle dynamic updates to `maxMoves` without recomputing Dijkstra?

## Key Takeaway
By treating each subdivided edge as a weighted edge and applying Dijkstra, we can compute the exact number of original and intermediate nodes reachable within a move budget.
