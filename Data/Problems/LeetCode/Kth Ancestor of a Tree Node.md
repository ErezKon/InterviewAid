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

You are given a tree with `n` nodes numbered from `0` to `n - 1` in the form of a parent array `parent` where `parent[i]` is the parent of `i^th` node. The root of the tree is node `0`. Find the `k^th` ancestor of a given node.

The `k^th` ancestor of a tree node is the `k^th` node in the path from that node to the root node.

Implement the `TreeAncestor` class:

- `TreeAncestor(int n, int[] parent)` Initializes the object with the number of nodes in the tree and the parent array.
- `int getKthAncestor(int node, int k)` return the `k^th` ancestor of the given node `node`. If there is no such ancestor, return `-1`.

**Constraints:**
- `1 <= k <= n <= 5 * 10^4`
- `parent.length == n`
- `parent[0] == -1`
- `0 <= parent[i] < n` for all `0 < i < n`
- `0 <= node < n`
- There will be at most `5 * 10^4` queries.

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

**Example 1:**
```
Input
["TreeAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor"]
[[7, [-1, 0, 0, 1, 1, 2, 2]], [3, 1], [5, 2], [6, 3]]
Output:
[null, 1, 0, -1]
Explanation:
TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1); // returns 1 which is the parent of 3
treeAncestor.getKthAncestor(5, 2); // returns 0 which is the grandparent of 5
treeAncestor.getKthAncestor(6, 3); // returns -1 because there is no such ancestor
```

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
