# 3217. Delete Nodes From Linked List Present in Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Remove all linked list nodes whose values appear in the given array.

---

## Approach

```
FUNCTION modifiedList(nums, head):
    toRemove = SET(nums)
    dummy = ListNode(0, head)
    curr = dummy
    WHILE curr.next:
        IF curr.next.val IN toRemove:
            curr.next = curr.next.next
        ELSE:
            curr = curr.next
    RETURN dummy.next
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) |
| **Space** | O(m) for the set |

---

## Key Takeaway

> **Dummy node + set lookup: iterate with a pointer to the previous node. If `next.val` is in the remove set, skip it. O(1) per deletion with set membership check.**
