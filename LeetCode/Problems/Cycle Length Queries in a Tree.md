# 2509. Cycle Length Queries in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cycle-length-queries-in-a-tree](https://leetcode.com/problems/cycle-length-queries-in-a-tree)
**Companies:** Arcesium

---

## Problem Description

A perfect binary tree has nodes 1 to 2^n - 1. For each query `(a, b)`, adding edge `(a, b)` creates a cycle. Find the cycle length.

---

## Key Insight

In a perfect binary tree, the parent of node `x` is `x // 2`. The cycle length = path from `a` to `b` through their LCA + 1 (for the added edge). Find LCA by moving the deeper node up until both meet. Count steps.

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

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × n) where n = tree height |
| **Space** | O(1) per query |

---

## Key Takeaway

> **LCA in a perfect binary tree: repeatedly halve the larger node. Steps to LCA from both nodes + 1 (the added edge) = cycle length. No preprocessing needed.**
