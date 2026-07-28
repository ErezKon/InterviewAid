# 897. Increasing Order Search Tree

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google
---

## Problem Description

Given the root of a binary search tree (BST), rearrange the tree so that it becomes an increasing order search tree where the left child of every node is null and the right child points to the next node in the in-order traversal order.

## Examples

**Example 1:**
```
Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
```

**Example 2:**
```
Input: root = [5,1,7]
Output: [1,null,5,null,7]
```

## Approach

**Algorithm:** In-order traversal with re-linking — O(n) time.

**Key Insight:** In-order traversal of a BST yields nodes in ascending order. While traversing, detach each node’s left child and attach it as the right child of the previously visited node.

```text
FUNCTION increasingBST(root):
    SET dummy ← TreeNode(0)
    SET curr ← dummy
    FUNCTION inorder(node):
        IF node IS NULL: RETURN
        inorder(node.left)
        // detach left child
        node.left ← NULL
        // link to previous node
        curr.right ← node
        SET curr ← node
        inorder(node.right)
    inorder(root)
    RETURN dummy.right
```

## Walkthrough

| Step | Action | Tree Structure |
|------|--------|----------------|
| 1 | Start inorder at root 5, go left to 3, then left to 2, then left to 1 | Visiting 1 first |
| 2 | Detach 1, link as right of dummy → 1 | dummy → 1 |
| 3 | Return up to 2, detach left, link after 1 | 1 → 2 |
| 4 | Continue similarly for 3,4,5,6,7,8,9 | 1 → 2 → 3 → … → 9 |

## Complexity Analysis

- **Time:** O(n) where n is the number of nodes (each visited once).
- **Space:** O(h) recursion stack, h = height of tree (O(n) worst case, O(log n) for balanced).

## Follow-Up Questions

- How would you implement this iteratively without recursion?
- Can you modify the algorithm to return the head of the new tree without using a dummy node?
- What changes are needed if the tree is not a BST?

## Key Takeaway

> Perform an in-order traversal, detach left children, and rewire nodes as a right‑child chain to obtain an increasing order search tree.
