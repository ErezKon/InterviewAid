# 450. Delete Node in a BST

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-bst](https://leetcode.com/problems/delete-node-in-a-bst)
**Companies:** Amazon, Bloomberg, Bytedance, Flipkart, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Uber

---

## Problem Description

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return *the **root node reference** (possibly updated) of the BST*.

Basically, the deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node.

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- Each node has a **unique** value.
- `root` is a valid binary search tree.
- `-10^5 <= key <= 10^5`

**Follow up:** Could you solve it with time complexity `O(height of tree)`?

## Examples

```
Example 1:
  Input: root = [5,3,6,2,4,null,7], key = 3
  Output: [5,4,6,2,null,null,7]
  Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
  One valid answer is [5,4,6,2,null,null,7].
  Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.
```

```
Example 2:
  Input: root = [5,3,6,2,4,null,7], key = 0
  Output: [5,3,6,2,4,null,7]
  Explanation: The tree does not contain a node with value = 0.
```

```
Example 3:
  Input: root = [], key = 0
  Output: []
```

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