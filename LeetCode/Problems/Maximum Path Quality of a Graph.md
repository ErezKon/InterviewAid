# 2065. Maximum Path Quality of a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-path-quality-of-a-graph](https://leetcode.com/problems/maximum-path-quality-of-a-graph)
**Companies:** Apple, Doordash, Google, Salesforce, Sap

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an undirected graph where each node has a `value` and edges have time costs, start at node 0, travel any path, and return to node 0 within `maxTime`. Collect node values (each counted only once). Return the **maximum quality** (sum of values) achievable.

**Constraints:**
- `1 <= n <= 1000`
- Each node has at most 4 edges
- `0 <= maxTime <= 100`

---

## Examples

**Example 1:**
```
Input:  values = [0,32,10,43], edges = [[0,1,10],[1,2,15],[0,3,10]], maxTime = 49
Output: 75
Explanation: 0→1→0→3→0. Collect 0+32+43 = 75.
```

---

## Key Insight

> The small branching factor (≤ 4) and small `maxTime` make **DFS with backtracking** feasible. Explore all paths from node 0 that fit within the time budget, tracking visited nodes for value collection. Only record quality when back at node 0.

---

## Approach: DFS/Backtracking with Time Constraint ✅

```
FUNCTION maximalPathQuality(values, edges, maxTime)
    graph ← adjacency list
    maxQuality ← 0

    FUNCTION dfs(node, time, quality, visited)
        IF node = 0 THEN
            maxQuality ← MAX(maxQuality, quality)

        FOR each (neighbor, cost) IN graph[node] DO
            IF time + cost ≤ maxTime THEN
                newQ ← quality + (values[neighbor] IF neighbor NOT IN visited ELSE 0)
                wasVisited ← neighbor IN visited
                visited.ADD(neighbor)
                dfs(neighbor, time + cost, newQ, visited)
                IF NOT wasVisited THEN visited.REMOVE(neighbor)

    dfs(0, 0, values[0], {0})
    RETURN maxQuality
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(4^(maxTime/minEdge))** — bounded by branching factor and time budget |
| Space  | **O(n)** — visited set + recursion depth |

---

## Follow-Up Questions

1. **Why is brute-force DFS feasible here?**
   Branching factor ≤ 4 and maxTime ≤ 100 with minimum edge cost ≥ 10 means depth ≤ 10, so 4^10 ≈ 10^6.

2. **Why track visited?**
   Node values are collected only once, even if visited multiple times.

---

## Key Takeaway

> **Backtracking DFS with pruning** — exploit the small branching factor and time budget to enumerate all valid paths. Only count quality when returning to the start node.
