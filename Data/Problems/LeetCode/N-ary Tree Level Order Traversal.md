# 429. N-ary Tree Level Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/n-ary-tree-level-order-traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an n-ary tree, return the *level order* traversal of its nodes' values.

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).*

**Constraints:**

- The height of the n-ary tree is less than or equal to `1000`
- The total number of nodes is between `[0, 10^4]`

---

## 2. Examples

```
Example 1:
  Input: root = [1,null,3,2,4,null,5,6]
  Output: [[1],[3,2,4],[5,6]]
  Explanation: Tree: 1 has children 3,2,4; node 3 has children 5,6.
```

```
Example 2:
  Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
```

---

## 3. Key Insight

> Perform a breadth‑first search, processing nodes level by level. Collect values of the current queue, then build the next queue from all children.

---

## 4. Approach: BFS — O(n) ✅

```text
FUNCTION levelOrder(root):
    IF root IS NULL:
        RETURN []
    SET result ← []
    SET queue ← [root]
    WHILE queue IS NOT EMPTY:
        SET levelValues ← []
        SET nextQueue ← []
        FOR node IN queue:
            APPEND node.val TO levelValues
            FOR child IN node.children:
                APPEND child TO nextQueue
        APPEND levelValues TO result
        SET queue ← nextQueue
    RETURN result
```

---

## 5. Walkthrough

Consider the tree `[[1,null],[3,2,4],[5,6]]`.

| Step | queue (nodes) | levelValues | nextQueue |
|------|---------------|------------|-----------|
| 1 | `[1]` | `[1]` | `[3,2,4]` |
| 2 | `[3,2,4]` | `[3,2,4]` | `[5,6]` |
| 3 | `[5,6]` | `[5,6]` | `[]` |

Result after each iteration: `[[1]]`, `[[1],[3,2,4]]`, `[[1],[3,2,4],[5,6]]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each node visited once |
| **Space** | O(w) — width of the tree (max nodes at any level) |

---

## 7. Follow-Up Questions

1. How would you perform a depth‑first traversal to achieve the same result?
2. Can you modify the algorithm to return a zig‑zag (alternating left‑right) level order?
3. How would you handle very deep trees where recursion depth is a concern?

---

## 8. Key Takeaway

> **Level‑by‑level BFS** works for N‑ary trees just like binary trees: use a queue to process each depth, collect node values, and enqueue all children for the next level.
