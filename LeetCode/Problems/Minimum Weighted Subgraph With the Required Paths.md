# 2203. Minimum Weighted Subgraph With the Required Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths](https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Three Dijkstras — O(E log V)](#3-approach-three-dijkstras--oe-log-v)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a weighted directed graph with nodes `src1`, `src2`, and `dest`, find the **minimum** weight subgraph such that there exists a path from `src1` to `dest` and from `src2` to `dest`.

**Constraints:**
- `3 <= n <= 10⁵`
- `0 <= edges.length <= 10⁵`

---

## 2. Key Insight

> The optimal solution has both paths merging at some node `m` and sharing the path from `m` to `dest`. Run Dijkstra from `src1`, `src2` (forward graph) and from `dest` (reverse graph). Answer = `min(dist1[m] + dist2[m] + distDest[m])` over all nodes `m`.

---

## 3. Approach: Three Dijkstras — O(E log V) ✅

```
FUNCTION minimumWeight(n, edges, src1, src2, dest):
    graph = build adjacency list
    reverseGraph = build reverse adjacency list

    dist1 = dijkstra(graph, src1)
    dist2 = dijkstra(graph, src2)
    distDest = dijkstra(reverseGraph, dest)

    ans = infinity
    FOR m ← 0 TO n - 1:
        IF dist1[m] < inf AND dist2[m] < inf AND distDest[m] < inf:
            ans = MIN(ans, dist1[m] + dist2[m] + distDest[m])

    RETURN ans IF ans < inf ELSE -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) — three Dijkstra runs |
| **Space** | O(V + E) |

---

## 5. Key Takeaway

> **Three Dijkstras + meeting point.** Two forward Dijkstras from sources, one reverse Dijkstra from destination. The meeting point `m` where both paths merge minimizes total weight.
