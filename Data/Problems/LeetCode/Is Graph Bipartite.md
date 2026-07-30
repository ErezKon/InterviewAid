# 785. Is Graph Bipartite?

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/is-graph-bipartite](https://leetcode.com/problems/is-graph-bipartite)
**Companies:** Amazon, Bloomberg, Google, Lime, Linkedin, Meta, Microsoft, Samsung, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS Coloring — O(V+E) ✅](#4-approach-bfs-coloring--ove-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an undirected graph represented as an adjacency list `graph`, determine if the graph is **bipartite** — i.e., can nodes be split into two sets such that every edge connects a node from one set to a node in the other?

**Constraints:**
- `1 <= graph.length <= 100`
- `0 <= graph[i].length < 100`
- Graph may be disconnected.

---

## 2. Examples

```
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false (triangle 0-1-2 forces odd cycle)

Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true (two groups: {0,2} and {1,3})
```

---

## 3. Key Insight

A graph is bipartite **if and only if** it contains no **odd-length cycles**. This can be checked by trying to **2-color** the graph: assign alternating colors via BFS/DFS. If any edge connects two same-color nodes, the graph is not bipartite.

---

## 4. Approach: BFS Coloring — O(V+E) ✅

```
FUNCTION isBipartite(graph):
    color = [-1] * n

    FOR i ← 0 TO n - 1:
        IF color[i] != -1: CONTINUE
        queue = [i]
        color[i] = 0

        WHILE queue:
            node = queue.DEQUEUE()
            FOR neighbor IN graph[node]:
                IF color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.ENQUEUE(neighbor)
                ELSE IF color[neighbor] == color[node]:
                    RETURN false

    RETURN true
```

---

## 5. Walkthrough

```
graph = [[1,3],[0,2],[1,3],[0,2]]
```

| Step | Node | Color | Neighbors | Action |
|------|------|-------|-----------|--------|
| 1 | 0 | 0 | 1, 3 | Color 1→1, 3→1 |
| 2 | 1 | 1 | 0, 2 | 0 already 0 (OK), color 2→0 |
| 3 | 3 | 1 | 0, 2 | 0=0 (OK), 2=0 (OK) |
| 4 | 2 | 0 | 1, 3 | 1=1 (OK), 3=1 (OK) |

**Result:** No conflict → **bipartite** ✅ Groups: {0,2}=color 0, {1,3}=color 1.

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(V + E) | BFS visits each node and edge once |
| Space | O(V) | Color array + BFS queue |

---

## 7. Follow-Up Questions

### 7.1 Can DFS be used instead of BFS?

Yes. DFS with the same coloring logic works identically. The key is alternating colors on each recursive call.

### 7.2 What about disconnected graphs?

The outer loop `FOR i ← 0 TO n-1` handles disconnected components — each unvisited node starts a new BFS.

### 7.3 How does this relate to graph coloring?

Bipartiteness = 2-colorability. General k-coloring is NP-hard for k ≥ 3, but 2-coloring is linear.

---

## 8. Key Takeaway

> A graph is bipartite iff it's **2-colorable** (no odd cycles). BFS/DFS coloring with `1 - color[node]` alternation detects conflicts in O(V+E). Remember to handle disconnected components with an outer loop.
