# 1857. Largest Color Value in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-color-value-in-a-directed-graph](https://leetcode.com/problems/largest-color-value-in-a-directed-graph)
**Companies:** Amazon, Google, Juspay, Linkedin, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Topological Sort + DP — O(V+E) ✅](#3-approach-topological-sort--dp--ove-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a directed graph where each node has a color, find the largest "color value" — the max count of any single color on any path. Return -1 if the graph has a cycle.

---

## 2. Key Insight

Use **topological sort** (Kahn's BFS). For each node, maintain `dp[node][c]` = max count of color c on any path ending at this node. Propagate along edges. If not all nodes are processed, there's a cycle.

---

## 3. Approach: Topological Sort + DP — O(V+E) ✅

```
FUNCTION largestPathValue(colors, edges):
    n = len(colors)
    graph, inDegree = build adjacency list

    // dp[node][c] = max count of color c on any path ending at node
    dp = n × 26 zeros
    queue = [nodes with inDegree == 0]
    FOR node IN queue: dp[node][ord(colors[node]) - ord('a')] = 1

    processed = 0
    WHILE queue:
        node = queue.DEQUEUE()
        processed += 1
        FOR neighbor IN graph[node]:
            FOR c ← 0 TO 25:
                dp[neighbor][c] = MAX(dp[neighbor][c],
                    dp[node][c] + (1 IF c == ord(colors[neighbor]) - ord('a') ELSE 0))
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0: queue.ENQUEUE(neighbor)

    IF processed < n: RETURN -1    // cycle
    RETURN MAX(dp[node][c] for all node, c)
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(26 · (V + E)) = O(V + E) | Process each edge with 26 colors |
| Space | O(26 · V) = O(V) | DP table |

---

## 5. Key Takeaway

> Topological sort + per-color DP on DAGs. Process nodes in topological order, propagating max color counts along edges. Cycle detection comes for free — if processed < n, there's a cycle.
