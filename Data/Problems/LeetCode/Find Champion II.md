# 2924. Find Champion II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-champion-ii](https://leetcode.com/problems/find-champion-ii)
**Companies:** Google, Meta

---

## Problem Description

There are `n` teams numbered from `0` to `n - 1` in a tournament; each team is also a node in a **DAG**.

You are given the integer `n` and a **0-indexed** 2D integer array `edges` of length `m` representing the **DAG**, where `edges[i] = [u_i, v_i]` indicates that there is a directed edge from team `u_i` to team `v_i` in the graph.

A directed edge from `a` to `b` in the graph means that team `a` is **stronger** than team `b` and team `b` is **weaker** than team `a`.

Team `a` will be the **champion** of the tournament if there is no team `b` that is **stronger** than team `a`.

Return *the team that will be the **champion** of the tournament if there is a **unique** champion, otherwise, return* `-1`*.*

**Notes**

- A **cycle** is a series of nodes `a_1, a_2, ..., a_n, a_{n+1}` such that node `a_1` is the same node as node `a_{n+1}`, the nodes `a_1, a_2, ..., a_n` are distinct, and there is a directed edge from the node `a_i` to node `a_{i+1}` for every `i` in the range `[1, n]`.
- A **DAG** is a directed graph that does not have any **cycle**.

**Constraints:**

- `1 <= n <= 100`
- `m == edges.length`
- `0 <= m <= n * (n - 1) / 2`
- `edges[i].length == 2`
- `0 <= edge[i][j] <= n - 1`
- `edges[i][0] != edges[i][1]`
- The input is generated such that if team `a` is stronger than team `b`, team `b` is not stronger than team `a`.
- The input is generated such that if team `a` is stronger than team `b` and team `b` is stronger than team `c`, then team `a` is stronger than team `c`.

---

## Examples

```
Example 1:
  Input: n = 3, edges = [[0,1],[1,2]]
  Output: 0
  Explanation: Team 1 is weaker than team 0. Team 2 is weaker than team 1. So the champion is team 0.
```

```
Example 2:
  Input: n = 4, edges = [[0,2],[1,3],[1,2]]
  Output: -1
  Explanation: Team 2 is weaker than team 0 and team 1. Team 3 is weaker than team 1. But team 1 and team 0 are not weaker than any other teams. So the answer is -1.
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
| Node | In-Degree |
|------|-----------|
| 0    | 0 |
| 1    | 1 |
| 2    | 1 |
The algorithm builds the in-degree array, finds node 0 as the sole candidate, and returns it as the champion.

---

## Complexity Analysis

- **Time:** O(n + m) – one pass to compute in-degrees and one pass to scan candidates.
- **Space:** O(n) – the in-degree array.

---

## Follow-Up Questions

1. How would you modify the solution to return all nodes with in-degree 0?
2. Can you detect cycles in the graph while computing the champion?
3. What if the graph is given as an adjacency matrix instead of edge list?

---

## Key Takeaway

> **Champion = node with in-degree 0 in a DAG. If multiple nodes have in-degree 0, there's no unique champion.**