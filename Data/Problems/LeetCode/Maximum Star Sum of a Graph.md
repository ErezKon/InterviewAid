# 2497. Maximum Star Sum of a Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-star-sum-of-a-graph](https://leetcode.com/problems/maximum-star-sum-of-a-graph)
**Companies:** Akuna Capital, Amazon, Google
---

## Problem Description

There is an undirected graph consisting of `n` nodes numbered from `0` to `n - 1`. You are given a **0-indexed** integer array `vals` of length `n` where `vals[i]` denotes the value of the `i^th` node.

You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an **undirected** edge connecting nodes `a_i` and `b_i.`

A **star graph** is a subgraph of the given graph having a center node containing `0` or more neighbors. In other words, it is a subset of edges of the given graph such that there exists a common node for all edges.

The image below shows star graphs with `3` and `4` neighbors respectively, centered at the blue node.
![img](https://assets.leetcode.com/uploads/2022/11/07/max-star-sum-descdrawio.png)
The **star sum** is the sum of the values of all the nodes present in the star graph.

Given an integer `k`, return *the **maximum star sum** of a star graph containing **at most** *`k`* edges.*

**Constraints:**
- `n == vals.length`
- `1 <= n <= 10^5`
- `-10^4 <= vals[i] <= 10^4`
- `0 <= edges.length <= min(n * (n - 1) / 2``, 10^5)`
- `edges[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`
- `0 <= k <= n - 1`

## Examples

**Example 1:**
```
Input: vals = [1,2,3,4,10,-10,-20], edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], k = 2
Output: 16
Explanation: The above diagram represents the input graph.
The star graph with the maximum star sum is denoted by blue. It is centered at 3 and includes its neighbors 1 and 4.
It can be shown it is not possible to get a star graph with a sum greater than 16.
```

**Example 2:**
```
Input: vals = [-5], edges = [], k = 0
Output: -5
Explanation: There is only one possible star graph, which is node 0 itself.
Hence, we return -5.
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
| Node | Positive neighbor values | Top k | Star sum |
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
Collecting positive neighbor values, sorting, and taking the top k yields the optimal star sum in linearithmic time.
