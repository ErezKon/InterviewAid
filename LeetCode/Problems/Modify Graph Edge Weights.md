# 2699. Modify Graph Edge Weights

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/modify-graph-edge-weights](https://leetcode.com/problems/modify-graph-edge-weights)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Dijkstras — O(E log V)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a graph with some edges having weight `-1` (modifiable), assign positive weights to these edges so the shortest path from `source` to `destination` equals exactly `target`. Return the modified edges, or empty array if impossible.

**Constraints:**
- `1 <= n <= 100`
- `1 <= edges.length <= n*(n-1)/2`

---

## 2. Key Insight

> **Two-pass Dijkstra.** First, set all `-1` edges to 1 and run Dijkstra. If shortest path > target, impossible. If ≤ target, increase modifiable edges one-by-one: run Dijkstra after each increase to raise the shortest path to exactly `target`.

---

## 3. Approach: Two Dijkstras — O(E² log V) ✅

```
FUNCTION modifiedGraphEdges(n, edges, source, dest, target):
    // Pass 1: set all -1 edges to 1
    // Run Dijkstra: if dist > target → impossible (return [])
    
    // Pass 2: for each -1 edge, try increasing its weight
    // Run Dijkstra after each to see if dist reaches target
    // When dist == target, set remaining -1 edges to infinity
    
    // If final dist < target → impossible
    RETURN modified edges
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · (V + E) log V) — Dijkstra per modifiable edge |
| **Space** | O(V + E) |

---

## 5. Key Takeaway

> **Incremental Dijkstra with edge modification.** Start with minimum weights, then selectively increase modifiable edges. The shortest path is monotonically non-decreasing as we increase edge weights.
