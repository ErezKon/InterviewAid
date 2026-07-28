# 450. Delete Node in a BST

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-bst](https://leetcode.com/problems/delete-node-in-a-bst)
**Companies:** Amazon, Bloomberg, Bytedance, Flipkart, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Uber

---

## Problem Description

Delete a node with a given key from a Binary Search Tree (BST) and return the updated root while preserving BST properties.

## Examples

| Input BST | Key | Output BST |
|-----------|-----|------------|
| `[5,3,6,2,4,null,7]` | `3` | `[5,4,6,2,null,null,7]` |
| `[5,3,6,2,4,null,7]` | `0` | `[5,3,6,2,4,null,7]` |

*Explanation:* Deleting `3` replaces it with its inorder successor `4`. Deleting a non‑existent key leaves the tree unchanged.

## Approach

```
FUNCTION deleteNode(root, key):
    IF root == null: RETURN null
    IF key < root.val:
        root.left = deleteNode(root.left, key)
    ELSE IF key > root.val:
        root.right = deleteNode(root.right, key)
    ELSE:
        // Node to delete found
        IF root.left == null: RETURN root.right
        IF root.right == null: RETURN root.left
        // Two children: replace with inorder successor
        successor = findMin(root.right)
        root.val = successor.val
        root.right = deleteNode(root.right, successor.val)
    RETURN root

FUNCTION findMin(node):
    WHILE node.left != null:
        node = node.left
    RETURN node
```

## Walkthrough

Delete key `3` from `[5,3,6,2,4,null,7]`.
1. Compare `3` with root `5` → go left.
2. Compare `3` with node `3` → match.
3. Node has two children (`2` and `4`). Find inorder successor: smallest in right subtree → `4`.
4. Replace node value with `4`; recursively delete `4` from right subtree (which is a leaf, so removed).
5. Resulting tree `[5,4,6,2,null,null,7]` maintains BST order.

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(h) where h is tree height |
| **Space** | O(h) recursion stack |

## Follow-Up Questions

- How would you implement the deletion iteratively without recursion?
- Can you delete a node in a self‑balancing BST (e.g., AVL or Red‑Black) while preserving balance?
- What changes are needed if the tree allows duplicate values?

---

## Key Takeaway

> **BST deletion handles three cases: leaf, one child, two children (replace with inorder successor). Recursive approach cleanly updates links while preserving BST invariants.**