# 2095. Delete the Middle Node of a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Tcs

---

## Problem Description

You are given the `head` of a linked list. **Delete** the **middle node**, and return *the* `head` *of the modified linked list*.

The **middle node** of a linked list of size `n` is the `⌊n / 2⌋`<sup>th</sup> node from the **start** using **0-based indexing**, where `⌊x⌋` denotes the largest integer less than or equal to `x`.

- For `n` = `1`, `2`, `3`, `4`, and `5`, the middle nodes are `0`, `1`, `1`, `2`, and `2`, respectively.

**Constraints:**

- The number of nodes in the list is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`

---

## Examples

```
Example 1:
  Input: head = [1,3,4,7,1,2,6]
  Output: [1,3,4,1,2,6]
  Explanation:
  Since n = 7, node 3 with value 7 is the middle node.
  We return the new list after removing this node.
```

```
Example 2:
  Input: head = [1,2,3,4]
  Output: [1,2,4]
  Explanation:
  For n = 4, node 2 with value 3 is the middle node.
```

```
Example 3:
  Input: head = [2,1]
  Output: [2]
  Explanation:
  For n = 2, node 1 with value 1 is the middle node.
  Node 0 with value 2 is the only node remaining after removing node 1.
```

---

## Approach

Use the classic slow-/fast-pointer technique. Advance `fast` two steps and `slow` one step. When `fast` reaches the end, `slow` points to the node **before** the middle node, allowing deletion in O(1) time.

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

1. How would you delete the **k**-th node from the end of the list in one pass?
2. Can you perform the deletion without using a dummy node while handling the single-node edge case?
3. How would the solution change for a doubly linked list?

---

## Key Takeaway

> **Slow/fast pointer trick: start fast one step ahead so slow lands one node before the middle. Then `slow.next = slow.next.next` to delete.**