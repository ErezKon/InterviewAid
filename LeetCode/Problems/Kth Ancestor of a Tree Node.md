# 1483. Kth Ancestor of a Tree Node

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-ancestor-of-a-tree-node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Lifting — O(n log n) / O(log n) ✅](#3-approach-binary-lifting--on-log-n--olog-n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
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

## 4. Examples

| n | parent | query (node, k) | Output |
|---|--------|----------------|--------|
| 7 | [-1,0,0,1,1,2,2] | (5, 2) | 0 |
| 7 | [-1,0,0,1,1,2,2] | (4, 3) | -1 |

*Explanation:* In the first query, node 5 → parent 2 → parent 0, so the 2‑th ancestor is 0. In the second query, climbing three steps from node 4 exceeds the root, yielding -1.

---

## 5. Walkthrough

Consider the tree with `parent = [-1,0,0,1,1,2,2]` and query `(node=5, k=2)`.

1. **Preprocess:** Build `up` table. For each node, store ancestors at powers of two.
2. **Binary representation of k:** `k = 2` → `10₂`. Only the 2¹ (second) bit is set.
3. **Jump:** Starting at node 5, look at `up[5][1]` (2‑th ancestor) which is node 0.
4. Return node 0 as the answer.

---

## 6. Complexity Analysis

| Metric | Value |
|--------|-------|
| Preprocess | O(n log n) – fill binary lifting table |
| Query | O(log n) – at most log n jumps |
| Space | O(n log n) – `up` table |

---

## 7. Follow-Up Questions

- How would you modify the structure to support dynamic updates (adding/removing edges)?
- Can you extend binary lifting to answer Lowest Common Ancestor (LCA) queries efficiently?
- What is the trade‑off between preprocessing time and query time for different `k` ranges?

---

## 8. Key Takeaway

> **Binary lifting** precomputes 2^j‑th ancestors for every node, enabling k‑th ancestor queries in logarithmic time by decomposing `k` into binary bits.
