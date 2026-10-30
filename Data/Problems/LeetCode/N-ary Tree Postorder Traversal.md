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

Given the `root` of an n-ary tree, return *the postorder traversal of its nodes' values*.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples).

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `0 <= Node.val <= 10^4`
- The height of the n-ary tree is less than or equal to `1000`.

**Follow up:** Recursive solution is trivial, could you do it iteratively?

---

## 2. Examples

```
Example 1:
  Input: root = [1,null,3,2,4,null,5,6]
  Output: [5,6,3,2,4,1]
  Explanation: Tree: 1 has children 3,2,4; node 3 has children 5,6. Postorder visits children before the node itself.
```

```
Example 2:
  Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]
```

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
