# 234. Palindrome Linked List

**Difficulty:** 🟢 Easy
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/palindrome-linked-list](https://leetcode.com/problems/palindrome-linked-list)
**Companies:** Amazon, Amd, Bloomberg, Ebay, Google, Infosys, Intel, Ixl, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Sap, Servicenow, Yandex

---

## 1. Problem Description

Given the head of a singly linked list, return `true` if it is a palindrome.

---

## 2. Approach: Reverse Second Half — O(n), O(1) ✅

```
FUNCTION isPalindrome(head):
    // Step 1: Find middle
    slow = head, fast = head
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next

    // Step 2: Reverse second half
    prev = null
    WHILE slow:
        next = slow.next
        slow.next = prev
        prev = slow
        slow = next

    // Step 3: Compare both halves
    left = head, right = prev
    WHILE right:
        IF left.val != right.val: RETURN false
        left = left.next
        right = right.next

    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Combines three fundamental operations: find middle (slow/fast), reverse list (iterative), compare sequences. Optionally restore the list by reversing the second half again.
