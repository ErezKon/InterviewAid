# 2492. Minimum Score of a Path Between Two Cities

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Unbxd

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS — O(n + e)](#4-approach-bfs--on--e)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` cities and bidirectional roads with distances, the **score** of a path is the **minimum** edge weight along it. You can revisit nodes and edges. Return the minimum possible score of a path from city `1` to city `n`.

**Constraints:**
- `2 <= n <= 10⁵`
- `1 <= roads.length <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: n=4, roads=[[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
  Output: 5
  Explanation: Path 1→2→4 has score min(9,5)=5.

Example 2:
  Input: n=4, roads=[[1,2,2],[1,3,4],[3,4,7]]
  Output: 2
  Explanation: Path 1→2→1→3→4, score = min(2,2,4,7) = 2.
```

---

## 3. Key Insight

> Since you can revisit edges, the score is simply the **minimum edge weight** in the entire connected component containing nodes 1 and n. BFS/DFS to find all edges in that component and return the minimum.

---

## 4. Approach: BFS — O(n + e) ✅

```
FUNCTION minScore(n, roads):
    graph = adjacency list
    visited = set()
    minEdge = infinity
    queue = [1]
    visited.ADD(1)

    WHILE queue:
        node = queue.DEQUEUE()
        FOR (neighbor, dist) IN graph[node]:
            minEdge = MIN(minEdge, dist)
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE(neighbor)

    RETURN minEdge
```

---

## 5. Walkthrough

```
n=4, roads=[[1,2,9],[2,3,6],[2,4,5],[1,4,7]]

BFS from 1:
  Visit 1: edges (2,9),(4,7) → minEdge=7
  Visit 2: edges (1,9),(3,6),(4,5) → minEdge=5
  Visit 4: edges (2,5),(1,7) → minEdge=5
  Visit 3: edges (2,6) → minEdge=5

Answer = 5 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + e) — BFS visits each node and edge once |
| **Space** | O(n + e) — adjacency list and visited set |

---

## 7. Key Takeaway

> **Revisiting edges allowed = find min edge in component.** The path score depends on the weakest link, and since we can traverse freely, we just find the minimum edge weight in the connected component.
