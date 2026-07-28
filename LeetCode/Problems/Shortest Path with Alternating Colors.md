# 1129. Shortest Path with Alternating Colors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-with-alternating-colors](https://leetcode.com/problems/shortest-path-with-alternating-colors)
**Companies:** Amazon, Google, Meta, Microsoft, Sprinklr

---

## Problem Description

Given a directed graph with `n` nodes (0 to n‑1) and two sets of edges—red and blue—find the length of the shortest path from node 0 to every other node such that the colors of consecutive edges strictly alternate (red → blue → red …). If a node is unreachable under this rule, return `-1` for that node.

---

## Approach: BFS with Color State

```text
FUNCTION shortestAlternatingPaths(n, redEdges, blueEdges):
    // Build adjacency lists for each color
    graph[0] ← map from node → list of red neighbors
    graph[1] ← map from node → list of blue neighbors
    FOR [u, v] IN redEdges: graph[0][u].ADD(v)
    FOR [u, v] IN blueEdges: graph[1][u].ADD(v)

    result ← array of size n filled with -1
    queue ← [(0, 0, 0), (0, 1, 0)]   // (node, lastColor, distance)
    visited ← {(0, 0), (0, 1)}

    WHILE queue NOT EMPTY:
        (node, color, dist) ← queue.DEQUEUE()
        IF result[node] == -1: result[node] ← dist
        nextColor ← 1 - color
        FOR neighbor IN graph[nextColor][node]:
            IF (neighbor, nextColor) NOT IN visited:
                visited.ADD((neighbor, nextColor))
                queue.ENQUEUE((neighbor, nextColor, dist + 1))

    RETURN result
```

---

## Examples

| n | redEdges | blueEdges | Output |
|---|----------|-----------|--------|
| 3 | [[0,1],[1,2]] | [[2,1]] | [0,1,2] |
| 3 | [] | [[0,2],[2,1]] | [0,2,3] |
| 5 | [[0,1],[1,2],[2,3],[3,4]] | [[1,2],[2,3],[3,1]] | [0,1,2,3,4] |

*Explanation*: The BFS expands states `(node, lastColor)`. The first time a node is dequeued gives its shortest alternating‑color distance.

---

## Walkthrough

1. **Initialize** – Build two adjacency maps, one for red edges and one for blue edges.
2. **Queue Seed** – Start from node 0 with both possible previous colors (red and blue) at distance 0.
3. **BFS Loop** – Dequeue a state, record the distance for the node if not set, then explore all outgoing edges of the opposite color.
4. **State Tracking** – `visited` stores `(node, color)` pairs to avoid revisiting the same node with the same incoming color, which would not improve the distance.
5. **Termination** – When the queue empties, every reachable node has its shortest alternating‑color distance; unreachable nodes remain `-1`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n + e) – each node/color pair visited once, edges processed once | O(n + e) – adjacency lists and visited set |

---

## Follow-Up Questions

* How would you adapt the algorithm to return the actual alternating‑color paths, not just their lengths?
* Can the solution be extended to handle weighted edges while still enforcing color alternation?
* What changes are needed if the graph contains self‑loops or multiple edges of the same color between two nodes?

---

## Key Takeaway

> Model the problem as a **BFS over (node, lastColor) states**; alternating colors are enforced by always expanding edges of the opposite color.
