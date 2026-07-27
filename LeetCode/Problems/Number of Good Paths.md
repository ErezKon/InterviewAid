# 2421. Number of Good Paths

**Difficulty:** 🔴 Hard
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/number-of-good-paths](https://leetcode.com/problems/number-of-good-paths)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with Sorted Values — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A **good path** starts and ends at nodes with the same value, and every node on the path has value ≤ that. Count all good paths in a tree.

---

## 2. Key Insight

> Process nodes in increasing value order. For each value, union nodes with their neighbors that have ≤ current value. Count pairs of same-value nodes in each component.

---

## 3. Approach: Union-Find with Sorted Values — O(n log n) ✅

```
FUNCTION numberOfGoodPaths(vals, edges):
    n = len(vals)
    // Sort nodes by value
    valToNodes = group nodes by vals[node], sorted by value

    parent = [0..n-1]
    result = n    // each node is a good path of length 0

    FOR val IN sorted values:
        FOR node IN valToNodes[val]:
            FOR neighbor IN adj[node]:
                IF vals[neighbor] <= val:
                    union(node, neighbor)

        // Count pairs of nodes with this value in same component
        groups = group valToNodes[val] by find(node)
        FOR group of size k:
            result += k * (k - 1) / 2

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n · α(n)) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sort by value + Union-Find.** Process nodes in ascending value to ensure the path constraint. Group same-value nodes by component and count pairs. Elegant combination of sorting and DSU.
