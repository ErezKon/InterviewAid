# 2509. Cycle Length Queries in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cycle-length-queries-in-a-tree](https://leetcode.com/problems/cycle-length-queries-in-a-tree)
**Companies:** Arcesium

---

## Problem Description

A perfect binary tree has nodes 1 to 2^n - 1. For each query `(a, b)`, adding edge `(a, b)` creates a cycle. Find the cycle length.

---

## Examples

| Input | Output |
|-------|--------|
| `n = 3`, `queries = [[5,6],[2,3]]` | `[4,3]` |
| `n = 4`, `queries = [[8,9],[1,15]]` | `[5,7]` |

*Explanation*: For the first query, the path from 5 to 6 goes 5 → 2 → 1 → 3 → 6 (4 edges). Adding the edge creates a cycle of length 4.

---

## Approach

```
FUNCTION cycleLengthQueries(n, queries):
    result = []
    FOR [a, b] IN queries:
        length = 1
        WHILE a != b:
            IF a > b: a = a // 2
            ELSE: b = b // 2
            length += 1
        result.ADD(length)
    RETURN result
```

---

## Walkthrough

**Query `[5,6]` in a tree of height 3**

| Step | a | b | Action | Length |
|------|---|---|--------|--------|
| 1 | 5 | 6 | a < b → b = b // 2 (6→3) | 2 |
| 2 | 5 | 3 | a > b → a = a // 2 (5→2) | 3 |
| 3 | 2 | 3 | a < b → b = b // 2 (3→1) | 4 |
| 4 | 2 | 1 | a > b → a = a // 2 (2→1) | 5 |
| 5 | 1 | 1 | Stop (LCA reached) | **Cycle length = 4** (edges traversed before adding edge) |

The algorithm counts the steps taken to bring both nodes to their lowest common ancestor, then adds the extra edge.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × n) where n = tree height |
| **Space** | O(1) per query |

---

## Follow-Up Questions

1. How would you preprocess the tree to answer queries in O(log n) time?
2. Extend the solution to a general (non‑perfect) binary tree.
3. What changes are needed if multiple edges are added simultaneously?

---

## Key Takeaway

> **LCA in a perfect binary tree: repeatedly halve the larger node. Steps to LCA from both nodes + 1 (the added edge) = cycle length. No preprocessing needed.**