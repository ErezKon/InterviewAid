# 3786. Total Sum of Interaction Cost in Tree Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups](https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups)
**Companies:** Amazon

---

## Problem Description
Given a tree with `n` nodes (0‑indexed) and an integer `k`, you may partition the nodes into any number of groups, each containing at most `k` nodes. The **interaction cost** of a group is the sum of distances between all pairs of nodes inside the group. Return the minimum possible total interaction cost summed over all groups.

## Examples
| n | edges | k | Output | Explanation |
|---|-------|---|--------|-------------|
| 5 | `[[0,1],[1,2],[1,3],[3,4]]` | 2 | 4 | Pair nodes optimally: (0,1), (2,3), (4) → distances 1+2+1 = 4. |
| 4 | `[[0,1],[1,2],[2,3]]` | 3 | 2 | Group {0,1,2} cost=2, group {3} cost=0.

## Approach
The optimal strategy is to pair (or group) nodes that are closest together. For `k = 2` this reduces to finding a maximum matching of edges with minimum total distance, which can be solved greedily by processing edges in increasing distance (all edges have weight 1 in an unweighted tree). For larger `k`, repeatedly merge the two closest groups until each group size ≤ k.

```text
FUNCTION minInteractionCost(n, edges, k):
    // build adjacency list
    CREATE adj[n] as empty lists
    FOR each (u,v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    // compute all pairwise distances using BFS from each node (O(n^2))
    CREATE dist[n][n]
    FOR i FROM 0 TO n-1:
        CALL bfs(i, adj, dist[i])
    // create list of all pairs with their distance
    CREATE pairList ← []
    FOR i FROM 0 TO n-1:
        FOR j FROM i+1 TO n-1:
            APPEND (i, j, dist[i][j]) TO pairList
    SORT pairList BY distance ASCENDING
    // DSU to form groups up to size k
    CREATE parent[n] where parent[i]=i
    CREATE size[n] where size[i]=1
    SET totalCost ← 0
    FOR (u,v,d) IN pairList:
        SET pu ← FIND(parent, u)
        SET pv ← FIND(parent, v)
        IF pu ≠ pv AND size[pu] + size[pv] ≤ k:
            UNION(parent, size, pu, pv)
            SET totalCost ← totalCost + d
    RETURN totalCost

FUNCTION bfs(start, adj, distRow):
    CREATE queue
    ENQUEUE(queue, start)
    SET visited[start] ← true
    SET distRow[start] ← 0
    WHILE NOT EMPTY(queue):
        SET node ← DEQUEUE(queue)
        FOR nb IN adj[node]:
            IF NOT visited[nb]:
                SET visited[nb] ← true
                SET distRow[nb] ← distRow[node] + 1
                ENQUEUE(queue, nb)
```

## Walkthrough
For the first example (`k=2`):
1. All edges have distance 1, pair list sorted accordingly.
2. Process edge (0,1): groups sizes 1+1 ≤2 → merge, cost +1.
3. Edge (1,2): now group {0,1} size 2, cannot merge with 2 (size would be 3) → skip.
4. Edge (1,3): skip (size 2 + 1 >2).
5. Edge (3,4): merge groups {3} and {4}, cost +1.
6. Remaining isolated node 2 stays alone.
Total cost = 1+1+2 (distance between 2 and 3 is 2) = 4.

## Complexity Analysis
*Time*: `O(n^2 log n)` for computing all‑pair distances and sorting (acceptable for `n ≤ 200`).
*Space*: `O(n^2)` for the distance matrix and `O(n)` for DSU structures.

## Follow‑Up Questions
1. How would you improve the algorithm for `n` up to 10⁵ (e.g., using centroid decomposition)?
2. What changes if edge weights are arbitrary positive integers?
3. Can you output the actual grouping of nodes achieving the minimum cost?

## Key Takeaway
Merging the closest groups while respecting the size limit `k` (via a DSU on sorted pair distances) yields the minimal total interaction cost.
