# 2458. Height of Binary Tree After Subtree Removal Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries](https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries)

**Companies:** Google, Meta, Snowflake
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Precompute Heights + Top-2 per Level — O(n) ✅](#3-approach-precompute-heights)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given the `root` of a **binary tree** with `n` nodes. Each node is assigned a unique value from `1` to `n`. You are also given an array `queries` of size `m`.

You have to perform `m` **independent** queries on the tree where in the `i`th query you do the following:

- **Remove** the subtree rooted at the node with the value `queries[i]` from the tree. It is **guaranteed** that `queries[i]` will **not** be equal to the value of the root.

Return *an array* `answer` *of size* `m` *where* `answer[i]` *is the height of the tree after performing the* `i`th *query*.

**Note**:

- The queries are independent, so the tree returns to its **initial** state after each query.
- The height of a tree is the **number of edges in the longest simple path** from the root to some node in the tree.

**Constraints:**
- The number of nodes in the tree is `n`.
- `2 <= n <= 10^5`
- `1 <= Node.val <= n`
- All the values in the tree are **unique**.
- `m == queries.length`
- `1 <= m <= min(n, 10^4)`
- `1 <= queries[i] <= n`
- `queries[i] != root.val`

---

## 2. Key Insight

> For each depth level, track the top 2 deepest subtrees. If the removed node holds the deepest subtree at its level, use the second deepest. Otherwise the height is unchanged.

---

## 3. Approach: Precompute Heights + Top-2 per Level — O(n) ✅

```text
FUNCTION preprocess(root):
    // DFS to compute depth and subtree height for each node
    // For each depth, maintain two largest heights among nodes at that depth
    RETURN data structures mapping node → (depth, height) and depth → top2 heights

FUNCTION query(node):
    depth ← node.depth
    height ← node.height
    top1, top2 ← depthTopTwo[depth]
    IF height = top1:
        RETURN MAX(globalMaxHeight, top2)
    ELSE:
        RETURN globalMaxHeight
```

---

## 4. Examples

```
Example 1:
  Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
  Output: [2]
  Explanation: Removing the subtree rooted at node with value 4 (which contains 4, 6, 5, 7).
  The height of the tree is 2 (The path 1 -> 3 -> 2).

          1
         / \
        3   4
       /   / \
      2   6   5
               \
                7
```
```
Example 2:
  Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
  Output: [3,2,3,2]
  Explanation: We have the following queries:
  - Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
  - Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
  - Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
  - Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).
```

---

## 5. Walkthrough

Consider the tree:
```
      1
     / \
    2   3
   / \
  4   5
```
1. Preprocess computes depths: 1→0, 2→1, 3→1, 4→2, 5→2.
2. Heights: 4→0, 5→0, 2→1, 3→0, 1→2.
3. For depth 2, top two heights are both 0.
4. Query node 2 (depth 1, height 1). At depth 1, top heights are 1 (node 2) and 0 (node 3). Since node 2 is the deepest at its depth, new height = max(global height 2, second top 0) = 2.
5. Result matches expected height after removing subtree rooted at 2.

---

## 6. Complexity Analysis

- **Time:** O(n) preprocessing + O(1) per query.
- **Space:** O(n) for storing depth, height, and top-two per depth.

---

## 7. Key Takeaway

> **Top-2 per level** pattern: precompute each node's depth and subtree height, keep the two deepest heights per depth, and answer removal queries in constant time.
