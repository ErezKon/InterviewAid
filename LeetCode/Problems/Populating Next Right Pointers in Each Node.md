# 116. Populating Next Right Pointers in Each Node

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Snowflake, Walmart Labs

---

## 1. Problem Description

Given a **perfect** binary tree, populate each `next` pointer to point to its next right node. If no next right node, set to null.

---

## 2. Approach: Level-by-Level — O(n), O(1) space ✅

```
FUNCTION connect(root):
    IF root == null: RETURN null
    leftmost = root

    WHILE leftmost.left:
        node = leftmost
        WHILE node:
            node.left.next = node.right
            IF node.next:
                node.right.next = node.next.left
            node = node.next
        leftmost = leftmost.left

    RETURN root
```

Uses the previously established `next` pointers to traverse each level. O(1) extra space.

---

## Follow-Up: Non-perfect tree (#117)?

Can't assume left child exists. Use a dummy node at each level to thread the next-level connections.

---

## Key Takeaway

> Use the `next` pointers from the current level to establish connections on the next level — no queue needed for a perfect binary tree.
