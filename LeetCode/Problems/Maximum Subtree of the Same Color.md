# 3004. Maximum Subtree of the Same Color

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subtree-of-the-same-color](https://leetcode.com/problems/maximum-subtree-of-the-same-color)
**Companies:** Blackrock, Microsoft

---

## Problem Description
Given an undirected tree with `n` nodes numbered `0 … n-1`. Each node `i` has a color `color[i]`. A *subtree* is any connected set of nodes (also a tree). The **score** of a subtree is the number of nodes it contains **provided all nodes share the same color**; otherwise its score is 0. Return the maximum possible score among all subtrees.

## Examples
**Example 1:**
```
Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], color = [1,1,2,1,1,2,2]
Output: 3
Explanation: The subtree formed by nodes {0,1,3,4} is not valid because node 2 has a different color. The largest monochromatic subtree is {1,3,4} (all color 1) with size 3.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[1,2],[2,3]], color = [5,5,5,5]
Output: 4
Explanation: All nodes share the same color, so the whole tree is the optimal subtree.
```

## Approach
The task is to find the largest connected component consisting of nodes with the same color. This can be solved with a **single DFS** that aggregates the size of monochromatic subtrees rooted at each node.
1. Build an adjacency list for the tree.
2. Run a DFS from any root (e.g., node 0). For each node, compute the size of the largest monochromatic subtree that includes the node.
3. For each child, if the child's color matches the current node's color, add the child's subtree size to the current node's size; otherwise ignore the child.
4. Keep a global maximum of these sizes during the traversal.
The algorithm runs in linear time because each edge is visited once.

### Pseudocode
```text
FUNCTION maxMonochromeSubtree(n, edges, color):
    // Build adjacency list
    adj ← ARRAY of empty lists size n
    FOR each (u, v) IN edges:
        APPEND v TO adj[u]
        APPEND u TO adj[v]
    visited ← ARRAY of false size n
    globalMax ← 0

    FUNCTION dfs(node):
        visited[node] ← true
        size ← 1   // count the current node
        FOR each neighbor IN adj[node]:
            IF NOT visited[neighbor]:
                childSize ← dfs(neighbor)
                IF color[neighbor] == color[node]:
                    size ← size + childSize
        globalMax ← MAX(globalMax, size)
        RETURN size

    CALL dfs(0)   // tree is connected, any root works
    RETURN globalMax
```

## Walkthrough
Consider Example 1.
| Node | color | Children (post‑order) | Subtree size returned |
|------|-------|----------------------|-----------------------|
| 3    | 1     | none                 | 1 |
| 4    | 1     | none                 | 1 |
| 1    | 1     | 3,4 (both color 1)   | 1+1+1 = 3 |
| 5    | 2     | none                 | 1 |
| 6    | 2     | none                 | 1 |
| 2    | 2     | 5,6 (both color 2)   | 1+1+1 = 3 |
| 0    | 1     | 1 (color 1), 2 (color 2) → only child 1 contributes | 1+3 = 4 (but global max stays 3) |
The largest monochromatic subtree size encountered is 3.

## Complexity Analysis
*Time:* O(n) – each node and edge is processed once.
*Space:* O(n) for the adjacency list and recursion stack.

## Follow‑Up Questions
1. How would the solution change if edges had weights and the score was the sum of weights inside a monochromatic component?
2. Can we extend the algorithm to return the actual set of nodes forming the maximum subtree?
3. What modifications are needed to handle a forest (multiple disconnected trees) instead of a single tree?

## Key Takeaway
A depth‑first search that aggregates child contributions only when colors match efficiently finds the largest same‑color connected subgraph in linear time.
