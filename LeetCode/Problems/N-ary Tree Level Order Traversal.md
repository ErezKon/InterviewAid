# 429. N-ary Tree Level Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/n-ary-tree-level-order-traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the level order traversal of an N-ary tree as a list of lists.

---

## 2. Key Insight

> Standard BFS with level-by-level processing. Process all nodes at current level, collect their children for the next level.

---

## 3. Approach: BFS — O(n) ✅

```
FUNCTION levelOrder(root):
    IF NOT root: RETURN []
    result = []; queue = [root]
    WHILE queue:
        result.ADD([node.val for node in queue])
        queue = [child for node in queue for child in node.children]
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — queue width |

---

## 5. Key Takeaway

> **Level-by-level BFS** — swap queue each level. Works identically to binary tree BFS but iterates over `node.children` instead of left/right.
