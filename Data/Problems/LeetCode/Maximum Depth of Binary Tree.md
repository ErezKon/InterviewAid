# 104. Maximum Depth of Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/maximum-depth-of-binary-tree](https://leetcode.com/problems/maximum-depth-of-binary-tree)
**Companies:** Accenture, Amazon, Apple, Arista Networks, Avito, Bloomberg, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Qualcomm, Spotify, Uber, Yahoo

---

## 1. Problem Description

Given the `root` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

---

## 2. Approach: Recursion — O(n) ✅

```text
FUNCTION maxDepth(root):
    IF root = null:
        RETURN 0
    leftDepth ← maxDepth(root.left)
    rightDepth ← maxDepth(root.right)
    RETURN 1 + MAX(leftDepth, rightDepth)
```

Iterative BFS: count levels.

---

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**
```
Input: root = [1,null,2]
Output: 2
```

---

## Walkthrough

Consider the first example tree:
| Node | Left Subtree Depth | Right Subtree Depth | Returned Depth |
|------|-------------------|--------------------|----------------|
| 9    | 0                 | 0                  | 1 |
| 15   | 0                 | 0                  | 1 |
| 7    | 0                 | 0                  | 1 |
| 20   | 1 (from 15)       | 1 (from 7)         | 2 |
| 3    | 1 (from 9)        | 2 (from 20)        | 3 |
The recursion aggregates the maximum depth from leaves up to the root.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Recursion/BFS | O(n) | O(h) where h is tree height |

---

## Follow-Up Questions
- How would you compute the minimum depth of a binary tree?
- Can you solve this iteratively using a stack instead of recursion?
- How does the algorithm change for an N‑ary tree?

---

## Key Takeaway

> Depth = 1 + max(left depth, right depth). The simplest tree recursion problem — a building block for harder tree problems.
