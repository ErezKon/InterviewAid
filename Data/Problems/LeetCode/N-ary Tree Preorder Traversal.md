# 589. N-ary Tree Preorder Traversal

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Recursive DFS — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return the preorder traversal of an N-ary tree.

---

## 2. Examples

| Input | Output |
|-------|--------|
| `root = [1,null,3,2,4,null,5,6]` | `[1,3,5,6,2,4]` |
| `root = []` | `[]` |

*Explanation*: The first example represents a tree where node `1` has children `3,2,4`; node `3` has children `5,6`. Preorder visits the root first, then each child recursively.

---

## 3. Approach: Recursive DFS — O(n) ✅

```text
FUNCTION preorder(root):
    IF NOT root: RETURN []
    result ← [root.val]
    FOR child IN root.children:
        result.EXTEND(preorder(child))
    RETURN result
```

---

## 4. Walkthrough

Consider the first example tree.

| Step | Node Visited | Result so far |
|------|--------------|--------------|
| 1 | 1 | [1] |
| 2 | 3 | [1,3] |
| 3 | 5 | [1,3,5] |
| 4 | 6 | [1,3,5,6] |
| 5 | 2 | [1,3,5,6,2] |
| 6 | 4 | [1,3,5,6,2,4] |

The algorithm recurses depth‑first, appending each node before its children, yielding the final preorder list.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — recursion stack |

---

## 6. Follow-Up Questions

1. How would you implement an **iterative** preorder traversal using a stack?
2. How does the algorithm change for **postorder** traversal of an N‑ary tree?
3. Can you modify the solution to handle **large trees** without recursion depth issues?

---

## 7. Key Takeaway

> **Preorder = root first, then children.** Append node value before recursing into children.
