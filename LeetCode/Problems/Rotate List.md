# 61. Rotate List

**Difficulty:** 🟡 Medium
**Acceptance:** 38.0%
**LeetCode:** [https://leetcode.com/problems/rotate-list](https://leetcode.com/problems/rotate-list)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft, Nvidia, Oracle

---

## 1. Problem Description

Given the head of a linked list, rotate the list to the right by `k` places.

---

## 2. Approach: Make Circular, Break — O(n) ✅

```
FUNCTION rotateRight(head, k):
    IF head == null OR k == 0: RETURN head

    // Find length and tail
    length = 1
    tail = head
    WHILE tail.next:
        tail = tail.next
        length += 1

    k = k % length
    IF k == 0: RETURN head

    // Make circular
    tail.next = head

    // Find new tail: (length - k - 1) steps from head
    newTail = head
    FOR i ← 0 TO length - k - 2:
        newTail = newTail.next

    newHead = newTail.next
    newTail.next = null

    RETURN newHead
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Connect tail to head (circular), then break at position `n - k`. Don't forget `k = k % n` to handle k > length.
