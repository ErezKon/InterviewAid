# 237. Delete Node in a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-linked-list](https://leetcode.com/problems/delete-node-in-a-linked-list)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle

---

## Problem Description

Delete a node from a singly linked list given only access to that node (not the head).

---

## Approach

```
FUNCTION deleteNode(node):
    node.val = node.next.val
    node.next = node.next.next
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Key Takeaway

> **Without access to the previous node, copy the next node's value into the current node and skip the next node. Effectively "becomes" the next node. O(1) trick.**
