# 25. Reverse Nodes in k-Group

**Difficulty:** 🔴 Hard
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/reverse-nodes-in-k-group](https://leetcode.com/problems/reverse-nodes-in-k-group)
**Companies:** Adobe, Amazon, Apple, Arista Networks, Autodesk, Bloomberg, Buyhatke, Cadence, Cisco, Goldman Sachs, Google, Infosys, Josh Technology, Mathworks, Meta, Microsoft, Oracle, Qualcomm, Salesforce, Sigmoid, Tiktok, Uber, Visa, Walmart Labs, Zeta, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Iterative Group Reversal — O(n) ✅](#3-approach-iterative-group-reversal--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given the head of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.

`k` is a positive integer ≤ the length of the list. If the number of nodes is not a multiple of `k`, then the remaining nodes at the end should stay as-is.

You may not alter the values; only the nodes themselves may be changed.

---

## 2. Examples

```
Example 1:
  Input:  head = [1,2,3,4,5], k = 2
  Output: [2,1,4,3,5]

Example 2:
  Input:  head = [1,2,3,4,5], k = 3
  Output: [3,2,1,4,5]
```

---

## 3. Approach: Iterative Group Reversal — O(n) ✅

### Algorithm

1. Check if there are at least `k` nodes remaining.
2. If yes, reverse those `k` nodes.
3. Connect the reversed group to the previous group.
4. Repeat.

```
FUNCTION reverseKGroup(head, k):
    dummy = new ListNode(0)
    dummy.next = head
    prevGroupEnd = dummy

    WHILE true:
        // Check if k nodes remain
        kth = prevGroupEnd
        FOR i ← 0 TO k - 1:
            kth = kth.next
            IF kth == null:
                RETURN dummy.next    // fewer than k nodes left

        nextGroupStart = kth.next

        // Reverse k nodes: prevGroupEnd.next to kth
        prev = nextGroupStart
        curr = prevGroupEnd.next
        FOR i ← 0 TO k - 1:
            next = curr.next
            curr.next = prev
            prev = curr
            curr = next

        // Connect: prevGroupEnd → new head (kth), old head → nextGroupStart
        temp = prevGroupEnd.next     // old head of this group (now tail)
        prevGroupEnd.next = kth      // connect to new head
        prevGroupEnd = temp          // move to end of reversed group

    RETURN dummy.next
```

---

## 4. Walkthrough

```
head = [1,2,3,4,5], k = 2
dummy → 1 → 2 → 3 → 4 → 5

Group 1: reverse [1,2] → [2,1]
  dummy → 2 → 1 → 3 → 4 → 5
  prevGroupEnd = node(1)

Group 2: reverse [3,4] → [4,3]
  dummy → 2 → 1 → 4 → 3 → 5
  prevGroupEnd = node(3)

Group 3: only 1 node [5], k=2 → stop

Result: [2,1,4,3,5] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each node visited twice (once to count, once to reverse) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 What if we should reverse the last group even if < k nodes?

Remove the length check. Always reverse whatever remains.

### 6.2 Reverse Linked List II (LeetCode #92)?

Reverse nodes from position `left` to `right`. Same reversal technique but only for one subgroup at a specific position.

### 6.3 Swap Nodes in Pairs (LeetCode #24)?

Special case of k = 2. Simpler recursive or iterative solution.

### 6.4 Recursive approach?

```
FUNCTION reverseKGroup(head, k):
    // Check if k nodes exist
    node = head
    FOR i ← 0 TO k - 1:
        IF node == null: RETURN head
        node = node.next

    // Reverse first k nodes
    newHead = reverse(head, k)

    // Recurse for remaining list
    head.next = reverseKGroup(node, k)

    RETURN newHead
```

Uses O(n/k) stack space.

---

## Key Takeaway

> The pattern is: **check group → reverse group → reconnect → advance**. A dummy node simplifies the head connection. The iterative approach is preferred for O(1) space.
