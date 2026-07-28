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

```text
FUNCTION countComponents(n, edges):
    parent ← [0..n-1]
    components ← n
    FOR (u, v) IN edges:
        pu ← find(u, parent)
        pv ← find(v, parent)
        IF pu != pv:
            parent[pu] ← pv
            components ← components - 1
    RETURN components
```

### Approach 2: BFS/DFS

Run BFS/DFS from each unvisited node. Count the number of traversals.

| Time | Space |
|------|-------|
| O(V + E) | O(V) |

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Explanation: The graph has two components: {0,1,2} and {3,4}.
```

**Example 2:**
```
Input: n = 4, edges = []
Output: 4
Explanation: No edges means each node is its own component.
```

---

## Walkthrough

Consider the first example with `n = 5` and edges `[[0,1],[1,2],[3,4]]`.

| Step | Action | Components | Parent Array |
|------|--------|------------|--------------|
| 1 | Initialize | 5 | [0,1,2,3,4] |
| 2 | Process edge (0,1) | 4 | parent[0] ← 1 |
| 3 | Process edge (1,2) | 3 | parent[1] ← 2 |
| 4 | Process edge (3,4) | 2 | parent[3] ← 4 |

After processing all edges, two distinct roots remain (2 and 4), giving 2 connected components.

---

## Complexity Analysis

- **Union-Find:** Time = O(n + E · α(n)) (α is inverse Ackermann, practically constant). Space = O(n) for the parent array.
- **BFS/DFS:** Time = O(V + E). Space = O(V) for visited set / recursion stack.

---

## Follow-Up Questions

1. How would you modify the algorithm to return the list of nodes in each component?
2. Can you handle dynamic addition of edges and queries for component count efficiently?
3. What if the graph were directed? How does the definition of a component change?

---

## Key Takeaway

> Counting connected components: Union-Find (start with n components, merge on each edge) or DFS/BFS (count traversal starts). Both are fundamental graph operations.
