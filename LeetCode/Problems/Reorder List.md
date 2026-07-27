# 143. Reorder List

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/reorder-list](https://leetcode.com/problems/reorder-list)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Snapchat, Tcs, Tiktok

---

## 1. Problem Description

Given a linked list `L₀ → L₁ → ... → Lₙ₋₁ → Lₙ`, reorder it to `L₀ → Lₙ → L₁ → Lₙ₋₁ → L₂ → Lₙ₋₂ → ...`

---

## 2. Approach: Split + Reverse + Merge — O(n) ✅

Three steps:
1. Find the middle using slow/fast pointers.
2. Reverse the second half.
3. Merge the two halves alternately.

```
FUNCTION reorderList(head):
    IF head == null: RETURN

    // Step 1: Find middle
    slow = head, fast = head
    WHILE fast.next AND fast.next.next:
        slow = slow.next
        fast = fast.next.next

    // Step 2: Reverse second half
    second = slow.next
    slow.next = null
    prev = null
    WHILE second:
        next = second.next
        second.next = prev
        prev = second
        second = next
    second = prev

    // Step 3: Merge alternately
    first = head
    WHILE second:
        tmp1 = first.next
        tmp2 = second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Combines three fundamental linked list operations: **find middle** (slow/fast), **reverse** (iterative), and **merge** (interleave). Each is O(n), O(1) space.
