# 114. Flatten Binary Tree to Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/flatten-binary-tree-to-linked-list](https://leetcode.com/problems/flatten-binary-tree-to-linked-list)
**Companies:** Amazon, Anduril, Bloomberg, Google, Josh Technology, Meta, Microsoft, Oracle

---

## 1. Problem Description

Given the root of a binary tree, flatten it to a linked list **in-place** following pre-order traversal. Each node's `right` points to the next node, `left` is null.

---

## 2. Approach: Morris-like — O(n), O(1) space ✅

For each node with a left child: find the rightmost node of the left subtree, attach the current right subtree there, then move the left subtree to the right.

```
FUNCTION flatten(root):
    curr = root
    WHILE curr != null:
        IF curr.left != null:
            // Find rightmost of left subtree
            rightmost = curr.left
            WHILE rightmost.right != null:
                rightmost = rightmost.right

            // Rewire
            rightmost.right = curr.right
            curr.right = curr.left
            curr.left = null

        curr = curr.right
```

---

## 3. Alternative: Reverse Post-order

Process right, then left, then current. Maintain a `prev` pointer.

```
FUNCTION flatten(root):
    prev = null

    FUNCTION dfs(node):
        IF node == null: RETURN
        dfs(node.right)
        dfs(node.left)
        node.right = prev
        node.left = null
        prev = node

    dfs(root)
```

| Approach | Time | Space |
|----------|------|-------|
| Iterative | O(n) | O(1) |
| Recursive | O(n) | O(h) |

---

## Key Takeaway

> The iterative approach uses no extra space by threading the right subtree onto the leftmost path's rightmost node — similar to Morris traversal.
