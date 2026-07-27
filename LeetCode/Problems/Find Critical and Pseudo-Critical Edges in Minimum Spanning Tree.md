# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree)
**Companies:** Amazon, Google, Uber

---

## Problem Description

Given a weighted undirected graph, find all **critical** edges (must be in every MST) and **pseudo-critical** edges (appear in at least one MST but not all).

---

## Key Insight

> For each edge: (1) **exclude** it and compute MST — if weight increases or graph disconnects, it's critical. (2) **force-include** it and compute MST — if weight equals original MST weight and it's not critical, it's pseudo-critical.

---

## Approach: Kruskal's with Edge Testing — O(E² · α(V)) ✅

```
FUNCTION findCriticalAndPseudo(n, edges):
    mstWeight = kruskal(n, edges)  // baseline MST

    critical = []; pseudo = []
    FOR i, edge IN enumerate(edges):
        // Test critical: exclude edge i
        w = kruskal(n, edges without i)
        IF w > mstWeight OR graph disconnected:
            critical.ADD(i)
            CONTINUE

        // Test pseudo-critical: force-include edge i first
        w = kruskal(n, edges, forceInclude=i)
        IF w == mstWeight:
            pseudo.ADD(i)

    RETURN [critical, pseudo]
```

---

## Key Takeaway

> **Two tests per edge: exclude (critical check) and force-include (pseudo-critical check). Each test runs Kruskal's. O(E²·α(V)) total.**
