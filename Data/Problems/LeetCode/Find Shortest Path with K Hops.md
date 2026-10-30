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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a positive integer `n` which is the number of nodes of a **0-indexed undirected weighted connected** graph and a **0-indexed** **2D array** `edges` where `edges[i] = [u_i, v_i, w_i]` indicates that there is an edge between nodes `u_i` and `v_i` with weight `w_i`.

You are also given two nodes `s` and `d`, and a positive integer `k`, your task is to find the **shortest** path from `s` to `d`, but you can hop over **at most** `k` edges. In other words, make the weight of **at most** `k` edges `0` and then find the **shortest** path from `s` to `d`.

Return *the length of the **shortest** path from *`s`* to *`d`* with the given condition*.

**Constraints:**
- `2 <= n <= 500`
- `n - 1 <= edges.length <= min(10^4, n * (n - 1) / 2)`
- `edges[i].length = 3`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- `1 <= edges[i][2] <= 10^6`
- `0 <= s, d, k <= n - 1`
- `s != d`
- The input is generated such that the graph is **connected** and has **no** **repeated edges** or **self-loops**

---

## 2. Examples

**Example 1:**
```
Input: n = 4, edges = [[0,1,4],[0,2,2],[2,3,6]], s = 1, d = 3, k = 2
Output: 2
Explanation: In this example there is only one path from node 1 (the green node) to node 3 (the red node), which is (1->0->2->3) and the length of it is 4 + 2 + 6 = 12. Now we can make weight of two edges 0, we make weight of the blue edges 0, then we have 0 + 2 + 0 = 2. It can be shown that 2 is the minimum length of a path we can achieve with the given condition.
```

**Example 2:**
```
Input: n = 7, edges = [[3,1,9],[3,2,4],[4,0,9],[0,5,6],[3,6,2],[6,0,4],[1,2,4]], s = 4, d = 1, k = 2
Output: 6
Explanation: In this example there are 2 paths from node 4 (the green node) to node 1 (the red node), which are (4->0->6->3->2->1) and (4->0->6->3->1). The first one has the length 9 + 4 + 2 + 4 + 4 = 23, and the second one has the length 9 + 4 + 2 + 9 = 24. Now if we make weight of the blue edges 0, we get the shortest path with the length 0 + 4 + 2 + 0 = 6. It can be shown that 6 is the minimum length of a path we can achieve with the given condition.
```

**Example 3:**
```
Input: n = 5, edges = [[0,4,2],[0,1,3],[0,2,1],[2,1,4],[1,3,4],[3,4,7]], s = 2, d = 3, k = 1
Output: 3
Explanation: In this example there are 4 paths from node 2 (the green node) to node 3 (the red node), which are (2->1->3), (2->0->1->3), (2->1->0->4->3) and (2->0->4->3). The first two have the length 4 + 4 = 1 + 3 + 4 = 8, the third one has the length 4 + 3 + 2 + 7 = 16 and the last one has the length 1 + 2 + 7 = 10. Now if we make weight of the blue edge 0, we get the shortest path with the length 1 + 2 + 0 = 3. It can be shown that 3 is the minimum length of a path we can achieve with the given condition.
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
