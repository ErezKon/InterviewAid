# 2360. Longest Cycle in a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-cycle-in-a-graph](https://leetcode.com/problems/longest-cycle-in-a-graph)
**Companies:** Amazon, Google, Juspay, Phonepe

---

## 1. Problem Description

Given a directed graph where each node has at most one outgoing edge, find the length of the longest cycle. Return -1 if no cycle.

---

## 2. Approach: DFS with Path Tracking — O(n) ✅

```
FUNCTION longestCycle(edges):
    n = len(edges)
    visited = [0] * n    // 0=unvisited, 1=in progress, 2=done
    maxCycle = -1

    FOR i ← 0 TO n - 1:
        IF visited[i]: CONTINUE
        path = {}; curr = i; step = 0
        WHILE curr != -1 AND visited[curr] == 0:
            IF curr IN path:
                maxCycle = MAX(maxCycle, step - path[curr])
                BREAK
            path[curr] = step
            visited[curr] = 1
            step += 1; curr = edges[curr]
        FOR node IN path: visited[node] = 2

    RETURN maxCycle
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> In a functional graph (each node → at most one successor), follow edges recording step numbers. When revisiting a node in the current path, cycle length = current step - recorded step. Each node visited once.
