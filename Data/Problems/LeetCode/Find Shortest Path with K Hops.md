# 2714. Find Shortest Path with K Hops

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-shortest-path-with-k-hops](https://leetcode.com/problems/find-shortest-path-with-k-hops)
**Companies:** Goldman Sachs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Modified Dijkstra with State (node, hops) — O((V+E)·K · log(V·K)) ✅](#4-approach-modified-dijkstra-with-state-node-hops)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a weighted undirected graph with `n` nodes, `edges`, a source `s`, destination `d`, and integer `k`, find the **shortest path** from `s` to `d` where you can "hop" (skip the weight of) at most `k` edges (treat their weight as 0).

**Constraints:**
- `2 <= n <= 500`
- `0 <= edges.length <= n*(n-1)/2`
- `0 <= k <= edges.length`
- `1 <= weight <= 10⁶`

---

## 2. Examples

```
Example 1:
  n=4, edges=[[0,1,4],[0,2,2],[2,3,6]], s=0, d=3, k=1
  Output: 2
  Reason: Path 0→2→3, hop edge 2→3 (weight 6→0). Cost = 2+0 = 2.

Example 2:
  n=4, edges=[[0,1,4],[0,2,2],[2,3,6]], s=0, d=3, k=0
  Output: 8
  Reason: Path 0→2→3, no hops allowed. Cost = 2+6 = 8.
```

---

## 3. Key Insight

> Expand the Dijkstra state to `(distance, node, hops_used)`. For each edge, you have two choices: **pay** the weight (hops unchanged) or **hop** it for free (hops_used + 1, if ≤ k). Track `dist[node][hops]` to avoid revisiting.

---

## 4. Approach: Modified Dijkstra with State (node, hops) — O((V+E)·K · log(V·K)) ✅

```
FUNCTION shortestPathWithKHops(n, edges, s, d, k):
    graph ← adjacency list from edges
    dist ← 2D array [n][k+1] initialized to ∞
    dist[s][0] ← 0
    pq ← MinHeap with (0, s, 0)    // (distance, node, hopsUsed)

    WHILE pq NOT EMPTY DO
        (cost, u, hops) ← pq.POP()
        IF u == d THEN RETURN cost
        IF cost > dist[u][hops] THEN CONTINUE

        FOR (v, w) IN graph[u] DO
            // Option 1: Pay the edge weight
            IF cost + w < dist[v][hops] THEN
                dist[v][hops] ← cost + w
                pq.PUSH((cost + w, v, hops))

            // Option 2: Hop (free edge) if hops remaining
            IF hops < k AND cost < dist[v][hops + 1] THEN
                dist[v][hops + 1] ← cost
                pq.PUSH((cost, v, hops + 1))

    RETURN dist[d][min over all hops]
```

---

## 5. Walkthrough

```
n=4, edges=[[0,1,4],[0,2,2],[2,3,6]], s=0, d=3, k=1

pq: [(0, 0, 0)]
Pop (0, 0, 0):
  Edge 0→1 (w=4): pay → dist[1][0]=4, hop → dist[1][1]=0
  Edge 0→2 (w=2): pay → dist[2][0]=2, hop → dist[2][1]=0

Pop (0, 1, 1):  node 1, no edge to d
Pop (0, 2, 1):  Edge 2→3 (w=6): pay → dist[3][1]=6, hop → hops=2 > k=1, skip
Pop (2, 2, 0):  Edge 2→3 (w=6): pay → dist[3][0]=8, hop → dist[3][1]= min(6,2) = 2
Pop (2, 3, 1):  u==d → RETURN 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((V+E) · K · log(V·K)) — Dijkstra over expanded state space |
| **Space** | O(V · K) — distance table |

---

## 7. Follow-Up Questions

### 7.1 How does this relate to "Cheapest Flights Within K Stops"?

Very similar — both add a dimension to Dijkstra's state. K stops limits the number of edges; K hops makes K edges free.

### 7.2 Can you use BFS instead?

Only if all non-hopped weights are equal. Otherwise, BFS doesn't guarantee shortest paths with varying weights.

### 7.3 What if K equals the number of edges in the shortest path?

The entire path is free — the answer is 0 (if a path exists).

---

## 8. Key Takeaway

> **State-augmented Dijkstra** (`dist[node][resource]`) is the go-to technique when shortest paths have a limited resource (hops, stops, fuel). Each resource unit adds a dimension to the state space.
