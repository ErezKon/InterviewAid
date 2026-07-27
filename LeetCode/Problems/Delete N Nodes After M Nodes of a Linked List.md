# 1474. Delete N Nodes After M Nodes of a Linked List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list](https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list)
**Companies:** Microsoft

---

## Problem Description

Keep `m` nodes, then delete the next `n` nodes, and repeat through the linked list.

---

## Approach

```
FUNCTION deleteNodes(head, m, n):
    curr = head
    WHILE curr:
        // Keep m nodes
        FOR i ← 1 TO m-1:
            IF NOT curr: RETURN head
            curr = curr.next

        // Delete n nodes
        temp = curr
        FOR i ← 0 TO n-1:
            IF NOT temp.next: BREAK
            temp.next = temp.next.next

        curr = curr.next if curr else null
    RETURN head
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(len) |
| **Space** | O(1) |

---

## Key Takeaway

> **Alternating keep/delete pattern on a linked list: advance `m` nodes to find the cut point, then skip `n` nodes by relinking pointers. Repeat until end.**
