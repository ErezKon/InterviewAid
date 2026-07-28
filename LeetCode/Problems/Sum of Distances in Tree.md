# 834. Sum of Distances in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-distances-in-tree](https://leetcode.com/problems/sum-of-distances-in-tree)
**Companies:** Amazon, Google, Meta, Microsoft, Phonepe

---

## Problem Description
Given an undirected tree with `n` nodes labeled `0 … n-1` and an array `edges` where `edges[i] = [ui, vi]` represents an edge between nodes `ui` and `vi`, return an array `answer` where `answer[i]` is the sum of distances between node `i` and all other nodes. The tree is connected and contains exactly `n-1` edges.

## Examples
**Example 1**
```
Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The sum of distances from node 0 to all others is 8, from node 1 is 12, etc.
```
**Example 2**
```
Input: n = 1, edges = []
Output: [0]
Explanation: Single node has distance 0 to itself.
```

## Approach
The problem can be solved with two depth‑first searches (DFS) using a rerooting technique.
1. **First DFS** computes for each node:
   - `count[node]`: size of its subtree (including itself).
   - `result[0]`: sum of distances from an arbitrary root (e.g., node 0) to all nodes.
2. **Second DFS** reroots the tree: when moving the root from a parent to a child, distances to the child's subtree decrease by `count[child]` and distances to all other nodes increase by `n - count[child]`. This yields `result[child]` from `result[parent]` in O(1).

```text
FUNCTION sumOfDistancesInTree(n, edges):
    graph ← adjacency list of size n
    count ← array of n filled with 1          // subtree sizes
    result ← array of n filled with 0        // distance sums

    // DFS 1: compute count[] and result[0]
    FUNCTION dfs1(node, parent):
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            dfs1(child, node)
            count[node] ← count[node] + count[child]
            result[0] ← result[0] + count[child]

    // DFS 2: reroot to compute result for every node
    FUNCTION dfs2(node, parent):
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            result[child] ← result[node] - count[child] + (n - count[child])
            dfs2(child, node)

    dfs1(0, -1)
    dfs2(0, -1)
    RETURN result
```

## Walkthrough
| Step | Node (root) | count[] (subtree sizes) | result[0] (partial sum) |
|------|-------------|------------------------|--------------------------|
| 1    | start at 0 | compute recursively    | after dfs1, result[0]=8   |
| 2    | reroot to 1 | result[1] = result[0] - count[1] + (n-count[1]) = 8 - 1 + (6-1) = 12 |
| 3    | reroot to 2 | result[2] = 8 - count[2] + (6-count[2]) = 8 - 4 + 2 = 6 |
| ...  | similarly compute for 3,4,5 | yields 10 each |

## Complexity Analysis
- **Time:** O(n) – each edge is visited a constant number of times across the two DFS passes.
- **Space:** O(n) – adjacency list, `count` and `result` arrays, and recursion stack.

## Follow-Up Questions
1. How would you adapt the algorithm for a weighted tree where edges have lengths?
2. Can the rerooting technique be applied to compute other aggregate functions (e.g., maximum distance) for each node?
3. How would you handle dynamic updates (adding/removing edges) while maintaining distance sums?

## Key Takeaway
Rerooting transforms a global distance‑sum problem into two linear passes: one to gather subtree information and another to propagate results efficiently to every node.
