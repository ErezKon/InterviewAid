# 310. Minimum Height Trees

**Difficulty:** 🟡 Medium
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/minimum-height-trees](https://leetcode.com/problems/minimum-height-trees)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Splunk, Stackline

---

## 1. Problem Description

Given a tree of `n` nodes, find all roots that minimize the tree height (MHT roots). Return their labels.

---

## 2. Approach: Topological Peeling (Leaf Trimming) — O(n) ✅

Repeatedly remove leaf nodes (degree 1) layer by layer. The last remaining 1-2 nodes are the MHT roots.

```
FUNCTION findMinHeightTrees(n, edges):
    IF n <= 2: RETURN [0..n-1]

    graph = adjacency list
    degree = array of degrees
    leaves = all nodes with degree 1

    remaining = n
    WHILE remaining > 2:
        newLeaves = []
        FOR leaf IN leaves:
            neighbor = graph[leaf]'s remaining neighbor
            degree[neighbor] -= 1
            IF degree[neighbor] == 1:
                newLeaves.ADD(neighbor)
        remaining -= len(leaves)
        leaves = newLeaves

    RETURN leaves
```

### Why 1-2 roots?

A tree has at most 2 centers (the midpoints of the longest path/diameter).

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Peel leaves inward like an onion. The core (last 1-2 nodes) minimizes the maximum height. This is finding the center of a tree.
