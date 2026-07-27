# 328. Odd Even Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/odd-even-linked-list](https://leetcode.com/problems/odd-even-linked-list)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Infosys, Josh Technology, Meesho, Meta, Microsoft, Tcs, Zoho

---

## 1. Problem Description

Given the head of a singly linked list, group all odd-indexed nodes together followed by even-indexed nodes, and return the reordered list. First node is index 1 (odd).

---

## 2. Approach: Two Pointers — O(n), O(1) ✅

```
FUNCTION oddEvenList(head):
    IF head == null: RETURN null

    odd = head
    even = head.next
    evenHead = even

    WHILE even AND even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next

    odd.next = evenHead
    RETURN head
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Maintain two separate chains (odd and even), then connect odd's tail to even's head. Simple pointer manipulation.
