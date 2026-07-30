# 1791. Find Center of Star Graph

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-center-of-star-graph](https://leetcode.com/problems/find-center-of-star-graph)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

A star graph has one central node connected to every other node. Given a list of edges, identify the center node.

---

## Approach: Check First Two Edges — O(1) ✅

```text
FUNCTION findCenter(edges):
    // The center appears in every edge.
    IF edges[0][0] IN edges[1]:
        RETURN edges[0][0]
    RETURN edges[0][1]
```

---

## Examples

**Example 1:**
```
edges = [[1,2],[2,3],[4,2]]
```
**Output:** `2`
Explanation: Node 2 appears in all edges, so it is the center.

**Example 2:**
```
edges = [[3,1],[3,2],[3,4]]
```
**Output:** `3`
Explanation: Node 3 is common to all edges.

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Examine first two edges `edges[0]` and `edges[1]` | The center must be present in both |
| 2 | Check if the first node of `edges[0]` appears in `edges[1]` | If true, it is the center |
| 3 | Otherwise, the second node of `edges[0]` is the center | By elimination |

---

## Complexity Analysis

- **Time:** O(1) – only constant‑time checks on the first two edges.
- **Space:** O(1) – no extra data structures needed.

---

## Follow-Up Questions

1. How would you adapt the solution if the graph could be disconnected?
2. Can you extend the approach to verify that the given edges indeed form a valid star graph?
3. What changes are needed if the input is given as an adjacency list instead of edge pairs?

---

## Key Takeaway

> **The center node is the common node between any two edges; checking the first two edges yields the answer in constant time.**