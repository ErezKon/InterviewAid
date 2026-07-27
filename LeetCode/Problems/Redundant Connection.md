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

Process edges one by one. The first edge connecting two already-connected nodes creates the cycle.

```
FUNCTION findRedundantConnection(edges):
    parent = [0..n]
    rank = [0] * (n + 1)

    FOR [u, v] IN edges:
        IF find(u) == find(v):
            RETURN [u, v]     // already connected → cycle
        union(u, v)

    RETURN []
```

| Time | Space |
|------|-------|
| O(n·α(n)) | O(n) |

---

## Key Takeaway

> "Find the extra edge in a tree" = Union-Find cycle detection. The edge that creates a cycle when both endpoints are already in the same component is the answer.
