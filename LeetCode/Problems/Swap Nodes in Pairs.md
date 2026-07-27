# 24. Swap Nodes in Pairs

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/swap-nodes-in-pairs](https://leetcode.com/problems/swap-nodes-in-pairs)
**Companies:** Altimetrik, Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft, Oracle, Paypal, Qualcomm, Tcs, Tiktok, Uber, Yandex

---

## 1. Problem Description

Given a linked list, swap every two adjacent nodes and return its head. You must not modify node values — only the nodes themselves.

---

## 2. Approach: Iterative — O(n) ✅

```
FUNCTION swapPairs(head):
    dummy = new ListNode(0, head)
    prev = dummy

    WHILE prev.next AND prev.next.next:
        first = prev.next
        second = first.next

        // Swap
        first.next = second.next
        second.next = first
        prev.next = second

        prev = first     // move to next pair

    RETURN dummy.next
```

---

## 3. Recursive Approach

```
FUNCTION swapPairs(head):
    IF head == null OR head.next == null:
        RETURN head
    second = head.next
    head.next = swapPairs(second.next)
    second.next = head
    RETURN second
```

| Iterative | Recursive |
|-----------|-----------|
| O(n) time, O(1) space | O(n) time, O(n) stack |

---

## Key Takeaway

> Special case of Reverse Nodes in k-Group (k=2). The iterative approach with a dummy node is clean and efficient.
