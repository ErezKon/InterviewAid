# 1791. Find Center of Star Graph

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-center-of-star-graph](https://leetcode.com/problems/find-center-of-star-graph)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

A star graph has one center node connected to all others. Given edges, find the center.

---

## Approach: Check First Two Edges — O(1) ✅

```
FUNCTION findCenter(edges):
    IF edges[0][0] IN edges[1]: RETURN edges[0][0]
    RETURN edges[0][1]
```

The center appears in every edge, so it must appear in both the first and second edge.

---

## Key Takeaway

> **The center node is the common node between any two edges. Check first two edges — O(1).**
