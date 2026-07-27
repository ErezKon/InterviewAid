# 2127. Maximum Employees to Be Invited to a Meeting

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting](https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting)
**Companies:** Amazon, Google, Microsoft, Nutanix, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Cycle Detection + BFS — O(n)](#approach-cycle-detection--bfs--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Each employee has exactly one favorite. Seat employees around a circular table such that everyone sits next to their favorite. Maximize the number of employees invited.

---

## Key Insight

> The favorite graph is a **functional graph** (each node has exactly one outgoing edge). Each connected component has exactly one cycle.
>
> **Case 1:** A cycle of length ≥ 3 — all cycle members can sit around the table. Take the longest such cycle.  
> **Case 2:** All mutual pairs (2-cycles) — each pair can have its longest chain attached from both sides. Sum all 2-cycle contributions.
>
> Answer = max(Case 1, Case 2).

---

## Approach: Cycle Detection + BFS — O(n) ✅

```
FUNCTION maximumInvitations(favorite):
    n = len(favorite)
    // Step 1: Find all cycles via topological sort (remove non-cycle nodes)
    inDegree = compute in-degrees
    queue = all nodes with inDegree == 0
    depth = [1] * n
    WHILE queue:
        u = queue.POP()
        v = favorite[u]
        depth[v] = MAX(depth[v], depth[u] + 1)
        inDegree[v] -= 1
        IF inDegree[v] == 0: queue.PUSH(v)

    // Remaining nodes with inDegree > 0 are in cycles
    maxCycle = 0; sumTwoCycles = 0
    FOR each unvisited cycle node:
        trace the cycle, measure length
        IF length == 2:
            sumTwoCycles += depth[a] + depth[b]
        ELSE:
            maxCycle = MAX(maxCycle, length)

    RETURN MAX(maxCycle, sumTwoCycles)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Topological sort + cycle detection | **O(n)** | O(n) |

---

## Key Takeaway

> **Functional graph problems split into two cases: large cycles (take the biggest) and mutual pairs (sum all with their chains).** Topological sort peels off non-cycle nodes and measures chain depths.
