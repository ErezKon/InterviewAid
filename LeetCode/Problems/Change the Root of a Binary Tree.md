# 1666. Change the Root of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-the-root-of-a-binary-tree](https://leetcode.com/problems/change-the-root-of-a-binary-tree)
**Companies:** Google

---

## 1. Problem Description

Given a binary tree where each node has a parent pointer, re-root the tree at a given node. Update all parent/child pointers accordingly.

---

## 2. Approach: Walk to Root + Reverse Pointers — O(h) ✅

```
FUNCTION changeRoot(node):
    // Walk from node to current root, reversing parent-child links
    prev = null
    curr = node
    WHILE curr:
        parent = curr.parent
        curr.parent = prev
        // Swap: old parent becomes child
        IF curr.left == prev:
            curr.left = parent
        ELSE:
            curr.right = curr.left
            curr.left = parent
        prev = curr
        curr = parent
    RETURN node
```

| Time | Space |
|------|-------|
| O(h) — height of tree | O(1) |

---

## Key Takeaway

> Re-rooting with parent pointers: walk from new root to old root, reversing parent-child links along the path. Similar to reversing a linked list along the root-to-node path.
