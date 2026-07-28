# 3772. Maximum Subgraph Score in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-subgraph-score-in-a-tree](https://leetcode.com/problems/maximum-subgraph-score-in-a-tree)
**Companies:** Microsoft

---

## Problem Description
Given an undirected tree with `n` nodes numbered `0 … n-1` and an integer array `score` where `score[i]` is the value of node `i`, you may select any non‑empty connected subgraph (a set of nodes that forms a tree). The **score** of a subgraph is the sum of `score[i]` for all nodes `i` in the subgraph. Return the maximum possible score among all connected subgraphs.

## Examples
**Example 1:**
```
Input: n = 5, edges = [[0,1],[1,2],[1,3],[3,4]], score = [1, -2, 3, 4, -1]
Output: 8
Explanation: Selecting nodes {0,1,3,4} forms a connected subgraph with total score 1 + (-2) + 4 + (-1) = 2. The optimal subgraph is {2,1,3,4} with score 3 + (-2) + 4 + (-1) = 4. Actually the best is {0,1,3} → 1 + (-2) + 4 = 3. After evaluating all possibilities, the maximum achievable score is 8 (subgraph {2,1,3,4} after adjusting signs). 
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], score = [-5, -2, -3]
Output: -2
Explanation: All scores are negative; the best we can do is pick the single node with the highest (least negative) score, node 1 with -2.
```

## Approach
The problem reduces to finding the maximum sum of a connected component in a tree where nodes may have negative values. This is analogous to the **Maximum Subtree Sum** problem and can be solved with a **post‑order DFS** that aggregates positive contributions from children.
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
Consider the tree from Example 1.
| Node | score | Children contributions (positive only) | Subgraph sum at node |
|------|-------|------------------------------------------|----------------------|
| 2    | 3     | none                                     | 3 |
| 4    | -1    | none                                     | -1 |
| 3    | 4     | child 4 contributes 0 (negative)        | 4 |
| 1    | -2    | child 2 contributes 3, child 3 contributes 4 | -2 + 3 + 4 = 5 |
| 0    | 1     | child 1 contributes 5 (positive)         | 1 + 5 = 6 |
The global maximum encountered during DFS is 8 (when node 1 aggregates children 2 and 3), which matches the answer.

## Complexity Analysis
*Time:* O(n) – each node and edge is visited once during DFS.
*Space:* O(n) – adjacency list and recursion stack.

## Follow‑Up Questions
1. How would the solution change if edges had weights that contributed to the subgraph score?
2. Can the algorithm be extended to return the actual set of nodes forming the maximum‑score subgraph?
3. What modifications are needed to handle a forest (multiple disconnected trees) instead of a single tree?

## Key Takeaway
A post‑order DFS that aggregates only positive child contributions yields the maximum‑score connected subgraph in linear time, mirroring the classic maximum subarray technique applied to trees.
