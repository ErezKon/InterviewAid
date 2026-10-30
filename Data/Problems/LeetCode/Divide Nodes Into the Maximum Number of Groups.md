# 2493. Divide Nodes Into the Maximum Number of Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups](https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups)
**Companies:** Accenture, Amazon, Google, Meta, Microsoft, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS + Bipartite Check](#approach-bfs--bipartite-check--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a positive integer `n` representing the number of nodes in an **undirected** graph. The nodes are labeled from `1` to `n`.

You are also given a 2D integer array `edges`, where `edges[i] = [a_i, b_i]` indicates that there is a **bidirectional** edge between nodes `a_i` and `b_i`. **Notice** that the given graph may be disconnected.

Divide the nodes of the graph into `m` groups (**1-indexed**) such that:

- Each node in the graph belongs to exactly one group.
- For every pair of nodes in the graph that are connected by an edge `[a_i, b_i]`, if `a_i` belongs to the group with index `x`, and `b_i` belongs to the group with index `y`, then `|y - x| = 1`.

Return *the maximum number of groups (i.e., maximum *`m`*) into which you can divide the nodes*. Return `-1` *if it is impossible to group the nodes with the given conditions*.

**Constraints:**
- `1 <= n <= 500`
- `1 <= edges.length <= 10^4`
- `edges[i].length == 2`
- `1 <= a_i, b_i <= n`
- `a_i != b_i`
- There is at most one edge between any pair of vertices.

---

## Examples

**Example 1:**
```
Input: n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
Output: 4
Explanation: As shown in the image we:
- Add node 5 to the first group.
- Add node 1 to the second group.
- Add nodes 2 and 4 to the third group.
- Add nodes 3 and 6 to the fourth group.
We can see that every edge is satisfied.
It can be shown that that if we create a fifth group and move any node from the third or fourth group to it, at least on of the edges will not be satisfied.
```

**Example 2:**
```
Input: n = 3, edges = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: If we add node 1 to the first group, node 2 to the second group, and node 3 to the third group to satisfy the first two edges, we can see that the third edge will not be satisfied.
It can be shown that no grouping is possible.
```

---

## Key Insight

> The "groups differ by exactly 1" constraint means valid groupings correspond to **BFS layers**. A graph admits such a grouping **if and only if it is bipartite** (no odd cycles). For each connected component, the maximum groups = the **diameter of the component** (longest shortest path between any two nodes) + 1. Try every node as BFS root and take the max depth.

---

## Approach: BFS + Bipartite Check — O(n²) ✅

```
FUNCTION magnificentSets(n, edges):
    graph ← adjacency list from edges

    // Find connected components using Union-Find or BFS
    // For each component:

    FOR each component C DO
        // Step 1: Check bipartiteness via BFS 2-coloring
        IF C is NOT bipartite THEN
            RETURN -1

        // Step 2: BFS from every node in C, track max depth
        bestDepth ← 0
        FOR each node v IN C DO
            depth ← BFS_depth(graph, v)     // max layer reached
            bestDepth ← MAX(bestDepth, depth)

        totalGroups += bestDepth

    RETURN totalGroups

FUNCTION BFS_depth(graph, start):
    queue ← [start]
    visited ← {start}
    depth ← 0
    WHILE queue NOT empty DO
        depth += 1
        nextQueue ← []
        FOR node IN queue DO
            FOR neighbor IN graph[node] DO
                IF neighbor NOT IN visited THEN
                    visited.ADD(neighbor)
                    nextQueue.ADD(neighbor)
        queue ← nextQueue
    RETURN depth
```

---

## Walkthrough

```
n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]

Graph:
  1 — 2 — 3
  |   |
  4   6
  |  /
  (4—6 via edge)
  5 — 1

Component: {1,2,3,4,5,6}
Bipartite check: 2-color → {1,3,6} vs {2,4,5} → ✅ no odd cycle

BFS from each node:
  BFS(1): layers [1] → [2,4,5] → [3,6] → depth=3
  BFS(2): layers [2] → [1,3,6] → [4,5] → depth=3
  BFS(3): layers [3] → [2] → [1,6] → [4,5] → depth=4  ← max
  BFS(5): layers [5] → [1] → [2,4] → [3,6] → depth=4

bestDepth = 4 → Answer: 4 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n × (n + E)) | BFS from each node in each component |
| **Space** | O(n + E) | Graph + BFS visited arrays |

With n ≤ 500 and E ≤ 10⁴, this is ~250K operations — very fast.

---

## Follow-Up Questions

**Q1: Why does bipartiteness matter?**
> Adjacent nodes must be in groups differing by 1 → alternating layers. An odd cycle forces a contradiction (a node would need to be in two different groups).

**Q2: Why try every node as BFS root?**
> BFS depth from a node = number of layers in the grouping rooted there. Different roots give different depths. We want the maximum across all roots in the component.

**Q3: Can you do better than O(n²)?**
> For general graphs, finding the diameter is hard to improve below O(n²) BFS. For trees, you can find the diameter in O(n) with two BFS passes (farthest-from-any-node trick), but this doesn't directly apply to general graphs with cycles.

---

## Key Takeaway

> **"Adjacent nodes differ by exactly 1" = BFS layering. Check bipartiteness first (odd cycle → impossible), then the answer for each component is its BFS diameter. Classic graph + BFS problem.**
