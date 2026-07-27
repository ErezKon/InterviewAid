# 2359. Find Closest Node to Given Two Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-closest-node-to-given-two-nodes](https://leetcode.com/problems/find-closest-node-to-given-two-nodes)
**Companies:** Amazon, Bloomberg, Google, Juspay

---

## Problem Description

A directed graph where each node has at most one outgoing edge. Find the node reachable from both `node1` and `node2` that minimizes `max(dist1, dist2)`. Return smallest index on tie.

---

## Approach: Two Traversals — O(n) ✅

```
FUNCTION closestMeetingNode(edges, node1, node2):
    FUNCTION getDists(start):
        dist = [-1] * n; d = 0; curr = start
        WHILE curr != -1 AND dist[curr] == -1:
            dist[curr] = d; d += 1; curr = edges[curr]
        RETURN dist

    d1 = getDists(node1); d2 = getDists(node2)
    result = -1; minDist = infinity
    FOR i ← 0 TO n - 1:
        IF d1[i] != -1 AND d2[i] != -1:
            maxD = MAX(d1[i], d2[i])
            IF maxD < minDist: minDist = maxD; result = i
    RETURN result
```

---

## Key Takeaway

> **Compute distances from both sources, find node minimizing the max of both distances. Each node has ≤ 1 outgoing edge, so traversal is linear.**
