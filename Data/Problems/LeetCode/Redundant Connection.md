# 684. Redundant Connection

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/redundant-connection](https://leetcode.com/problems/redundant-connection)
**Companies:** Amazon, Bloomberg, Box, Google, Inmobi, Meta, Microsoft, Oracle

---

## 1. Problem Description

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two **different** vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the graph.

Return *an edge that can be removed so that the resulting graph is a tree of* `n` *nodes*. If there are multiple answers, return the answer that occurs last in the input.

**Constraints:**

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- There are no repeated edges.
- The given graph is connected.

---

## 2. Approach: Union-Find — O(n·α(n)) ✅

Process edges one by one. The first edge connecting two already-connected nodes creates the cycle.

```text
FUNCTION findRedundantConnection(edges):
    parent ← [0..n]
    rank ← [0] * (n + 1)

    FOR [u, v] IN edges:
        IF find(u) == find(v):
            RETURN [u, v]   // creates a cycle
        union(u, v)
    RETURN []
```

---

## Examples

```
Example 1:
  Input: edges = [[1,2],[1,3],[2,3]]
  Output: [2,3]
```

```
Example 2:
  Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
  Output: [1,4]
```

---

## Walkthrough

1. Initialise each node as its own set.
2. Edge `[1,2]`: `find(1) != find(2)` → union.
3. Edge `[1,3]`: `find(1) != find(3)` → union.
4. Edge `[2,3]`: `find(2) == find(3)` (both in same component) → cycle detected, return `[2,3]`.
5. For the second example, the cycle is detected when processing `[1,4]` because `1` and `4` are already connected via `1-2-3-4`.

---

## Complexity Analysis

- **Time:** O(n·α(n)) – each `find`/`union` is almost O(1) (inverse Ackermann).
- **Space:** O(n) for the parent and rank arrays.

---

## Follow-Up Questions

- How would you modify the algorithm to return all edges that form cycles?
- Can you solve the problem without Union-Find, e.g., using DFS for each edge?
- What changes are needed if the graph may contain multiple extra edges?

---

## Key Takeaway

> "Find the extra edge in a tree" = Union-Find cycle detection. The edge that creates a cycle when both endpoints are already in the same component is the answer.
