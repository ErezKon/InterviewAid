# 2497. Maximum Star Sum of a Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-star-sum-of-a-graph](https://leetcode.com/problems/maximum-star-sum-of-a-graph)
**Companies:** Akuna Capital, Amazon, Google
---

## Problem Description
Given an undirected graph with `n` nodes numbered `0..n-1`, each node `i` has a value `vals[i]`. For a node `c`, a *star* consists of `c` and up to `k` of its neighboring nodes. The star sum is `vals[c]` plus the sum of the selected neighbors' values (only neighbors with positive values are useful). Return the maximum possible star sum over all choices of center node and up to `k` neighbors.

## Examples
**Example 1:**
```
vals = [1,2,3,4]
edges = [[0,1],[0,2],[1,3]]
k = 2
Center 0 with neighbors 1 and 2 → sum = 1+2+3 = 6
Center 1 with neighbor 3 → sum = 2+4 = 6
Maximum star sum = 6
```

**Example 2:**
```
vals = [-1,-2,-3]
edges = [[0,1],[1,2]]
k = 1
All neighbor values are negative, so best star is any single node → max = -1
```

## Approach
For each node, collect the values of its positive-valued neighbors. Sort these values in descending order and take the top `k` (or fewer if not enough). The star sum for that node is its own value plus the sum of the selected neighbor values. Track the maximum over all nodes.

```text
FUNCTION MaxStarSum(vals, edges, k):
    n ← LENGTH(vals)
    neighbors ← LIST of LIST size n
    FOR each [u, v] IN edges:
        IF vals[v] > 0:
            APPEND vals[v] TO neighbors[u]
        IF vals[u] > 0:
            APPEND vals[u] TO neighbors[v]
    maxSum ← -INFINITY
    FOR node FROM 0 TO n-1:
        SORT neighbors[node] DESCENDING
        SET take ← MIN(k, LENGTH(neighbors[node]))
        SET sumNeighbors ← SUM of first take elements in neighbors[node]
        SET starSum ← vals[node] + sumNeighbors
        SET maxSum ← MAX(maxSum, starSum)
    RETURN maxSum
```

## Walkthrough
| Node | Positive neighbor values | Top k | Star sum |
|------|--------------------------|-------|----------|
| 0 | [2,3] | k=2 → 2+3 | 1+5 = 6 |
| 1 | [1,4] | 4 | 2+4 = 6 |
| 2 | [1] | 1 | 3+1 = 4 |
| 3 | [2] | 2 | 4+2 = 6 |
Maximum = 6.

## Complexity Analysis
- Time: `O(n log n + m)` where `m` is number of edges (sorting each neighbor list).
- Space: `O(n + m)` for adjacency lists.

## Follow-Up Questions
1. How would the solution change if you could select up to `k` neighbors with *any* sign, but you must include at least one positive neighbor?
2. Can you extend the problem to weighted edges where the contribution of a neighbor is multiplied by the edge weight?
3. What is the complexity if `k` can be as large as the degree of the node (i.e., no limit)?

## Key Takeaway
Collecting positive neighbor values, sorting, and taking the top k yields the optimal star sum in linearithmic time.
