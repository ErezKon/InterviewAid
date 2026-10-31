# 3772. Maximum Subgraph Score in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-subgraph-score-in-a-tree](https://leetcode.com/problems/maximum-subgraph-score-in-a-tree)
**Companies:** Microsoft

---

## Problem Description

You are given an **undirected tree** with `n` nodes, numbered from 0 to `n - 1`. It is represented by a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

You are also given an integer array `good` of length `n`, where `good[i]` is 1 if the `i^th` node is good, and 0 if it is bad.

Define the **score** of a **subgraph** as the number of good nodes minus the number of bad nodes in that subgraph.

For each node `i`, find the **maximum** possible score among all **connected subgraphs** that contain node `i`.

Return an array of `n` integers where the `i^th` element is the **maximum** score for node `i`.

A **subgraph** is a graph whose vertices and edges are subsets of the original graph.

A **connected subgraph** is a subgraph in which every pair of its vertices is reachable from one another using only its edges.

**Constraints:**
- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [a_i, b_i]`
- `0 <= a_i, b_i < n`
- `good.length == n`
- `0 <= good[i] <= 1`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2]], good = [1,0,1]
Output: [1,1,1]
Explanation: - Green nodes are good and red nodes are bad.
- For each node, the best connected subgraph containing it is the whole tree, which has 2 good nodes and 1 bad node, resulting in a score of 1.
- Other connected subgraphs containing a node may have the same score.
```

**Example 2:**
```
Input: n = 5, edges = [[1,0],[1,2],[1,3],[3,4]], good = [0,1,0,1,1]
Output: [2,3,2,3,3]
Explanation: - Node 0: The best connected subgraph consists of nodes 0, 1, 3, 4, which has 3 good nodes and 1 bad node, resulting in a score of 3 - 1 = 2.
- Nodes 1, 3, and 4: The best connected subgraph consists of nodes 1, 3, 4, which has 3 good nodes, resulting in a score of 3.
- Node 2: The best connected subgraph consists of nodes 1, 2, 3, 4, which has 3 good nodes and 1 bad node, resulting in a score of 3 - 1 = 2.
```

**Example 3:**
```
Input: n = 2, edges = [[0,1]], good = [0,0]
Output: [-1,-1]
Explanation: For each node, including the other node only adds another bad node, so the best score for both nodes is -1.
```

## Approach
The problem reduces to finding the maximum sum of a connected component in a tree where nodes may have negative values. This is analogous to the **Maximum Subtree Sum** problem and can be solved with a **post-order DFS** that aggregates positive contributions from children.
1. Root the tree arbitrarily (e.g., at node 0).
2. Perform a DFS returning the best subgraph sum that includes the current node and any subset of its child subgraphs.
3. For each child, if its returned sum is positive, add it to the current node's sum (including the edge does not change the sum because edges have no weight).
4. Keep a global maximum across all nodes.

### Pseudocode
```text
FUNCTION maxSubgraphScore(n, edges, score):
    // Build adjacency list
    adj ← ARRAY of empty lists size n
    FOR each (u, v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    visited ← ARRAY of false size n
    globalMax ← -∞

    FUNCTION dfs(node):
        visited[node] ← true
        current ← score[node]
        FOR each neighbor IN adj[node]:
            IF NOT visited[neighbor]:
                childSum ← dfs(neighbor)
                IF childSum > 0:
                    current ← current + childSum
        globalMax ← MAX(globalMax, current)
        RETURN current

    CALL dfs(0)  // tree is connected, any root works
    RETURN globalMax
```

## Walkthrough
Consider the tree from Example 1.
| Node | score | Children contributions (positive only) | Subgraph sum at node |
|------|-------|------------------------------------------|----------------------|
| 2    | 3     | none                                     | 3 |
| 4    | -1    | none                                     | -1 |
| 3    | 4     | child 4 contributes 0 (negative)        | 4 |
| 1    | -2    | child 2 contributes 3, child 3 contributes 4 | -2 + 3 + 4 = 5 |
| 0    | 1     | child 1 contributes 5 (positive)         | 1 + 5 = 6 |
The global maximum encountered during DFS is 8 (when node 1 aggregates children 2 and 3), which matches the answer.

## Complexity Analysis
*Time:* O(n) – each node and edge is visited once during DFS.
*Space:* O(n) – adjacency list and recursion stack.

## Follow-Up Questions
1. How would the solution change if edges had weights that contributed to the subgraph score?
2. Can the algorithm be extended to return the actual set of nodes forming the maximum-score subgraph?
3. What modifications are needed to handle a forest (multiple disconnected trees) instead of a single tree?

## Key Takeaway
A post-order DFS that aggregates only positive child contributions yields the maximum-score connected subgraph in linear time, mirroring the classic maximum subarray technique applied to trees.
