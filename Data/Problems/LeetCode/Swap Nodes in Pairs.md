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

```text
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

```text
FUNCTION swapPairs(head):
    IF head == null OR head.next == null:
        RETURN head
    second = head.next
    head.next = swapPairs(second.next)
    second.next = head
    RETURN second
```

---

## Examples

| Input List | Output List |
|------------|-------------|
| 1 → 2 → 3 → 4 | 2 → 1 → 4 → 3 |
| 5 → 6 → 7 | 6 → 5 → 7 |
| null | null |

*Explanation:* Nodes are swapped in pairs; if an odd node remains, it stays at the end.

---

## Walkthrough

**Example:** 1 → 2 → 3 → 4

1. Create dummy → 0 → 1 → 2 → 3 → 4, `prev` points to dummy.
2. `first` = 1, `second` = 2.
3. Rewire: `first.next` = 3, `second.next` = 1, `prev.next` = 2.
4. List now: 0 → 2 → 1 → 3 → 4, move `prev` to `first` (node 1).
5. Next pair: `first` = 3, `second` = 4. Perform same swaps.
6. Final list (skip dummy): 2 → 1 → 4 → 3.

---

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** Iterative O(1); Recursive O(n) call stack.

---

## Follow-Up Questions

1. How would you extend this to swap nodes in groups of *k*? (LeetCode 25 – Reverse Nodes in k‑Group)
2. Can you solve it in‑place without a dummy node?
3. How would you handle a doubly linked list version?

---

## Key Takeaway

> Special case of Reverse Nodes in k‑Group (k=2). The iterative approach with a dummy node is clean and efficient.
