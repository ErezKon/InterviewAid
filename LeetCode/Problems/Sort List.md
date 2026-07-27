# 148. Sort List

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/sort-list](https://leetcode.com/problems/sort-list)
**Companies:** Amazon, Bloomberg, Bytedance, Google, Lyft, Meta, Microsoft, Oracle, Tiktok

---

## 1. Problem Description

Given the head of a linked list, sort it in **ascending order** in O(n log n) time and O(1) space.

---

## 2. Approach: Merge Sort — O(n log n) ✅

```
FUNCTION sortList(head):
    IF head == null OR head.next == null:
        RETURN head

    // Split into two halves
    mid = getMid(head)
    right = mid.next
    mid.next = null

    left = sortList(head)
    right = sortList(right)
    RETURN merge(left, right)

FUNCTION getMid(head):
    slow = head
    fast = head.next
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next
    RETURN slow

FUNCTION merge(l1, l2):
    dummy = new ListNode(0)
    curr = dummy
    WHILE l1 AND l2:
        IF l1.val <= l2.val:
            curr.next = l1; l1 = l1.next
        ELSE:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    curr.next = l1 IF l1 ELSE l2
    RETURN dummy.next
```

| Time | Space |
|------|-------|
| O(n log n) | O(log n) stack |

For O(1) space: bottom-up merge sort (iterative, merge sublists of size 1, 2, 4, ...).

---

## Key Takeaway

> Merge sort is the natural choice for linked lists — no random access needed, and splitting at the middle is O(n) with slow/fast pointers. The merge step reuses existing nodes (no allocation).
