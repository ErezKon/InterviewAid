# 2203. Minimum Weighted Subgraph With the Required Paths

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Three Dijkstras — O(E log V)](#3-approach-three-dijkstras)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer `n` denoting the number of nodes of a **weighted directed** graph. The nodes are numbered from `0` to `n - 1`.

You are also given a 2D integer array `edges` where `edges[i] = [from_i, to_i, weight_i]` denotes that there exists a **directed** edge from `from_i` to `to_i` with weight `weight_i`.

Lastly, you are given three **distinct** integers `src1`, `src2`, and `dest` denoting three distinct nodes of the graph.

Return *the **minimum weight** of a subgraph of the graph such that it is **possible** to reach* `dest` *from both* `src1` *and* `src2` *via a set of edges of this subgraph*. In case such a subgraph does not exist, return `-1`.

A **subgraph** is a graph whose vertices and edges are subsets of the original graph. The **weight** of a subgraph is the sum of weights of its constituent edges.

**Constraints:**
- `3 <= n <= 10^5`
- `0 <= edges.length <= 10^5`
- `edges[i].length == 3`
- `0 <= from_i, to_i, src1, src2, dest <= n - 1`
- `from_i != to_i`
- `src1`, `src2`, and `dest` are pairwise distinct.
- `1 <= weight[i] <= 10^5`

---

## 2. Key Insight

> The optimal subgraph merges the two source-to-destination paths at some meeting node `m`. From `src1` to `m`, from `src2` to `m`, and from `m` to `dest` are independent shortest-path problems. Running Dijkstra from each source (forward graph) and from `dest` (reverse graph) gives the needed distances.

---

## 3. Approach: Three Dijkstras — O(E log V) ✅

```text
FUNCTION minimumWeight(n, edges, src1, src2, dest):
    graph ← buildAdjacencyList(n, edges)
    reverseGraph ← buildAdjacencyList(n, reverseEdges(edges))

    dist1 ← dijkstra(graph, src1)
    dist2 ← dijkstra(graph, src2)
    distDest ← dijkstra(reverseGraph, dest)

    best ← INFINITY
    FOR m ← 0 TO n-1:
        IF dist1[m] < INFINITY AND dist2[m] < INFINITY AND distDest[m] < INFINITY:
            best ← MIN(best, dist1[m] + dist2[m] + distDest[m])
    RETURN best IF best < INFINITY ELSE -1

FUNCTION dijkstra(g, start):
    dist ← array of size n filled with INFINITY
    dist[start] ← 0
    pq ← min-heap containing (0, start)
    WHILE pq NOT EMPTY:
        (d, u) ← EXTRACT_MIN(pq)
        IF d > dist[u]: CONTINUE
        FOR (v, w) IN g[u]:
            IF dist[u] + w < dist[v]:
                dist[v] ← dist[u] + w
                INSERT_OR_UPDATE(pq, (dist[v], v))
    RETURN dist
```

---

## 4. Examples

**Example 1:**
```
Input: n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1 = 0, src2 = 1, dest = 5
Output: 9
Explanation: The above figure represents the input graph.
The blue edges represent one of the subgraphs that yield the optimal answer.
Note that the subgraph [[1,0,3],[0,5,6]] also yields the optimal answer. It is not possible to get a subgraph with less weight satisfying all the constraints.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,1],[2,1,1]], src1 = 0, src2 = 1, dest = 2
Output: -1
Explanation: The above figure represents the input graph.
It can be seen that there does not exist any path from node 1 to node 2, hence there are no subgraphs satisfying all the constraints.
```

---

## 5. Walkthrough

We illustrate **Example 1**.

| Node `m` | dist1[m] | dist2[m] | distDest[m] | Sum |
|----------|----------|----------|-------------|-----|
| 0        | 0        | ∞        | 2           | ∞ |
| 1        | ∞        | 0        | 2           | ∞ |
| 2        | 1        | 1        | 1           | 3 |
| 3        | 1        | 1        | 1           | 3 |
| 4        | 2        | 2        | 0           | 4 |

The minimum sum is 3 at meeting nodes 2 and 3, giving the answer 3.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) — three Dijkstra runs |
| **Space** | O(V + E) for adjacency lists and distance arrays |

---

## 7. Follow-Up Questions

1. How would the solution change if edge weights could be negative but no negative cycles existed?
2. Can the algorithm be adapted to return the actual subgraph (list of edges) achieving the minimum weight?
3. What if we needed *k* source nodes instead of two – how would the meeting-point idea extend?

---

## 8. Key Takeaway

> **Three Dijkstras + meeting point.** Compute shortest distances from each source and from the destination (on the reversed graph). The optimal subgraph merges at a node `m` that minimizes `dist1[m] + dist2[m] + distDest[m]`.
