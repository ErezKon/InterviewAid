# 1971. Find if Path Exists in Graph

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-if-path-exists-in-graph](https://leetcode.com/problems/find-if-path-exists-in-graph)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an undirected graph with `n` nodes labeled from `0` to `n-1` and a list of edges, determine whether there is a path connecting the `source` node to the `destination` node. The graph may be disconnected and can contain multiple components.

## Examples
**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: All nodes are connected, so a path exists from 0 to 2.
```
**Example 2:**
```
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: Nodes 0‑2 form one component and nodes 3‑5 form another; no path between them.
```

## Approach
Use a **Union‑Find (Disjoint Set Union)** data structure to merge nodes that share an edge. After processing all edges, two nodes are connected iff they belong to the same set.

```text
FUNCTION validPath(n, edges, source, destination):
    uf ← UnionFind(n)
    FOR each [u, v] IN edges:
        uf.union(u, v)
    RETURN uf.find(source) == uf.find(destination)
```
The `UnionFind` supports `find` with path compression and `union` by rank for near‑constant amortized time.

## Walkthrough
| Step | Action | Union‑Find Sets |
|------|--------|-----------------|
| 1 | Initialize 6 singletons | {0},{1},{2},{3},{4},{5} |
| 2 | Union(0,1) | {0,1},{2},{3},{4},{5} |
| 3 | Union(0,2) | {0,1,2},{3},{4},{5} |
| 4 | Union(3,5) | {0,1,2},{3,5},{4} |
| 5 | Union(5,4) | {0,1,2},{3,4,5} |
| 6 | Union(4,3) (no change) | {0,1,2},{3,4,5} |
| 7 | Check find(0) vs find(5) → different sets → false |

## Complexity Analysis
- **Time:** `O(n + m α(n))` where `m` is the number of edges and `α` is the inverse Ackermann function (practically constant).
- **Space:** `O(n)` for the parent and rank arrays.

## Follow‑Up Questions
1. How would you modify the solution to count the number of connected components?
2. If the graph were directed, which algorithm would you use to check reachability?
3. Can you answer multiple connectivity queries efficiently after a single preprocessing step?

## Key Takeaway
Union‑Find quickly merges connected nodes and determines connectivity in near‑constant time, making it ideal for static graph reachability queries.
