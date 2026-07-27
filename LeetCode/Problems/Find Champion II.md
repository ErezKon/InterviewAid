# 2924. Find Champion II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-champion-ii](https://leetcode.com/problems/find-champion-ii)
**Companies:** Google, Meta

---

## Problem Description

Given a DAG of `n` teams with edges `[u, v]` meaning team `u` is stronger than `v`, find the champion (node with in-degree 0). Return `-1` if there's not exactly one such node.

---

## Approach: In-Degree Check — O(n + m) ✅

```
FUNCTION findChampion(n, edges):
    inDegree = [0] * n
    FOR [u, v] IN edges:
        inDegree[v] += 1
    candidates = [i for i in range(n) if inDegree[i] == 0]
    RETURN candidates[0] IF len(candidates) == 1 ELSE -1
```

---

## Key Takeaway

> **Champion = node with in-degree 0 in a DAG. If multiple nodes have in-degree 0, there's no unique champion.**
