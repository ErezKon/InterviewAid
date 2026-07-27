# 707. Design Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 29.0%
**LeetCode:** [https://leetcode.com/problems/design-linked-list](https://leetcode.com/problems/design-linked-list)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Design a singly or doubly linked list with: `get(index)`, `addAtHead(val)`, `addAtTail(val)`, `addAtIndex(index, val)`, `deleteAtIndex(index)`.

---

## 2. Approach: Doubly Linked List with Sentinel Nodes ✅

```
CLASS MyLinkedList:
    CONSTRUCTOR:
        head = sentinel node
        tail = sentinel node
        head.next = tail
        tail.prev = head
        size = 0

    FUNCTION get(index):
        IF index < 0 OR index >= size: RETURN -1
        node = getNode(index)
        RETURN node.val

    FUNCTION addAtIndex(index, val):
        IF index < 0 OR index > size: RETURN
        pred = getNode(index - 1)  // or use sentinel
        newNode = Node(val)
        newNode.next = pred.next
        newNode.prev = pred
        pred.next.prev = newNode
        pred.next = newNode
        size += 1

    FUNCTION deleteAtIndex(index):
        IF index < 0 OR index >= size: RETURN
        node = getNode(index)
        node.prev.next = node.next
        node.next.prev = node.prev
        size += 1
```

Sentinel nodes eliminate null checks for head/tail operations.

---

## Key Takeaway

> Sentinel (dummy) head and tail nodes greatly simplify linked list operations by eliminating edge cases for empty lists and boundary operations.
