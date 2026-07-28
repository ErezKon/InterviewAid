# 1650. Lowest Common Ancestor of a Binary Tree III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii)
**Companies:** Amazon, Apple, Atlassian, Google, Linkedin, Meta, Microsoft, Mongodb, Wix, Yandex

---

## 1. Problem Description

Find the lowest common ancestor (LCA) of two nodes in a binary tree where each node has a pointer to its parent.

---

## Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = node with value 5, q = node with value 4
Output: Node with value 5
Explanation: Node 5 is an ancestor of itself and node 4, so it is the LCA.
```

**Example 2:**
```
Input: root = [1,2,3], p = node with value 2, q = node with value 3
Output: Node with value 1
Explanation: The paths to the root intersect at the root node.
```

---

## 2. Approach: Two Pointers (like Linked List Intersection) — O(h) ✅

```text
FUNCTION lowestCommonAncestor(p, q):
    SET a ← p
    SET b ← q
    WHILE a != b:
        // When reaching the root, switch to the other node's start
        SET a ← a.parent IF a ELSE q
        SET b ← b.parent IF b ELSE p
    RETURN a
```

---

## Walkthrough

Consider Example 1. The parent chains are:
- Chain from node 5: 5 → 3 → null
- Chain from node 4: 4 → 2 → 5 → 3 → null
The two‑pointer technique moves each pointer up one level per iteration, switching to the other start when reaching null. After several steps both pointers meet at node 5, the LCA.

---

## Complexity Analysis

- **Time:** O(h) – each pointer climbs at most the height of the tree.
- **Space:** O(1) – only a constant number of pointers are used.

---

## Follow-Up Questions

1. How would you solve the problem if parent pointers were not available?
2. Can you extend this approach to find the LCA in a directed acyclic graph?
3. What is the runtime when the tree is highly unbalanced (height ≈ n)?

---

## Key Takeaway

> With parent pointers, paths to root form two "linked lists". Use the intersection technique: when one reaches null, redirect to the other's start. They meet at LCA.
