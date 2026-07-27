# 1319. Number of Operations to Make Network Connected

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-operations-to-make-network-connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected)
**Companies:** Akuna Capital, Amazon, Bloomberg, Google, Ibm, Intuit, Meta, Microsoft, Phonepe, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find — O(E · α(V))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` computers and connections, find the minimum number of cable moves to connect all computers. Return `-1` if impossible.

---

## 2. Key Insight

> Need at least `n-1` edges. If we have that many, answer = `components - 1` (move redundant edges to bridge components).

---

## 3. Approach: Union-Find — O(E · α(V)) ✅

```
FUNCTION makeConnected(n, connections):
    IF len(connections) < n - 1: RETURN -1    // not enough cables

    uf = UnionFind(n)
    FOR [a, b] IN connections:
        uf.union(a, b)

    components = count of unique roots
    RETURN components - 1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · α(V)) |
| **Space** | O(V) |

---

## 5. Key Takeaway

> **Components - 1 moves needed.** If enough edges exist (≥ n-1), redundant edges can always be redistributed to connect disjoint components.
