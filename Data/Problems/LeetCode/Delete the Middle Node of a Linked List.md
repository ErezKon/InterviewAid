# 2095. Delete the Middle Node of a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Tcs

---

## Problem Description

Given the head of a singly linked list, delete the middle node of the list and return the head of the modified list. The middle node is defined as the `⌊n/2⌋`‑th node (0‑indexed) where `n` is the length of the list. If the list contains only one node, return `null`.

---

## Examples

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [1,2,4,5]
Explanation: The list has 5 nodes, the middle node is the 2‑th node (value 3). After deletion the list becomes 1→2→4→5.
```

**Example 2:**
```
Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation: The list has 4 nodes, the middle node is the 1‑th node (value 2). After deletion the list becomes 1→3→4.
```

---

## Approach

Use the classic slow‑/fast‑pointer technique. Advance `fast` two steps and `slow` one step. When `fast` reaches the end, `slow` points to the node **before** the middle node, allowing deletion in O(1) time.

```text
FUNCTION deleteMiddle(head):
    IF head.next IS NULL:
        RETURN NULL
    slow ← head
    fast ← head.next.next   // start fast one step ahead
    WHILE fast IS NOT NULL AND fast.next IS NOT NULL:
        slow ← slow.next
        fast ← fast.next.next
    // slow now points to node before middle
    slow.next ← slow.next.next
    RETURN head
```

---

## Walkthrough

Consider the list `[1,2,3,4,5]`.
| Step | slow (value) | fast (value) |
|------|--------------|--------------|
| Init | 1 | 3 |
| 1st loop | 2 | 5 |
| Exit (fast.next is null) |
| Delete `slow.next` (node 3) |
Resulting list: `1→2→4→5`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – one pass through the list |
| **Space** | O(1) – only a few pointers |

---

## Follow-Up Questions

1. How would you delete the **k**‑th node from the end of the list in one pass?
2. Can you perform the deletion without using a dummy node while handling the single‑node edge case?
3. How would the solution change for a doubly linked list?

---

## Key Takeaway

> **Slow/fast pointer trick: start fast one step ahead so slow lands one node before the middle. Then `slow.next = slow.next.next` to delete.**