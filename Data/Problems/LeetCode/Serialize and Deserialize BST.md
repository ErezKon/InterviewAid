# 449. Serialize and Deserialize BST

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-bst](https://leetcode.com/problems/serialize-and-deserialize-bst)
**Companies:** Amazon, Google, Microsoft, Shopee

---

## Problem Description

Design serialization/deserialization for a BST. Unlike general binary trees, BST structure can be reconstructed from preorder traversal alone (no null markers needed).

---

## Examples

**Example 1:**
```
Input: root = [2,1,3]
Serialized: "2,1,3"
Deserialized tree matches the original BST.
```
**Example 2:**
```
Input: root = []
Serialized: ""
Deserialized tree is null.
```

---

## Approach: Preorder + Value Bounds — O(n) ✅

```text
FUNCTION serialize(root):
    // Preorder traversal
    result ← []
    FUNCTION preorder(node):
        IF node == null: RETURN
        result.APPEND(str(node.val))
        preorder(node.left)
        preorder(node.right)
    preorder(root)
    RETURN JOIN(result, ",")

FUNCTION deserialize(data):
    IF data IS EMPTY: RETURN null
    values ← QUEUE of ints from SPLIT(data, ",")
    RETURN build(values, -infinity, infinity)

FUNCTION build(values, lo, hi):
    IF values IS EMPTY OR values.FRONT() < lo OR values.FRONT() > hi:
        RETURN null
    val ← values.DEQUEUE()
    node ← NEW TreeNode(val)
    node.left ← build(values, lo, val)
    node.right ← build(values, val, hi)
    RETURN node
```

BST property eliminates need for null markers (unlike general binary tree serialization).

---

## Walkthrough

Consider the BST `[5,3,6,2,4,null,7]`.

| Step | Action | Queue / Result | Explanation |
|------|--------|----------------|-------------|
| 1 | Serialize preorder | `5,3,2,4,6,7` | Visit root, left subtree, right subtree. |
| 2 | Deserialize start with bounds (-∞, ∞) | val=5 → root | 5 fits bounds, becomes root. |
| 3 | Build left subtree with bounds (-∞,5) | val=3 → left child | 3 fits, becomes left of 5. |
| 4 | Build left of 3 with bounds (-∞,3) | val=2 → left child | 2 fits, becomes left of 3. |
| 5 | Build right of 2 with bounds (2,3) | next val=4 out of bounds → return null. |
| 6 | Continue building right of 3 with bounds (3,5) | val=4 fits → right child of 3. |
| 7 | Build right subtree of 5 with bounds (5,∞) | val=6 fits → right child of 5. |
| 8 | Build right of 6 with bounds (6,∞) | val=7 fits → right child of 6. |

The reconstructed tree matches the original.

---

## Complexity Analysis

- **Time:** O(n) for both serialization and deserialization, where n is the number of nodes.
- **Space:** O(n) for the output string and recursion stack (worst‑case height of the BST).

---

## Follow-Up Questions

1. How would you modify the algorithm for a general binary tree?
2. Can you serialize without using recursion (iterative approach)?
3. How would you handle duplicate values in the BST?

---

## Key Takeaway

A BST can be uniquely reconstructed from its preorder traversal using value bounds, enabling compact serialization without null markers.
