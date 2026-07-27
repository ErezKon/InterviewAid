# 1627. Graph Connectivity With Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/graph-connectivity-with-threshold](https://leetcode.com/problems/graph-connectivity-with-threshold)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with Factor Enumeration — O(n log n) ✅](#3-approach-union-find-with-factor-enumeration)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given `n` cities and a `threshold`, two cities are connected if they share a common factor strictly greater than `threshold`. Answer queries about connectivity.

---

## 2. Key Insight

> Instead of checking all pairs O(n²), iterate over each factor `f > threshold` and union all multiples of `f`. This is O(n log n) via sieve-like enumeration.

---

## 3. Approach: Union-Find with Factor Enumeration — O(n log n) ✅

```
FUNCTION areConnected(n, threshold, queries):
    uf ← UnionFind(n + 1)
    FOR f ← threshold + 1 TO n DO
        FOR multiple ← 2*f TO n STEP f DO
            uf.UNION(f, multiple)
    RETURN [uf.FIND(a) == uf.FIND(b) for a, b in queries]
```

---

## 4. Key Takeaway

> **Sieve-style factor enumeration** + Union-Find. Union all multiples of each factor > threshold. O(n log n) preprocessing, O(α) per query.
