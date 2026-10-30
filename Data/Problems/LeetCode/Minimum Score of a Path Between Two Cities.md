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

You are given a positive integer `n` representing `n` cities numbered from `1` to `n`. You are also given a **2D** array `roads` where `roads[i] = [a_i, b_i, distance_i]` indicates that there is a **bidirectional **road between cities `a_i` and `b_i` with a distance equal to `distance_i`. The cities graph is not necessarily connected.

The **score** of a path between two cities is defined as the **minimum **distance of a road in this path.

Return the **minimum **possible score of a path between cities 1 and `n`.

**Note**:

- A path is a sequence of roads between two cities.
- It is allowed for a path to contain the same road **multiple** times, and you can visit cities 1 and `n` multiple times along the path.
- The test cases are generated such that there is **at least** one path between 1 and `n`.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= roads.length <= 10^5`
- `roads[i].length == 3`
- `1 <= a_i, b_i <= n`
- `a_i != b_i`
- `1 <= distance_i <= 10^4`
- There are no repeated edges.
- There is at least one path between `1` and `n`.

---

## 2. Examples

**Example 1:**
```
Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
Output: 5
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 4. The score of this path is min(9,5) = 5.
It can be shown that no other path has less score.
```

**Example 2:**
```
Input: n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]
Output: 2
Explanation: The path from city 1 to 4 with the minimum score is: 1 -> 2 -> 1 -> 3 -> 4. The score of this path is min(2,2,4,7) = 2.
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
