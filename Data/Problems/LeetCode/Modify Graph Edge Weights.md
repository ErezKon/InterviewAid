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

Given a directed graph with `n` nodes and edges where some edges have weight `-1` (modifiable), assign positive integer weights to these edges so that the shortest path distance from `source` to `destination` equals exactly `target`. Return the modified edge list, or an empty array if impossible.

**Constraints:**
- `1 <= n <= 100`
- `1 <= edges.length <= n*(n-1)/2`
- Edge weights are integers; `-1` indicates a modifiable edge.

---

## 2. Examples

| n | edges | source | destination | target | Output |
|---|-------|--------|-------------|--------|--------|
| 5 | [[0,1,2],[1,2,-1],[2,3,2],[3,4,2]] | 0 | 4 | 7 | [[1,2,3]] |
| 3 | [[0,1,-1],[1,2,-1]] | 0 | 2 | 5 | [] |

*Explanation:* In the first case, setting edge `1→2` to weight `3` makes the shortest path `0→1→2→3→4` equal `7`. In the second case, no assignment can achieve target `5`.

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
