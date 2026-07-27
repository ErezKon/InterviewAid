# 1976. Number of Ways to Arrive at Destination

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-arrive-at-destination](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Dijkstra + Count Paths — O(E log V)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the number of shortest paths from node 0 to node n-1 in a weighted graph. Return mod 10⁹+7.

---

## 2. Key Insight

> Modified Dijkstra: track both distance and path count. When finding a shorter path, reset count. When finding an equal path, add to count.

---

## 3. Approach: Dijkstra + Count Paths — O(E log V) ✅

```
FUNCTION countPaths(n, roads):
    MOD = 10^9 + 7
    graph = adjacency list
    dist = [infinity] * n; dist[0] = 0
    ways = [0] * n; ways[0] = 1
    heap = [(0, 0)]

    WHILE heap:
        (d, u) = heap.POP()
        IF d > dist[u]: CONTINUE
        FOR (v, w) IN graph[u]:
            IF dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                ways[v] = ways[u]
                heap.PUSH((dist[v], v))
            ELSE IF dist[u] + w == dist[v]:
                ways[v] = (ways[v] + ways[u]) % MOD

    RETURN ways[n-1]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) |
| **Space** | O(V + E) |

---

## 5. Key Takeaway

> **Dijkstra + path counting.** Same "dual tracking" pattern: reset count on new shortest, accumulate on tie. Classic extension of standard Dijkstra.
