# 2924. Find Champion II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-champion-ii](https://leetcode.com/problems/find-champion-ii)
**Companies:** Google, Meta

---

## Problem Description

Given a DAG of `n` teams with edges `[u, v]` meaning team `u` is stronger than `v`, find the champion (node with in-degree 0). Return `-1` if there's not exactly one such node.

---

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[0,2]]
Output: 0
Explanation: Node 0 has in-degree 0, nodes 1 and 2 have in-degree 1.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[2,1]]
Output: -1
Explanation: Nodes 0 and 2 both have in-degree 0, so there is no unique champion.
```

---

## Approach: In-Degree Check — O(n + m) ✅

```text
FUNCTION findChampion(n, edges):
    SET inDegree ← ARRAY of size n filled with 0
    FOR each edge [u, v] IN edges:
        SET inDegree[v] ← inDegree[v] + 1
    SET candidates ← []
    FOR i ← 0 TO n - 1:
        IF inDegree[i] == 0:
            APPEND i TO candidates
    IF LENGTH(candidates) == 1:
        RETURN candidates[0]
    ELSE:
        RETURN -1
```

---

## Walkthrough

Consider the first example `n = 3, edges = [[0,1],[0,2]]`.
| Node | In‑Degree |
|------|-----------|
| 0    | 0 |
| 1    | 1 |
| 2    | 1 |
The algorithm builds the in‑degree array, finds node 0 as the sole candidate, and returns it as the champion.

---

## Complexity Analysis

- **Time:** O(n + m) – one pass to compute in‑degrees and one pass to scan candidates.
- **Space:** O(n) – the in‑degree array.

---

## Follow-Up Questions

1. How would you modify the solution to return all nodes with in‑degree 0?
2. Can you detect cycles in the graph while computing the champion?
3. What if the graph is given as an adjacency matrix instead of edge list?

---

## Key Takeaway

> **Champion = node with in-degree 0 in a DAG. If multiple nodes have in-degree 0, there's no unique champion.**