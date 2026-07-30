# 1669. Merge In Between Linked Lists

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-in-between-linked-lists](https://leetcode.com/problems/merge-in-between-linked-lists)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Microsoft, Nvidia, Oracle, Paypal, Sambanova, Squarepoint Capital, Tiktok

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

Given two linked lists `list1` and `list2`, and two integers `a` and `b`, remove nodes from position `a` to `b` (inclusive, 0-indexed) in `list1`, and replace them with `list2`.

**Constraints:**
- `3 ≤ list1.length ≤ 10⁴`
- `1 ≤ a ≤ b < list1.length - 1`
- `1 ≤ list2.length ≤ 10⁴`

---

## Examples

**Example 1:**
```
Input:  list1 = [0,1,2,3,4,5], a=3, b=4, list2 = [1000000,1000001,1000002]
Output: [0,1,2,1000000,1000001,1000002,5]
Explanation: Remove nodes 3,4 from list1, splice in list2.
```

---

## Key Insight

> Find the node at position `a-1` (splice start) and the node at position `b+1` (splice end). Connect `prev.next → list2 head` and `list2 tail → node at b+1`.

---

## Approach

```
FUNCTION mergeInBetween(list1, a, b, list2):
    // Find node at position a-1
    prev ← list1
    FOR i ← 0 TO a - 2 DO
        prev ← prev.next

    // Find node at position b+1
    curr ← prev
    FOR i ← 0 TO b - a + 1 DO
        curr ← curr.next

    // Connect prev → list2 → curr
    prev.next ← list2
    tail ← list2
    WHILE tail.next DO
        tail ← tail.next
    tail.next ← curr

    RETURN list1
```

---

## Walkthrough

```
list1: 0 → 1 → 2 → 3 → 4 → 5, a=3, b=4
list2: 1000000 → 1000001 → 1000002

Step 1: prev = node 2 (position a-1 = 2)
Step 2: curr = node 5 (position b+1 = 5)
Step 3: prev.next = list2 head (1000000)
        list2 tail (1000002).next = curr (5)

Result: 0 → 1 → 2 → 1000000 → 1000001 → 1000002 → 5 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two-pointer splice | **O(n + m)** | **O(1)** |

Where `n` = list1 length, `m` = list2 length.

---

## Follow-Up Questions

1. **Why traverse list2 to find its tail?** We need to connect the tail of list2 to the node after position `b`. There's no shortcut without a tail pointer.
2. **What about memory of removed nodes?** In languages with GC, they're collected automatically. In C/C++, you'd need to free them.
3. **Can this be done with a dummy head?** Not necessary since `a ≥ 1`, so the head of list1 is never removed.

---

## Key Takeaway

> **Linked list splicing** — find the boundary nodes, redirect pointers. The pattern is: `prev.next = newList`, `newListTail.next = afterRemoved`.

---
