# 2322. Minimum Score After Removals on a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-score-after-removals-on-a-tree](https://leetcode.com/problems/minimum-score-after-removals-on-a-tree)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DFS + Enumerate Edge Pairs — O(n²)](#4-approach-dfs--enumerate-edge-pairs--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a tree with `n` nodes, each having a value, remove **2 edges** to create **3 components**. The score = `max(XOR₁, XOR₂, XOR₃) - min(XOR₁, XOR₂, XOR₃)` where each XOR is the XOR of all values in a component. Return the **minimum** score.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= nums[i] <= 10⁸`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
  Output: 9
  Explanation: Remove edges (1,3) and (3,4). 
    Components: {0,1,2} XOR=1^5^5=1, {3} XOR=4, {4} XOR=11
    Score = 11-1 = 10. Better splits exist giving 9.
```

---

## 3. Key Insight

> DFS from root to compute subtree XOR for every node. When removing two edges (u₁,v₁) and (u₂,v₂), the three XOR values can be computed in O(1) using the subtree XOR values and the total XOR. Check if one removed subtree is an ancestor of the other to determine how XOR values decompose.

---

## 4. Approach: DFS + Enumerate Edge Pairs — O(n²) ✅

```
FUNCTION minimumScore(nums, edges):
    // Build tree, root at 0
    // DFS to compute: subtreeXOR[v], tin[v], tout[v] (entry/exit times)
    totalXOR = XOR of all nums

    minScore = infinity
    FOR each edge (u1, v1):       // first removal (v1 is child)
        FOR each edge (u2, v2):   // second removal (v2 is child)
            IF v2 is in subtree of v1:
                xor1 = subtreeXOR[v2]
                xor2 = subtreeXOR[v1] XOR xor1
                xor3 = totalXOR XOR subtreeXOR[v1]
            ELSE IF v1 is in subtree of v2:
                xor1 = subtreeXOR[v1]
                xor2 = subtreeXOR[v2] XOR xor1
                xor3 = totalXOR XOR subtreeXOR[v2]
            ELSE:
                xor1 = subtreeXOR[v1]
                xor2 = subtreeXOR[v2]
                xor3 = totalXOR XOR xor1 XOR xor2

            score = MAX(xor1,xor2,xor3) - MIN(xor1,xor2,xor3)
            minScore = MIN(minScore, score)

    RETURN minScore
```

---

## 5. Walkthrough

```
For each pair of edges, compute the 3 component XORs using
subtree XOR values. The ancestor check uses DFS timestamps:
  v2 is in subtree of v1 iff tin[v1] <= tin[v2] AND tout[v2] <= tout[v1]

This gives O(1) per pair evaluation after O(n) DFS preprocessing.
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — enumerate all edge pairs, O(1) per pair |
| **Space** | O(n) — DFS stack, subtree XOR, timestamps |

---

## 7. Key Takeaway

> **Subtree XOR + DFS timestamps** — precompute subtree XOR and entry/exit times. For any two edge removals, determine the ancestor relationship and compute all three component XORs in O(1).
