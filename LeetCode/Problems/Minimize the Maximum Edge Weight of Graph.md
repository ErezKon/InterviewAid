# 3419. Minimize the Maximum Edge Weight of Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph](https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph)
**Companies:** Google, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a weighted directed graph with `n` nodes, find a subgraph where every node can reach node 0, while minimizing the **maximum edge weight** used. Each node must have at most one outgoing edge in the subgraph.

---

## Key Insight

> **Binary search on the max edge weight.** For a candidate weight `w`, only keep edges with weight ≤ `w`. Check if all nodes can reach node 0 using BFS/DFS on the reverse graph from node 0. The answer is the minimum `w` for which all nodes are reachable.

---

## Approach: Binary Search + BFS ✅

```
FUNCTION minMaxWeight(n, edges):
    // Collect all unique weights
    weights ← SORTED SET of edge weights
    
    // Binary search on the threshold weight
    lo ← 0, hi ← LEN(weights) - 1
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        threshold ← weights[mid]
        // Build reverse graph with edges ≤ threshold
        // BFS from node 0 on reverse graph
        IF all nodes reachable THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    
    RETURN weights[lo] IF all reachable ELSE -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + BFS | **O((n + m) log m)** | **O(n + m)** |

---

## Key Takeaway

> **Binary search on edge weight threshold** — a common pattern for "minimize the max edge" problems. Validate reachability with BFS/DFS on the filtered graph.

---
