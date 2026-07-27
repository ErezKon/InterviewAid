# 2458. Height of Binary Tree After Subtree Removal Queries

**Difficulty:** 🔴 Hard

**Companies:** Google, Meta, Snowflake
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Precompute Heights + Top-2 per Level — O(n) ✅](#3-approach-precompute-heights)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given a binary tree, answer queries: after removing the subtree rooted at node `q`, what is the tree's height?

---

## 2. Key Insight

> For each depth level, track the top 2 deepest subtrees. If the removed node holds the deepest subtree at its level, use the second deepest. Otherwise the height is unchanged.

---

## 3. Approach: Precompute Heights + Top-2 per Level — O(n) ✅

```
// Precompute height and depth of each node
// For each level, track top 2 deepest subtrees
// Removing a subtree: answer is max depth excluding that subtree's contribution
```

---

## 4. Key Takeaway

> **Top-2 per level** pattern: precompute each node's depth + subtree height. At query time, check if it's the level's deepest — if yes, fall back to second deepest.
