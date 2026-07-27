# 2095. Delete the Middle Node of a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Tcs

---

## Problem Description

Delete the middle node of a linked list (`⌊n/2⌋`-th node, 0-indexed).

---

## Approach

```
FUNCTION deleteMiddle(head):
    IF head.next == null: RETURN null
    slow = head; fast = head.next.next
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next
    slow.next = slow.next.next
    RETURN head
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Slow/fast pointer trick: start fast one step ahead so slow lands one node before the middle. Then `slow.next = slow.next.next` to delete.**
