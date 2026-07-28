# 743. Network Delay Time

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/network-delay-time](https://leetcode.com/problems/network-delay-time)
**Companies:** Akuna Capital, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Salesforce

---

## 1. Problem Description

Given a network of `n` nodes and weighted directed edges `times[i] = (u, v, w)`, and a starting node `k`, return the minimum time for all nodes to receive a signal. Return -1 if impossible.

---

## Examples

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Explanation: Starting from node 2, the signal reaches node 1 at time 1, node 3 at time 1, and node 4 at time 2.
```

**Example 2:**
```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

---

## Approach: Dijkstra's Algorithm — O(E log V) ✅

```text
FUNCTION networkDelayTime(times, n, k):
    // Build adjacency list
    graph ← map from node to list of (neighbor, weight)
    FOR each (u, v, w) IN times:
        APPEND (v, w) TO graph[u]

    dist ← map with default ∞, SET dist[k] ← 0
    heap ← min‑heap containing (0, k)   // (distance, node)

    WHILE heap NOT EMPTY:
        (d, u) ← heap.POP_MIN()
        IF d > dist[u]: CONTINUE
        FOR (v, w) IN graph[u]:
            newDist ← d + w
            IF newDist < dist.get(v, ∞):
                dist[v] ← newDist
                heap.PUSH((newDist, v))

    IF size of dist == n:
        RETURN MAX value in dist
    ELSE:
        RETURN -1
```

---

## Walkthrough

| Step | Heap (dist, node) | Distances map |
|------|-------------------|---------------|
| Init | (0, 2)            | {2:0} |
| Pop  | (0, 2)            | {2:0} |
| Relax edges from 2 → 1 (w=1) and 2 → 3 (w=1) | Heap: (1,1), (1,3) | {2:0,1:1,3:1} |
| Pop  | (1,1)             | {2:0,1:1,3:1} |
| No outgoing edges from 1 |
| Pop  | (1,3)             | {2:0,1:1,3:1} |
| Relax 3 → 4 (w=1) | Heap: (2,4) | {2:0,1:1,3:1,4:2} |
| Pop  | (2,4)             | {2:0,1:1,3:1,4:2} |
| All nodes visited – max distance = 2 |

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) |
| **Space** | O(V + E) |

---

## Follow-Up Questions

1. How would you adapt the solution if edges could have negative weights? (Consider Bellman‑Ford.)
2. Can you compute the minimum time for a subset of target nodes only?
3. How would you handle dynamic updates to edge weights?

---

## Key Takeaway

> Classic Dijkstra's: min‑heap for shortest paths from a single source. The answer is the max distance to any node (time for the last node to receive the signal).