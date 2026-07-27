# 589. N-ary Tree Preorder Traversal

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Recursive DFS — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the preorder traversal of an N-ary tree.

---

## 2. Approach: Recursive DFS — O(n) ✅

```
FUNCTION preorder(root):
    IF NOT root: RETURN []
    result = [root.val]
    FOR child IN root.children: result.EXTEND(preorder(child))
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

> **Preorder = root first, then children.** Append node value before recursing into children.
