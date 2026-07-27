# 2045. Second Minimum Time to Reach Destination

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/second-minimum-time-to-reach-destination](https://leetcode.com/problems/second-minimum-time-to-reach-destination)
**Companies:** Google, Microsoft

---

## Problem Description

Given an undirected graph with `n` nodes, edge travel takes `time` units, and traffic lights at each node switch between green/red every `change` seconds. Find the **second minimum** time to travel from node 1 to node n.

---

## Key Insight

> Modified BFS tracking up to **two** shortest times per node (`dist1[v]`, `dist2[v]`). At traffic lights, if you arrive during red, you wait until the next green phase: `wait = change - (arrival % (2*change) >= change ? 0 : arrival % change)`.

---

## Approach

```
FUNCTION secondMinimum(n, edges, time, change):
    graph ← adjacency list from edges
    dist1 ← [INF] * (n+1)
    dist2 ← [INF] * (n+1)
    dist1[1] ← 0
    queue ← [(0, 1)]  // (time, node)

    WHILE queue:
        t, u ← queue.DEQUEUE()
        FOR v IN graph[u]:
            // Wait for green light
            IF (t / change) % 2 == 1:  // red light
                t_wait ← change - (t % change)
            ELSE:
                t_wait ← 0
            newTime ← t + t_wait + time

            IF newTime < dist1[v]:
                dist2[v] ← dist1[v]
                dist1[v] ← newTime
                queue.ENQUEUE((newTime, v))
            ELSE IF dist1[v] < newTime < dist2[v]:
                dist2[v] ← newTime
                queue.ENQUEUE((newTime, v))

    RETURN dist2[n]
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(V + E) — BFS with bounded visits per node |
| Space  | O(V + E) |

---

## Key Takeaway

> Track the **two shortest** arrival times per node (not just one) to find the second minimum path. Traffic light timing adds a modular arithmetic waiting calculation.
