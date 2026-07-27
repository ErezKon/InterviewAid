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

Given a DAG with `n` nodes (0 to n-1) and a list of directed edges, return a list where `answer[i]` is the **sorted list of all ancestors** of node `i`.

A node `u` is an ancestor of `v` if there exists a path from `u` to `v`.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `0 ≤ edges.length ≤ min(2000, n(n-1)/2)`

---

## 2. Examples

```
Example:
  Input:  n = 5, edges = [[0,1],[0,2],[1,3],[2,3],[3,4]]
  Output: [[], [0], [0], [0,1,2], [0,1,2,3]]

  Visual:
    0 → 1 → 3 → 4
    0 → 2 → 3
  Ancestors of 3: {0, 1, 2}
  Ancestors of 4: {0, 1, 2, 3}
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
