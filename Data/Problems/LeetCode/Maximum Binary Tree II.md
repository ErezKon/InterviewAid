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

A **maximum tree** is a tree where every node has a value greater than any other value in its subtree.

You are given the `root` of a maximum binary tree and an integer `val`.

Just as in the previous problem, the given tree was constructed from a list `a` (`root = Construct(a)`) recursively with the following `Construct(a)` routine:

- If `a` is empty, return `null`.
- Otherwise, let `a[i]` be the largest element of `a`. Create a `root` node with the value `a[i]`.
- The left child of `root` will be `Construct([a[0], a[1], ..., a[i - 1]])`.
- The right child of `root` will be `Construct([a[i + 1], a[i + 2], ..., a[a.length - 1]])`.
- Return `root`.

Note that we were not given `a` directly, only a root node `root = Construct(a)`.

Suppose `b` is a copy of `a` with the value `val` appended to it. It is guaranteed that `b` has unique values.

Return `Construct(b)`.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 100]`.
- `1 <= Node.val <= 100`
- All the values of the tree are **unique**.
- `1 <= val <= 100`

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
Output: [5,4,null,1,3,null,null,2]
Explanation: a = [1,4,2,3], b = [1,4,2,3,5]
```

**Example 2:**
```
Input: root = [5,2,4,null,1], val = 3
Output: [5,2,4,null,1,null,3]
Explanation: a = [2,1,5,4], b = [2,1,5,4,3]
```

**Example 3:**
```
Input: root = [5,2,3,null,1], val = 4
Output: [5,2,4,null,1,3]
Explanation: a = [2,1,5,3], b = [2,1,5,3,4]
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
