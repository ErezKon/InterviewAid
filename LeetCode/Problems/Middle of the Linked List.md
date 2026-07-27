# 876. Middle of the Linked List

**Difficulty:** 🟢 Easy
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/middle-of-the-linked-list](https://leetcode.com/problems/middle-of-the-linked-list)
**Companies:** Accenture, Amazon, Amd, Apple, Bloomberg, Google, Ibm, Intuit, Meta, Microsoft, Nvidia, Qualcomm, Tcs, Walmart Labs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the `head` of a singly linked list, return the **middle** node. If there are two middle nodes (even length), return the **second** middle node.

**Constraints:**
- Number of nodes: `[1, 100]`
- `1 ≤ Node.val ≤ 100`

---

## Examples

**Example 1:**
```
Input:  [1,2,3,4,5]
Output: 3 (node with value 3)
```

**Example 2:**
```
Input:  [1,2,3,4,5,6]
Output: 4 (second middle)
```

---

## Key Insight

> Use **slow/fast pointers**: slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle. For even-length lists, slow naturally lands on the second middle.

---

## Approach: Slow/Fast Pointers — O(n) ✅

```
FUNCTION middleNode(head):
    slow ← head
    fast ← head
    WHILE fast AND fast.next DO
        slow ← slow.next
        fast ← fast.next.next
    RETURN slow    // second middle if even length
```

---

## Walkthrough

```
List: 1 → 2 → 3 → 4 → 5

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=5
fast.next = null → stop

Return slow = 3 ✅

List: 1 → 2 → 3 → 4 → 5 → 6

Step 0: slow=1, fast=1
Step 1: slow=2, fast=3
Step 2: slow=3, fast=5
Step 3: slow=4, fast=null → stop (fast.next was checked)

Return slow = 4 ✅ (second middle)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Slow/fast pointers | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **What if we want the first middle for even length?** Change loop to `WHILE fast.next AND fast.next.next`.
2. **How is this used in merge sort on linked lists?** Finding the middle splits the list in half for recursive sorting.
3. **Can we find the 1/3 or 1/4 point?** Use a slow pointer that moves 1 step and fast that moves 3 or 4 steps.

---

## Key Takeaway

> **Slow/fast pointer** (tortoise and hare) is the canonical O(1) space technique for finding the middle of a linked list — a building block for merge sort, palindrome check, and cycle detection.

---
