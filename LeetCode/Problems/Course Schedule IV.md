# 1462. Course Schedule IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/course-schedule-iv](https://leetcode.com/problems/course-schedule-iv)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description

Given a DAG of course prerequisites and queries `[u, v]`, determine if course `u` is a prerequisite of course `v` (directly or transitively).

---

## Approach: Floyd-Warshall Transitive Closure — O(n³) ✅

```
FUNCTION checkIfPrerequisite(numCourses, prerequisites, queries):
    reachable = n × n matrix of false
    FOR [u, v] IN prerequisites:
        reachable[u][v] = true

    FOR k ← 0 TO n - 1:
        FOR i ← 0 TO n - 1:
            FOR j ← 0 TO n - 1:
                reachable[i][j] |= reachable[i][k] AND reachable[k][j]

    RETURN [reachable[u][v] for [u, v] in queries]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³ + Q) |
| **Space** | O(n²) |

---

## Key Takeaway

> **Transitive closure answers all-pairs reachability queries. Floyd-Warshall on a boolean matrix: `reachable[i][j] |= reachable[i][k] & reachable[k][j]`. Alternatively, BFS from each node for O(n² + nE).**
