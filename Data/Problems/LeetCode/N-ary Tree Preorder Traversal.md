# 589. N-ary Tree Preorder Traversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-ary-tree-preorder-traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal)

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

Given the `root` of an n-ary tree, return *the preorder traversal of its nodes' values*.

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
  Output: [1,3,5,6,2,4]
  Explanation: Node 1 has children 3,2,4; node 3 has children 5,6. Preorder visits the root first, then each child recursively.
```

```
Example 2:
  Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]
```

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
