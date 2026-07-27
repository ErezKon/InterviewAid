# 450. Delete Node in a BST

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-bst](https://leetcode.com/problems/delete-node-in-a-bst)
**Companies:** Amazon, Bloomberg, Bytedance, Flipkart, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Uber

---

## Problem Description

Delete a node with a given key from a BST and return the updated root.

---

## Key Insight

Three cases: (1) leaf → remove, (2) one child → replace with child, (3) two children → replace value with inorder successor (smallest in right subtree), then delete successor.

---

## Approach: Recursive — O(h) ✅

```
FUNCTION deleteNode(root, key):
    IF root == null: RETURN null

    IF key < root.val:
        root.left = deleteNode(root.left, key)
    ELSE IF key > root.val:
        root.right = deleteNode(root.right, key)
    ELSE:
        // Found node to delete
        IF root.left == null: RETURN root.right
        IF root.right == null: RETURN root.left

        // Two children: replace with inorder successor
        successor = findMin(root.right)
        root.val = successor.val
        root.right = deleteNode(root.right, successor.val)

    RETURN root

FUNCTION findMin(node):
    WHILE node.left: node = node.left
    RETURN node
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(h) where h = tree height |
| **Space** | O(h) recursion stack |

---

## Key Takeaway

> **BST deletion has three cases. The two-children case uses the inorder successor (or predecessor) to maintain BST property. Recursive approach naturally handles relinking.**
