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

```text
FUNCTION secondMinimum(n, edges, time, change):
    graph ← adjacency list from edges
    dist1 ← [INF] * (n+1)
    dist2 ← [INF] * (n+1)
    dist1[1] ← 0
    queue ← [(0, 1)]  // (elapsedTime, node)

    WHILE queue NOT EMPTY:
        t, u ← queue.DEQUEUE()
        FOR v IN graph[u]:
            // Determine waiting time for green light
            IF (t / change) % 2 == 1:               // red phase
                wait ← change - (t % change)
            ELSE:
                wait ← 0
            newTime ← t + wait + time

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

## Examples

**Example 1:**
```
Input: n = 5, edges = [[1,2],[1,3],[1,4],[3,5],[4,5]], time = 3, change = 5
Output: 13
Explanation: The shortest time is 11 (1→2→1→3→5). The second shortest is 13 (1→3→5).
```

**Example 2:**
```
Input: n = 2, edges = [[1,2]], time = 3, change = 2
Output: 7
Explanation: First arrival at t=3 (green). Second arrival must wait for red at node 2, arriving at t=7.
```

---

## Walkthrough

| Step | Node | Arrival Time | Light State | Action |
|------|------|--------------|-------------|--------|
| 1 | 1 | 0 | Green | Start
| 2 | 2 | 3 | Green | Travel edge (1,2)
| 3 | 1 | 6 | Red (wait 2) | Return to 1
| 4 | 3 | 11 | Green | Travel via 1→3→5, second shortest path

The BFS explores both earliest and second‑earliest arrivals, applying the waiting logic at each node, ultimately yielding the second minimum time.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(V + E) — each node processed at most twice |
| Space  | O(V + E) |

---

## Key Takeaway

> Track the **two shortest** arrival times per node (not just one) to find the second minimum path. Traffic light timing adds a modular arithmetic waiting calculation.
