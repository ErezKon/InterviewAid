# 743. Network Delay Time

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/network-delay-time](https://leetcode.com/problems/network-delay-time)
**Companies:** Akuna Capital, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Salesforce

---

## 1. Problem Description

Given a network of `n` nodes and weighted directed edges `times[i] = (u, v, w)`, and a starting node `k`, return the minimum time for all nodes to receive a signal. Return -1 if impossible.

---

## 2. Approach: Dijkstra's Algorithm — O(E log V) ✅

```
FUNCTION networkDelayTime(times, n, k):
    graph = adjacency list from times
    dist = {k: 0}
    heap = [(0, k)]     // (distance, node)

    WHILE heap not empty:
        (d, u) = heap.POP_MIN()

        IF d > dist.get(u, infinity): CONTINUE

        FOR (v, w) IN graph[u]:
            newDist = d + w
            IF newDist < dist.get(v, infinity):
                dist[v] = newDist
                heap.PUSH((newDist, v))

    IF len(dist) == n:
        RETURN MAX(dist.values())
    ELSE:
        RETURN -1
```

| Time | Space |
|------|-------|
| O(E log V) | O(V + E) |

---

## Key Takeaway

> Classic Dijkstra's: min-heap for shortest paths from a single source. The answer is the max distance to any node (time for the last node to receive the signal).
