# 449. Serialize and Deserialize BST

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-bst](https://leetcode.com/problems/serialize-and-deserialize-bst)
**Companies:** Amazon, Google, Microsoft, Shopee

---

## Problem Description

Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a **binary search tree**. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

**The encoded string should be as compact as possible.**

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `0 <= Node.val <= 10^4`
- The input tree is **guaranteed** to be a binary search tree.

---

## Examples

```
Example 1:
  Input: root = [2,1,3]
  Output: [2,1,3]
  (e.g., serialized preorder string "2,1,3" deserializes back to the same BST)
```

```
Example 2:
  Input: root = []
  Output: []
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
