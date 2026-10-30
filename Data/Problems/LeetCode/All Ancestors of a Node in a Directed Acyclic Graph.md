# 2192. All Ancestors of a Node in a Directed Acyclic Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph)
**Companies:** Amazon, Google, Meta, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Topological Sort + Set Propagation — O(n²) ✅](#4-approach-topological-sort--set-propagation--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a positive integer `n` representing the number of nodes of a **Directed Acyclic Graph** (DAG). The nodes are numbered from `0` to `n - 1` (**inclusive**).

You are also given a 2D integer array `edges`, where `edges[i] = [fromi, toi]` denotes that there is a **unidirectional** edge from `fromi` to `toi` in the graph.

Return *a list* `answer`*, where* `answer[i]` *is the **list of ancestors** of the* `ith` *node, sorted in **ascending order***.

A node `u` is an **ancestor** of another node `v` if `u` can reach `v` via a set of edges.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `0 ≤ edges.length ≤ min(2000, n * (n - 1) / 2)`
- `edges[i].length == 2`
- `0 ≤ fromi, toi ≤ n - 1`
- `fromi != toi`
- There are no duplicate edges.
- The graph is **directed** and **acyclic**.

---

## 2. Examples

```
Example 1:
  Input: n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
  Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
  Explanation:
  - Nodes 0, 1, and 2 do not have any ancestors.
  - Node 3 has two ancestors 0 and 1.
  - Node 4 has two ancestors 0 and 2.
  - Node 5 has three ancestors 0, 1, and 3.
  - Node 6 has five ancestors 0, 1, 2, 3, and 4.
  - Node 7 has four ancestors 0, 1, 2, and 3.

Example 2:
  Input: n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
  Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
  Explanation:
  - Node 0 does not have any ancestor.
  - Node 1 has one ancestor 0.
  - Node 2 has two ancestors 0 and 1.
  - Node 3 has three ancestors 0, 1, and 2.
  - Node 4 has four ancestors 0, 1, 2, and 3.
```

---

## 3. Key Insight

> Process nodes in **topological order**. When processing node `u`, propagate `u` itself and all of `u`'s ancestors to each child of `u`. Since we process parents before children, ancestor sets are complete when needed.

---

## 4. Approach: Topological Sort + Set Propagation — O(n²) ✅

```
FUNCTION getAncestors(n, edges):
    graph = adjacency list from edges
    ancestors = [SET() for _ in range(n)]
    
    FOR each node u in topological order:
        FOR child v in graph[u]:
            ancestors[v].ADD(u)
            ancestors[v] |= ancestors[u]

    RETURN [sorted(list(s)) for s in ancestors]
```

---

## 5. Walkthrough

```
n=5, edges = [[0,1],[0,2],[1,3],[2,3],[3,4]]
Topological order: [0, 1, 2, 3, 4]

u=0: children=[1,2]
  ancestors[1] |= {0} ∪ {} = {0}
  ancestors[2] |= {0} ∪ {} = {0}

u=1: children=[3]
  ancestors[3] |= {1} ∪ {0} = {0,1}

u=2: children=[3]
  ancestors[3] |= {2} ∪ {0} = {0,1,2}

u=3: children=[4]
  ancestors[4] |= {3} ∪ {0,1,2} = {0,1,2,3}

Result: [[], [0], [0], [0,1,2], [0,1,2,3]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² + n·E) — set unions can be up to O(n) each |
| **Space** | O(n²) — ancestor sets |

---

## 7. Key Takeaway

> Topological sort enables forward propagation of ancestor sets through a DAG. Process parents before children to guarantee completeness. Alternative: run DFS from each node, marking all reachable descendants.
