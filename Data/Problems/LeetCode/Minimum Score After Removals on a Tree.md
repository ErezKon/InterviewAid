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

There is an undirected connected tree with `n` nodes labeled from `0` to `n - 1` and `n - 1` edges.

You are given a **0-indexed** integer array `nums` of length `n` where `nums[i]` represents the value of the `i^th` node. You are also given a 2D integer array `edges` of length `n - 1` where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

Remove two **distinct** edges of the tree to form three connected components. For a pair of removed edges, the following steps are defined:

- Get the XOR of all the values of the nodes for **each** of the three components respectively.
- The **difference** between the **largest** XOR value and the **smallest** XOR value is the **score** of the pair.

- For example, say the three components have the node values: `[4,5,7]`, `[1,9]`, and `[3,3,3]`. The three XOR values are `4 ^ 5 ^ 7 = **6**`, `1 ^ 9 = **8**`, and `3 ^ 3 ^ 3 = **3**`. The largest XOR value is `8` and the smallest XOR value is `3`. The score is then `8 - 3 = 5`.

Return *the **minimum** score of any possible pair of edge removals on the given tree*.

**Constraints:**
- `n == nums.length`
- `3 <= n <= 1000`
- `1 <= nums[i] <= 10^8`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `edges` represents a valid tree.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 9
Explanation: The diagram above shows a way to make a pair of removals.
- The 1^st component has nodes [1,3,4] with values [5,4,11]. Its XOR value is 5 ^ 4 ^ 11 = 10.
- The 2^nd component has node [0] with value [1]. Its XOR value is 1 = 1.
- The 3^rd component has node [2] with value [5]. Its XOR value is 5 = 5.
The score is the difference between the largest and smallest XOR value which is 10 - 1 = 9.
It can be shown that no other pair of removals will obtain a smaller score than 9.
```

**Example 2:**
```
Input: nums = [5,5,2,4,4,2], edges = [[0,1],[1,2],[5,2],[4,3],[1,3]]
Output: 0
Explanation: The diagram above shows a way to make a pair of removals.
- The 1^st component has nodes [3,4] with values [4,4]. Its XOR value is 4 ^ 4 = 0.
- The 2^nd component has nodes [1,0] with values [5,5]. Its XOR value is 5 ^ 5 = 0.
- The 3^rd component has nodes [2,5] with values [2,2]. Its XOR value is 2 ^ 2 = 0.
The score is the difference between the largest and smallest XOR value which is 0 - 0 = 0.
We cannot obtain a smaller score than 0.
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
