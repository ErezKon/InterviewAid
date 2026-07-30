# 590. N-ary Tree Postorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-ary-tree-postorder-traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal)
**Companies:** Amazon, Bloomberg, Google

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

Return the postorder traversal of an N-ary tree.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,null],[3,2,4],[5,6]]` | `[5,6,3,2,4,1]` | Postorder visits children before the node itself. |
| `[[1,null]]` | `[1]` | Single node tree yields its own value. |

---

## 3. Approach: Recursive DFS — O(n) ✅

```text
FUNCTION postorder(root):
    IF root IS NULL:
        RETURN []
    SET result ← []
    FOR child IN root.children:
        SET childResult ← postorder(child)
        EXTEND result WITH childResult
    APPEND root.val TO result
    RETURN result
```

---

## 4. Walkthrough

Consider the tree `[[1,null],[3,2,4],[5,6]]`.

| Step | node | action |
|------|------|--------|
| 1 | 1 (root) | Recurse into children 3,2,4 |
| 2 | 3 | Recurse into children 5,6 → returns `[5,6]` then append `3` → `[5,6,3]` |
| 3 | 2 | No children → returns `[2]` |
| 4 | 4 | No children → returns `[4]` |
| 5 | Combine results: `[5,6,3] + [2] + [4] + [1]` → `[5,6,3,2,4,1]` |

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each node visited once |
| **Space** | O(n) — recursion stack in worst case |

---

## 6. Follow-Up Questions

1. How would you implement an iterative postorder traversal using a stack?
2. Can you modify the algorithm to return the traversal in reverse order without extra storage?
3. What changes are needed for a binary tree postorder traversal?

---

## 7. Key Takeaway

> **Postorder = children first, then root.** Recursively process all children before appending the node's value.
