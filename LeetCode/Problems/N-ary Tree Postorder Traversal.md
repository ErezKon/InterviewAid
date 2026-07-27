# 590. N-ary Tree Postorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-ary-tree-postorder-traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Recursive DFS — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the postorder traversal of an N-ary tree.

---

## 2. Approach: Recursive DFS — O(n) ✅

```
FUNCTION postorder(root):
    IF NOT root: RETURN []
    result = []
    FOR child IN root.children: result.EXTEND(postorder(child))
    result.ADD(root.val)
    RETURN result
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — recursion stack |

---

## 4. Key Takeaway

> **Postorder = children first, then root.** Recursively process all children before appending the node's value.
