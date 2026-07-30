# 1319. Number of Operations to Make Network Connected

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-operations-to-make-network-connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected)
**Companies:** Akuna Capital, Amazon, Bloomberg, Google, Ibm, Intuit, Meta, Microsoft, Phonepe, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(E · α(V))](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` computers and a list of `connections` where each connection connects two computers, determine the minimum number of cable moves required to make all computers directly or indirectly connected. If it is impossible, return `-1`.

---

## 2. Key Insight

> At least `n‑1` edges are needed to connect `n` nodes. If the total number of edges is less than `n‑1`, the task is impossible. Otherwise, the answer equals the number of connected components minus one, because each redundant edge can be repurposed to bridge two components.

---

## 3. Approach: Union‑Find — O(E · α(V)) ✅

```text
FUNCTION makeConnected(n, connections):
    IF LENGTH(connections) < n - 1:
        RETURN -1    // not enough cables

    uf ← UnionFind(n)
    FOR [a, b] IN connections:
        uf.union(a, b)

    components ← COUNT_UNIQUE(uf.find(i) FOR i IN 0..n-1)
    RETURN components - 1
```

---

## 4. Examples

| # | Input `n` | `connections` | Output |
|---|-----------|----------------|--------|
| 1 | 4 | [[0,1],[0,2],[1,2]] | 1 |
| 2 | 6 | [[0,1],[0,2],[0,3],[1,2]] | -1 |

*Example 1*: There are three redundant cables; moving one of them connects the fourth computer.
*Example 2*: Only four cables exist for six computers, which is insufficient (needs at least 5).

---

## 5. Walkthrough

**Example 1** (`n = 4`, `connections = [[0,1],[0,2],[1,2]]`)

1. Initialize Union‑Find with 4 separate sets: `{0},{1},{2},{3}`.
2. Process `[0,1]` → merge sets `{0,1}`.
3. Process `[0,2]` → merge `{0,1}` with `{2}` → `{0,1,2}`.
4. Process `[1,2]` → already in the same set, counted as redundant.
5. After all unions, we have two components: `{0,1,2}` and `{3}`.
6. Redundant edges = 1, components = 2 → answer = `components - 1 = 1`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · α(V)) |
| **Space** | O(V) |

---

## 7. Follow-Up Questions

1. How would the solution change if the network were directed?
2. Can you solve the problem using only DFS/BFS without Union‑Find?
3. How would you extend the approach to also output the actual cable moves?

---

## 8. Key Takeaway

> **Components − 1 moves are sufficient** when enough edges exist (≥ n‑1). Redundant edges can always be repurposed to connect disjoint components.
