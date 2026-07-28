# 998. Maximum Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-binary-tree-ii](https://leetcode.com/problems/maximum-binary-tree-ii)
**Companies:** Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Rightmost Path Insertion — O(n)](#approach-rightmost-path-insertion--on-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a maximum binary tree (constructed from LC 654) and a new value `val` appended to the end of the original array, return the updated maximum binary tree.

---

## Key Insight

> Since `val` is appended to the right, it can only appear on the **rightmost path** of the tree. Walk down the right spine: if `val > node.val`, `val` becomes the new parent and the old subtree becomes the left child. Otherwise, continue right.

---

## Approach: Rightmost Path Insertion — O(n) ✅

```text
FUNCTION insertIntoMaxTree(root, val):
    IF root IS NULL OR val > root.val:
        node ← NEW TreeNode(val)
        node.left ← root
        RETURN node
    root.right ← insertIntoMaxTree(root.right, val)
    RETURN root
```

---

## Examples

**Example 1:**
```
Input: root = [4,1,3,null,null,2], val = 5
Output: [5,4,1,3,null,null,2]
Explanation: 5 becomes the new root, original tree becomes its left subtree.
```

**Example 2:**
```
Input: root = [5,2,4,null,1], val = 3
Output: [5,2,4,3,1]
Explanation: 3 is inserted on the rightmost path under node 4.
```

---

## Walkthrough

Consider the first example where `val = 5`.
| Step | Current Node | Action |
|------|--------------|--------|
| 1 | root (4) | 5 > 4 → create new node 5, set left child = 4 |
| 2 | Done | Return new root 5 |

The resulting tree has 5 as root with the original tree as its left child.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Right spine traversal | **O(h)** worst O(n) | O(h) |

---

## Key Takeaway

> **Appending to a maximum binary tree only affects the rightmost path.** Walk down the right spine and insert where val fits.
