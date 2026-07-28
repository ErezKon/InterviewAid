# 328. Odd Even Linked List

**Difficulty:** 🟡 Medium
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/odd-even-linked-list](https://leetcode.com/problems/odd-even-linked-list)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Infosys, Josh Technology, Meesho, Meta, Microsoft, Tcs, Zoho

---

## 1. Problem Description

Given the head of a singly linked list, group all odd-indexed nodes together followed by even-indexed nodes, and return the reordered list. The first node is considered index 1 (odd).

---

## 2. Examples

| Input List | Output List |
|------------|-------------|
| 1→2→3→4→5 | 1→3→5→2→4 |
| 2→1→3→5→6→4→7 | 2→3→6→7→1→5→4 |

*Explanation*: Nodes are rearranged so that all nodes at odd positions appear first, preserving their original relative order, followed by even‑position nodes.

---

## 3. Approach: Two Pointers — O(n), O(1) ✅

```text
FUNCTION oddEvenList(head):
    IF head == null: RETURN null
    odd ← head               // head of odd‑position chain
    even ← head.next         // head of even‑position chain
    evenHead ← even          // remember start of even chain
    WHILE even != null AND even.next != null:
        odd.next ← even.next
        odd ← odd.next
        even.next ← odd.next
        even ← even.next
    odd.next ← evenHead      // connect odd chain to even chain
    RETURN head
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Walkthrough

Consider the list **1→2→3→4→5**:

| Step | odd pointer | even pointer | List state |
|------|-------------|--------------|------------|
| Init | 1 | 2 | 1→2→3→4→5 |
| 1st iteration | odd.next = 3 → list becomes 1→3→4→5 (odd = 3) | even.next = 4 → even = 4 |
| 2nd iteration | odd.next = 5 → odd = 5 | even.next = null → even = null |
| Exit loop | Connect odd.next (5) to evenHead (2) | Final list: 1→3→5→2→4 |

---

## 5. Complexity Analysis

- **Time:** Each node is visited at most once → **O(n)** where *n* is the number of nodes.
- **Space:** Only a few pointer variables are used → **O(1)** auxiliary space.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to group nodes by **even‑odd** positions instead?
2. Can you solve the problem in a single pass without using a separate `evenHead` pointer?
3. How would you extend this to a **doubly linked list**?

---

## Key Takeaway

> Maintain two separate chains (odd and even), then connect the odd chain’s tail to the even chain’s head. Simple pointer manipulation achieves the reordering in linear time and constant space.
