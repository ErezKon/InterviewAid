# 3383. Minimum Runes to Add to Cast Spell

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-runes-to-add-to-cast-spell](https://leetcode.com/problems/minimum-runes-to-add-to-cast-spell)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#3-key-insight)
3. [Approach: Topological Sort / SCC — O(n + e)](#4-approach)
4. [Complexity Analysis](#6-complexity-analysis)
5. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a directed graph representing spell dependencies, find the **minimum** number of runes (edges) to add so that every node is reachable from at least one "source" node (node with no incoming edges from outside its SCC). This is essentially making every node reachable in the DAG of strongly connected components.

**Constraints:**
- `1 <= n <= 10⁵`
- `0 <= edges <= 2 × 10⁵`

---

## 2. Key Insight

> Compute **Strongly Connected Components** (SCCs), condense the graph to a DAG, and count the number of SCCs with **in-degree 0** in the condensed DAG. The answer is the number of such source SCCs minus 1 (since at least one source already exists).

---

## 3. Approach: SCC + DAG In-degree — O(n + e) ✅

```
FUNCTION minRunesToAdd(n, edges):
    // Step 1: Find all SCCs (Tarjan's or Kosaraju's)
    sccs = findSCCs(n, edges)

    // Step 2: Build condensed DAG
    sccId = map each node to its SCC
    dagInDegree = [0] * numSCCs
    FOR (u, v) IN edges:
        IF sccId[u] != sccId[v]:
            dagInDegree[sccId[v]] += 1

    // Step 3: Count source SCCs (in-degree 0)
    sources = COUNT(d == 0 for d in dagInDegree)

    RETURN sources - 1  // need edges to connect all sources
```

---

## 4. Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 1
Explanation: SCCs are {0},{1},{2},{3},{4}. The condensed DAG has two source components (0 and 3). Adding one rune from component 0 to 3 makes all nodes reachable.
```
**Example 2:**
```
Input: n = 3, edges = []
Output: 2
Explanation: Three isolated nodes form three source SCCs. Need 2 runes to connect them into a single reachable component.
```

---

## 5. Walkthrough

Take Example 1. After finding SCCs, each node is its own SCC. In‑degree counts: component 0 has 0, component 3 has 0, others have >0. Sources = 2, so answer = 2‑1 = 1. Adding an edge from node 0 to node 3 connects the two source components, making all nodes reachable.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + e) — SCC computation + DAG construction |
| **Space** | O(n + e) |

---

## 7. Key Takeaway

> **SCC condensation + source counting** — to make all nodes reachable, condense SCCs into a DAG and count how many source nodes exist. The minimum additions connect these isolated sources.
