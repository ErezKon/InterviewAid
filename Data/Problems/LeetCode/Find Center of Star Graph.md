# 1791. Find Center of Star Graph

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-center-of-star-graph](https://leetcode.com/problems/find-center-of-star-graph)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

There is an undirected **star** graph consisting of `n` nodes labeled from `1` to `n`. A star graph is a graph where there is one **center** node and **exactly** `n - 1` edges that connect the center node with every other node.

You are given a 2D integer array `edges` where each `edges[i] = [u_i, v_i]` indicates that there is an edge between the nodes `u_i` and `v_i`. Return the center of the given star graph.

**Constraints:**

- `3 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `1 <= u_i, v_i <= n`
- `u_i != v_i`
- The given `edges` represent a valid star graph.

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

```
Example 1:
  Input: edges = [[1,2],[2,3],[4,2]]
  Output: 2
  Explanation: As shown in the figure (star with center 2 connected to 1, 3 and 4), node 2 is connected to every other node, so 2 is the center.
```

```
Example 2:
  Input: edges = [[1,2],[5,1],[1,3],[1,4]]
  Output: 1
```

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Examine first two edges `edges[0]` and `edges[1]` | The center must be present in both |
| 2 | Check if the first node of `edges[0]` appears in `edges[1]` | If true, it is the center |
| 3 | Otherwise, the second node of `edges[0]` is the center | By elimination |

---

## Complexity Analysis

- **Time:** O(1) – only constant-time checks on the first two edges.
- **Space:** O(1) – no extra data structures needed.

---

## Follow-Up Questions

1. How would you adapt the solution if the graph could be disconnected?
2. Can you extend the approach to verify that the given edges indeed form a valid star graph?
3. What changes are needed if the input is given as an adjacency list instead of edge pairs?

---

## Key Takeaway

> **The center node is the common node between any two edges; checking the first two edges yields the answer in constant time.**