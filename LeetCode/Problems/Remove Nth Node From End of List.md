# 19. Remove Nth Node From End of List

**Difficulty:** 🟡 Medium
**Acceptance:** 46.0%
**LeetCode:** [https://leetcode.com/problems/remove-nth-node-from-end-of-list](https://leetcode.com/problems/remove-nth-node-from-end-of-list)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Broadcom, Google, Josh Technology, Meta, Microsoft, Morgan Stanley, Oracle, Qualcomm, Symantec, Tcs, Tiktok, Tinkoff, Walmart Labs, Yandex

---

## 1. Problem Description

Given the head of a linked list, remove the `n`th node from the **end** of the list and return its head.

---

## 2. Approach: Two Pointers — O(L) ✅

Advance `fast` by n nodes. Then advance both `slow` and `fast` until `fast` reaches the end. `slow` is now at the node before the target.

```
FUNCTION removeNthFromEnd(head, n):
    dummy = new ListNode(0, head)
    fast = dummy
    slow = dummy

    // Advance fast by n+1 steps
    FOR i ← 0 TO n:
        fast = fast.next

    // Move both until fast reaches end
    WHILE fast != null:
        fast = fast.next
        slow = slow.next

    // Remove the target node
    slow.next = slow.next.next

    RETURN dummy.next
```

---

## 3. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(L) — one pass |
| **Space** | O(1) |

---

## Key Takeaway

> The **two-pointer gap** technique: maintain a fixed gap of n between two pointers. When the ahead pointer reaches the end, the behind pointer is at the right position. Dummy node handles edge case of removing the head.
