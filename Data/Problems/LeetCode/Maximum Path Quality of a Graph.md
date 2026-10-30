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

There is an **undirected** graph with `n` nodes numbered from `0` to `n - 1` (**inclusive**). You are given a **0-indexed** integer array `values` where `values[i]` is the **value** of the `i`th node. You are also given a **0-indexed** 2D integer array `edges`, where each `edges[j] = [uj, vj, timej]` indicates that there is an undirected edge between the nodes `uj` and `vj`, and it takes `timej` seconds to travel between the two nodes. Finally, you are given an integer `maxTime`.

A **valid path** in the graph is any path that starts at node `0`, ends at node `0`, and takes **at most** `maxTime` seconds to complete. You may visit the same node multiple times. The **quality** of a valid path is the **sum** of the values of the **unique nodes** visited in the path (each node's value is added **at most once** to the sum).

Return *the **maximum** quality of a valid path*.

**Note:** There are **at most four** edges connected to each node.

**Constraints:**
- `n == values.length`
- `1 <= n <= 1000`
- `0 <= values[i] <= 10^8`
- `0 <= edges.length <= 2000`
- `edges[j].length == 3`
- `0 <= uj < vj <= n - 1`
- `10 <= timej, maxTime <= 100`
- All the pairs `[uj, vj]` are **unique**.
- There are **at most four** edges connected to each node.
- The graph may not be connected.

---

## Examples

```
Example 1:
  Input: values = [0,32,10,43], edges = [[0,1,10],[1,2,15],[0,3,10]], maxTime = 49
  Output: 75
  Explanation:
    One possible path is 0 -> 1 -> 0 -> 3 -> 0. The total time taken is 10 + 10 + 10 + 10 = 40 <= 49.
    The nodes visited are 0, 1, and 3, giving a maximal path quality of 0 + 32 + 43 = 75.
```

```
Example 2:
  Input: values = [5,10,15,20], edges = [[0,1,10],[1,2,10],[0,3,10]], maxTime = 30
  Output: 25
  Explanation:
    One possible path is 0 -> 3 -> 0. The total time taken is 10 + 10 = 20 <= 30.
    The nodes visited are 0 and 3, giving a maximal path quality of 5 + 20 = 25.
```

```
Example 3:
  Input: values = [1,2,3,4], edges = [[0,1,10],[1,2,11],[2,3,12],[1,3,13]], maxTime = 50
  Output: 7
  Explanation:
    One possible path is 0 -> 1 -> 3 -> 1 -> 0. The total time taken is 10 + 13 + 13 + 10 = 46 <= 50.
    The nodes visited are 0, 1, and 3, giving a maximal path quality of 1 + 2 + 4 = 7.
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
