# 684. Redundant Connection

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/redundant-connection](https://leetcode.com/problems/redundant-connection)
**Companies:** Amazon, Bloomberg, Box, Google, Inmobi, Meta, Microsoft, Oracle

---

## 1. Problem Description

Given a graph that started as a tree with one extra edge added, find the edge that can be removed to make it a tree again. Return the last such edge in the input.

---

## 2. Approach: Union-Find — O(n·α(n)) ✅

Process edges one by one. The first edge connecting two already‑connected nodes creates the cycle.

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

| edges | redundant edge |
|-------|----------------|
| `[[1,2],[1,3],[2,3]]` | `[2,3]` |
| `[[1,2],[2,3],[3,4],[1,4],[1,5]]` | `[1,4]` |

---

## Walkthrough

1. Initialise each node as its own set.
2. Edge `[1,2]`: `find(1) != find(2)` → union.
3. Edge `[1,3]`: `find(1) != find(3)` → union.
4. Edge `[2,3]`: `find(2) == find(3)` (both in same component) → cycle detected, return `[2,3]`.
5. For the second example, the cycle is detected when processing `[1,4]` because `1` and `4` are already connected via `1‑2‑3‑4`.

---

## Complexity Analysis

- **Time:** O(n·α(n)) – each `find`/`union` is almost O(1) (inverse Ackermann).
- **Space:** O(n) for the parent and rank arrays.

---

## Follow-Up Questions

- How would you modify the algorithm to return all edges that form cycles?
- Can you solve the problem without Union‑Find, e.g., using DFS for each edge?
- What changes are needed if the graph may contain multiple extra edges?

---

## Key Takeaway

> "Find the extra edge in a tree" = Union-Find cycle detection. The edge that creates a cycle when both endpoints are already in the same component is the answer.
