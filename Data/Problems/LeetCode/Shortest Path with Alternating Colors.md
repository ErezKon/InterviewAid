# 1129. Shortest Path with Alternating Colors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-with-alternating-colors](https://leetcode.com/problems/shortest-path-with-alternating-colors)
**Companies:** Amazon, Google, Meta, Microsoft, Sprinklr

---

## Problem Description

You are given an integer `n`, the number of nodes in a directed graph where the nodes are labeled from `0` to `n - 1`. Each edge is red or blue in this graph, and there could be self-edges and parallel edges.

You are given two arrays `redEdges` and `blueEdges` where:

- `redEdges[i] = [a_i, b_i]` indicates that there is a directed red edge from node `a_i` to node `b_i` in the graph, and
- `blueEdges[j] = [u_j, v_j]` indicates that there is a directed blue edge from node `u_j` to node `v_j` in the graph.

Return an array `answer` of length `n`, where each `answer[x]` is the length of the shortest path from node `0` to node `x` such that the edge colors alternate along the path, or `-1` if such a path does not exist.

**Constraints:**
- `1 <= n <= 100`
- `0 <= redEdges.length, blueEdges.length <= 400`
- `redEdges[i].length == blueEdges[j].length == 2`
- `0 <= a_i, b_i, u_j, v_j < n`

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

**Example 1:**
```
Input: n = 3, redEdges = [[0,1],[1,2]], blueEdges = []
Output: [0,1,-1]
```

**Example 2:**
```
Input: n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]
Output: [0,1,-1]
```

---

## Walkthrough

1. **Initialize** – Build two adjacency maps, one for red edges and one for blue edges.
2. **Queue Seed** – Start from node 0 with both possible previous colors (red and blue) at distance 0.
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
