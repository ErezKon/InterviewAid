# 2458. Height of Binary Tree After Subtree Removal Queries

**Difficulty:** 🔴 Hard

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

Given a binary tree, answer queries: after removing the subtree rooted at node `q`, what is the tree's height?

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

| Tree (preorder) | Query Node | Height After Removal |
|-----------------|------------|----------------------|
| [1,2,4,null,null,5,null,null,3,null,null] | 2 | 2 |
| [1,2,null,3,null,4,null,null] | 3 | 3 |

*Explanation*: In the first tree, removing node 2 eliminates the deepest branch, so the new height drops from 3 to 2.

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
- **Space:** O(n) for storing depth, height, and top‑two per depth.

---

## 7. Key Takeaway

> **Top‑2 per level** pattern: precompute each node's depth and subtree height, keep the two deepest heights per depth, and answer removal queries in constant time.
