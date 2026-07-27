# 323. Number of Connected Components in an Undirected Graph

**Difficulty:** 🟡 Medium
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph)
**Companies:** Amazon, General Motors, Google, Linkedin, Meta, Tiktok, Twitter

---

## 1. Problem Description

Given `n` nodes and a list of undirected edges, return the number of connected components.

---

## 2. Approach 1: Union-Find — O(n·α(n)) ✅

```
FUNCTION countComponents(n, edges):
    parent = [0..n-1]
    components = n

    FOR (u, v) IN edges:
        pu, pv = find(u), find(v)
        IF pu != pv:
            parent[pu] = pv
            components -= 1

    RETURN components
```

### Approach 2: BFS/DFS

Run BFS/DFS from each unvisited node. Count the number of traversals.

| Time | Space |
|------|-------|
| O(V + E) | O(V) |

---

## Key Takeaway

> Counting connected components: Union-Find (start with n components, merge on each edge) or DFS/BFS (count traversal starts). Both are fundamental graph operations.
