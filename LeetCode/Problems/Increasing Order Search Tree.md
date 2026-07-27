# 897. Increasing Order Search Tree

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google
---

## 1. Problem Description

Rearrange a BST into an increasing-order tree (right-child-only chain following inorder traversal).

## 2. Approach: Inorder Rewiring — O(n) ✅

```
FUNCTION increasingBST(root):
    dummy = TreeNode(0); curr = dummy
    FUNCTION inorder(node):
        IF NOT node: RETURN
        inorder(node.left)
        node.left = null; curr.right = node; curr = node
        inorder(node.right)
    inorder(root)
    RETURN dummy.right
```

## Key Takeaway

> Inorder traversal, rewire each node as right child of previous. Use dummy head for clean pointer management.
