# 1650. Lowest Common Ancestor of a Binary Tree III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii)
**Companies:** Amazon, Apple, Atlassian, Google, Linkedin, Meta, Microsoft, Mongodb, Wix, Yandex

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given two nodes of a binary tree `p` and `q`, return *their lowest common ancestor (LCA)*.

Each node will have a reference to its parent node. The definition for `Node` is below:

```
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
```

According to the **definition of LCA on Wikipedia**: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow **a node to be a descendant of itself**)."

**Constraints:**
- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `p != q`
- `p` and `q` exist in the tree.

---

## Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.
```

**Example 3:**
```
Input: root = [1,2], p = 1, q = 2
Output: 1
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
- Chain from node 5: 5 → 3 → null
- Chain from node 4: 4 → 2 → 5 → 3 → null
The two-pointer technique moves each pointer up one level per iteration, switching to the other start when reaching null. After several steps both pointers meet at node 5, the LCA.

---

## Complexity Analysis

- **Time:** O(h) – each pointer climbs at most the height of the tree.
- **Space:** O(1) – only a constant number of pointers are used.

---

## Follow-Up Questions

1. How would you solve the problem if parent pointers were not available?
2. Can you extend this approach to find the LCA in a directed acyclic graph?
3. What is the runtime when the tree is highly unbalanced (height ≈ n)?

---

## Key Takeaway

> With parent pointers, paths to root form two "linked lists". Use the intersection technique: when one reaches null, redirect to the other's start. They meet at LCA.
