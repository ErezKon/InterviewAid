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

> *Note: the Approach below counts all source SCCs and ignores the crystals. Accepted solutions BFS from every crystal first. Then they process the unreached nodes in Kosaraju finish order, and each new BFS start costs one rune. Equivalently, count the source SCCs of the condensation that cannot be reached from a crystal.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Alice has just graduated from wizard school, and wishes to cast a magic spell to celebrate. The magic spell contains certain **focus points** where magic needs to be concentrated, and some of these focus points contain **magic crystals** which serve as the spell's energy source. Focus points can be linked through **directed runes**, which channel magic flow from one focus point to another.

You are given a integer `n` denoting the *number* of focus points and an array of integers `crystals` where `crystals[i]` indicates a focus point which holds a magic crystal. You are also given two integer arrays `flowFrom` and `flowTo`, which represent the existing **directed runes**. The `i^th` rune allows magic to freely flow from focus point `flowFrom[i]` to focus point `flowTo[i]`.

You need to find the number of directed runes Alice must add to her spell, such that *each* focus point either:

- **Contains** a magic crystal.
- **Receives** magic flow *from* another focus point.

Return the **minimum** number of directed runes that she should add.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= crystals.length <= n`
- `0 <= crystals[i] <= n - 1`
- `1 <= flowFrom.length == flowTo.length <= min(2 * 10^5, (n * (n - 1)) / 2)`
- `0 <= flowFrom[i], flowTo[i] <= n - 1`
- `flowFrom[i] != flowTo[i]`
- All pre-existing directed runes are **distinct**.

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
Input: n = 6, crystals = [0], flowFrom = [0,1,2,3], flowTo = [1,2,3,0]
Output: 2
Explanation: Add two directed runes:
- From focus point 0 to focus point 4.
- From focus point 0 to focus point 5.
```

**Example 2:**
```
Input: n = 7, crystals = [3,5], flowFrom = [0,1,2,3,5], flowTo = [1,2,0,4,6]
Output: 1
Explanation: Add a directed rune from focus point 4 to focus point 2.
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
