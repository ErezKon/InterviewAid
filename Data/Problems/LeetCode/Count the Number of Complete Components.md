# 2685. Count the Number of Complete Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-complete-components](https://leetcode.com/problems/count-the-number-of-complete-components)

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer `n`. There is an **undirected** graph with `n` vertices, numbered from `0` to `n - 1`. You are given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an **undirected** edge connecting vertices `a_i` and `b_i`.

Return *the number of **complete connected components** of the graph*.

A **connected component** is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

A connected component is said to be **complete** if there exists an edge between every pair of its vertices.

**Constraints:**
- `1 <= n <= 50`
- `0 <= edges.length <= n * (n - 1) / 2`
- `edges[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`
- There are no repeated edges.

---

## Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2023/04/11/screenshot-from-2023-04-11-23-31-23.png)
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2023/04/11/screenshot-from-2023-04-11-23-32-00.png)
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.
```

---

## Key Insight

A connected component with `k` nodes is **complete** iff it has exactly `k × (k-1) / 2` edges (a complete graph). Use Union-Find to group nodes into components, then count nodes and edges per component.

---

## Approach

```
FUNCTION countCompleteComponents(n, edges):
    uf = UnionFind(n)
    FOR [u, v] IN edges: uf.union(u, v)
    groups = defaultdict(lambda: [0, 0])    // [nodes, edges]
    FOR i FROM 0 TO n-1:
        root ← uf.find(i)
        groups[root][0] ← groups[root][0] + 1
    FOR [u, v] IN edges:
        root ← uf.find(u)
        groups[root][1] ← groups[root][1] + 1
    RETURN SUM(1 for nodes, edg IN groups.values() IF edg == nodes*(nodes-1)//2)
```

---

## Walkthrough

**Input:** `n = 5, edges = [[0,1],[0,2],[1,2],[3,4]]`

1. Union-Find merges {0,1,2} and {3,4}.
2. Component A: nodes=3, edges=3 → `3*2/2 = 3` → complete.
3. Component B: nodes=2, edges=1 → `2*1/2 = 1` → complete.
4. Result = 2 complete components.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + E × α(n)) where E = edges, α = inverse Ackermann |
| **Space** | O(n) |

---

## Follow-Up Questions

**Q1: Can this be done with BFS/DFS instead of Union-Find?**
Yes — BFS/DFS finds connected components. For each component, count nodes and edges, then check completeness. Same time complexity.

**Q2: What if the graph is directed?**
Then "complete" would mean a tournament (edge between every pair). Check edge count = k(k-1) for directed complete graph.

---

## Key Takeaway

> **A connected component is complete iff edges = k(k-1)/2. Use Union-Find or BFS to find components, count nodes and edges in each, then check the formula.**