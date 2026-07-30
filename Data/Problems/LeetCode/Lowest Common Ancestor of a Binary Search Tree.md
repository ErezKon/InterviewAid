# 235. Lowest Common Ancestor of a Binary Search Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree)
**Companies:** Amazon, Apple, Bloomberg, Capgemini, Google, Linkedin, Meta, Microsoft, Twitter, Yandex

---

## 1. Problem Description

Given a binary search tree (BST) and two nodes `p` and `q`, find the lowest common ancestor (LCA) of `p` and `q`.

---

## Examples

**Example 1:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: Node with value 6
Explanation: The LCA of nodes 2 and 8 is 6.
```

**Example 2:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: Node with value 2
Explanation: Node 2 is an ancestor of itself and node 4, so it is the LCA.
```

---

## 2. Approach: BST Property — O(h) ✅

```text
FUNCTION lowestCommonAncestor(root, p, q):
    WHILE root IS NOT null:
        // Both nodes lie in left subtree
        IF p.val < root.val AND q.val < root.val:
            root ← root.left
        // Both nodes lie in right subtree
        ELSE IF p.val > root.val AND q.val > root.val:
            root ← root.right
        // Split point found
        ELSE:
            RETURN root
    RETURN null
```

---

## Walkthrough

Consider Example 1. Starting at root 6:
- `p.val` (2) and `q.val` (8) are on opposite sides of 6 → split point → LCA = 6.
If we search for nodes 2 and 4:
- At root 6, both values < 6 → move left to node 2.
- At node 2, `p.val` = 2 (equal) and `q.val` = 4 > 2 → split point → LCA = 2.
The algorithm stops as soon as the split point is found.

---

## Complexity Analysis

- **Time:** O(h) – only traverses from root to the split point, where *h* is tree height.
- **Space:** O(1) – iterative solution uses constant extra space.

---

## Follow-Up

### LCA in a Binary Tree (LeetCode #236)?

Without BST property, use recursion: if either subtree returns non‑null, that's where `p` or `q` is found. If both return non‑null, current node is the LCA.

---

## Key Takeaway

> Exploit BST ordering to navigate directly to the LCA. No need for the general tree recursive approach.
