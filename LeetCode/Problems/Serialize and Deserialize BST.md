# 449. Serialize and Deserialize BST

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-bst](https://leetcode.com/problems/serialize-and-deserialize-bst)
**Companies:** Amazon, Google, Microsoft, Shopee

---

## Problem Description

Design serialization/deserialization for a BST. Unlike general binary trees, BST structure can be reconstructed from preorder traversal alone (no null markers needed).

---

## Approach: Preorder + Value Bounds — O(n) ✅

```
FUNCTION serialize(root):
    // Preorder traversal
    result = []
    FUNCTION preorder(node):
        IF node == null: RETURN
        result.ADD(str(node.val))
        preorder(node.left)
        preorder(node.right)
    preorder(root)
    RETURN ','.JOIN(result)

FUNCTION deserialize(data):
    IF data is empty: RETURN null
    values = queue of ints from data
    RETURN build(values, -infinity, infinity)

FUNCTION build(values, lo, hi):
    IF values is empty OR values.FRONT() < lo OR values.FRONT() > hi:
        RETURN null
    val = values.DEQUEUE()
    node = new TreeNode(val)
    node.left = build(values, lo, val)
    node.right = build(values, val, hi)
    RETURN node
```

BST property eliminates need for null markers (unlike general binary tree serialization).
