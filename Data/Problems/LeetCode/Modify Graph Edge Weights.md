# 2699. Modify Graph Edge Weights

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/modify-graph-edge-weights](https://leetcode.com/problems/modify-graph-edge-weights)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Dijkstras — O(E log V)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an **undirected weighted** **connected** graph containing `n` nodes labeled from `0` to `n - 1`, and an integer array `edges` where `edges[i] = [a_i, b_i, w_i]` indicates that there is an edge between nodes `a_i` and `b_i` with weight `w_i`.

Some edges have a weight of `-1` (`w_i = -1`), while others have a **positive** weight (`w_i > 0`).

Your task is to modify **all edges** with a weight of `-1` by assigning them **positive integer values **in the range `[1, 2 * 10^9]` so that the **shortest distance** between the nodes `source` and `destination` becomes equal to an integer `target`. If there are **multiple** **modifications** that make the shortest distance between `source` and `destination` equal to `target`, any of them will be considered correct.

Return *an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from *`source`* to *`destination`* equal to *`target`*, or an **empty array** if it's impossible.*

**Note:** You are not allowed to modify the weights of edges with initial positive weights.

**Constraints:**
- `1 <= n <= 100`
- `1 <= edges.length <= n * (n - 1) / 2`
- `edges[i].length == 3`
- `0 <= a_i, b_i < n`
- `w_i = -1 `or `1 <= w_i <= 10^7`
- `a_i != b_i`
- `0 <= source, destination < n`
- `source != destination`
- `1 <= target <= 10^9`
- The graph is connected, and there are no self-loops or repeated edges

---

## 2. Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2023/04/18/graph.png)
Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
Explanation: The graph above shows a possible modification to the edges, making the distance from 0 to 1 equal to 5.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2023/04/18/graph-2.png)
Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
Output: []
Explanation: The graph above contains the initial edges. It is not possible to make the distance from 0 to 2 equal to 6 by modifying the edge with weight -1. So, an empty array is returned.
```

**Example 3:**
```
![img](https://assets.leetcode.com/uploads/2023/04/19/graph-3.png)
Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
Explanation: The graph above shows a modified graph having the shortest distance from 0 to 2 as 6.
```

---

## 3. Key Insight

> Use two passes of Dijkstra. First, set all `-1` edges to weight `1` (minimum). If the shortest path already exceeds `target`, impossible. Otherwise, gradually increase weights of modifiable edges while re‑running Dijkstra; the shortest path distance is monotonic with respect to edge weight increases.

---

## 4. Approach: Two Dijkstras — O(E log V) ✅

```text
FUNCTION modifiedGraphEdges(n, edges, source, dest, target):
    // Pass 1: set all -1 edges to 1
    FOR each edge IN edges:
        IF edge.weight == -1:
            edge.weight ← 1
    dist ← DIJKSTRA(n, edges, source)
    IF dist[dest] > target:
        RETURN []  // impossible
    // Pass 2: increase weights of -1 edges as needed
    FOR each edge IN edges WHERE original weight was -1:
        // binary search possible weight for this edge
        low ← 1, high ← target
        WHILE low ≤ high:
            mid ← (low + high) / 2
            edge.weight ← mid
            newDist ← DIJKSTRA(n, edges, source)
            IF newDist[dest] == target:
                BREAK
            IF newDist[dest] < target:
                low ← mid + 1
            ELSE:
                high ← mid - 1
    // Set any remaining -1 edges to a large value
    FOR each edge IN edges WHERE edge.weight == -1:
        edge.weight ← 1e9
    RETURN edges
```

---

## 5. Walkthrough

Consider the first example.
1. Replace `-1` edge `1→2` with weight `1`. Run Dijkstra → distance `0→4` = 8 (> target 7) → need to increase.
2. Binary search weight for edge `1→2`:
   - mid=4 → distance becomes 9 (too high).
   - mid=2 → distance 8 (still high).
   - mid=3 → distance 7 → matches target.
3. Set remaining `-1` edges (none) to large value. Return modified edge list `[[1,2,3]]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V * log target) — Dijkstra per binary‑search step |
| **Space** | O(V + E) |

---

## 7. Follow-Up Questions

1. How would you handle multiple modifiable edges simultaneously without binary search?
2. Can the problem be solved in O(E log V) using a single Dijkstra with edge potentials?
3. What changes if edge weights can be fractional?

---

## 8. Key Takeaway

> **Two‑phase Dijkstra with weight adjustments.** Start with minimum weights, then increase modifiable edges until the shortest path exactly matches the target; the distance grows monotonically with edge weight increases.
