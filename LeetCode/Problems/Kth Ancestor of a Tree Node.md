# 1483. Kth Ancestor of a Tree Node

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-ancestor-of-a-tree-node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Lifting — O(n log n) / O(log n) ✅](#3-approach-binary-lifting--on-log-n--olog-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a tree with `n` nodes and a `parent[]` array, implement `getKthAncestor(node, k)` returning the k-th ancestor of `node` (or -1 if it doesn't exist).

**Constraints:**
- `1 <= n <= 5 × 10⁴`
- Up to `5 × 10⁴` queries.

---

## 2. Key Insight

**Binary lifting:** precompute `up[node][j]` = the 2^j-th ancestor of `node`. To find the k-th ancestor, decompose k in binary and jump through powers of 2.

---

## 3. Approach: Binary Lifting — O(n log n) / O(log n) ✅

```
CLASS TreeAncestor:
    CONSTRUCTOR(n, parent):
        LOG = ceil(log2(n)) + 1
        up = n × LOG matrix, filled with -1
        FOR i ← 0 TO n-1: up[i][0] = parent[i]
        FOR j ← 1 TO LOG-1:
            FOR i ← 0 TO n-1:
                IF up[i][j-1] != -1:
                    up[i][j] = up[up[i][j-1]][j-1]

    FUNCTION getKthAncestor(node, k):
        FOR j ← 0 TO LOG-1:
            IF k & (1 << j):
                node = up[node][j]
                IF node == -1: RETURN -1
        RETURN node
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Preprocess | O(n log n) | Fill the binary lifting table |
| Query | O(log n) | At most log n jumps |
| Space | O(n log n) | The `up` table |

---

## 5. Key Takeaway

> **Binary lifting** is the standard technique for k-th ancestor queries. Precompute 2^j-th ancestors for all nodes, then decompose k into powers of 2. Also used in LCA (Lowest Common Ancestor) algorithms.
