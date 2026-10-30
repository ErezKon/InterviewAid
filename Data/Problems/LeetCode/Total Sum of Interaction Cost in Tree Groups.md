# 3786. Total Sum of Interaction Cost in Tree Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups](https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups)
**Companies:** Amazon

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented partitioning problem. Correct idea: groups are fixed (≤ 20 labels). Root the tree; for each edge (parent, child) and each label `g`, the edge lies on `cnt_g(subtree) · (total_g − cnt_g(subtree))` same-group paths. One DFS computing per-subtree label counts gives the answer as the sum over edges and labels. O(20·n).*

You are given an integer `n` and an undirected tree with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between nodes `u_i` and `v_i`.

You are also given an integer array `group` of length `n`, where `group[i]` denotes the group label assigned to node `i`.

- Two nodes `u` and `v` are considered part of the same group if `group[u] == group[v]`.
- The **interaction cost** between `u` and `v` is defined as the number of edges on the unique path connecting them in the tree.

Return an integer denoting the **sum** of interaction costs over all **unordered** pairs `(u, v)` with `u != v` such that `group[u] == group[v]`.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i <= n - 1`
- `group.length == n`
- `1 <= group[i] <= 20`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2]], group = [1,1,1]
Output: 4
Explanation: All nodes belong to group 1. The interaction costs between the pairs of nodes are:
- Nodes (0, 1): 1
- Nodes (1, 2): 1
- Nodes (0, 2): 2
Thus, the total interaction cost is 1 + 1 + 2 = 4.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], group = [3,2,3]
Output: 2
Explanation:
- Nodes 0 and 2 belong to group 3. The interaction cost between this pair is 2.
- Node 1 belongs to a different group and forms no valid pair. Therefore, the total interaction cost is 2.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[0,2],[0,3]], group = [1,1,4,4]
Output: 3
Explanation: Nodes belonging to the same groups and their interaction costs are:
- Group 1: Nodes (0, 1): 1
- Group 4: Nodes (2, 3): 2
Thus, the total interaction cost is 1 + 2 = 3.
```

**Example 4:**
```
Input: n = 2, edges = [[0,1]], group = [9,8]
Output: 0
Explanation: All nodes belong to different groups and there are no valid pairs. Therefore, the total interaction cost is 0.
```

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
