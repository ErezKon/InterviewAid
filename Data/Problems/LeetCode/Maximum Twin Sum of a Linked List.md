# 2130. Maximum Twin Sum of a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Microsoft

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

In a linked list of even length `n`, the **twin** of the `i`th node (0-indexed) is the `(n - 1 - i)`th node. The **twin sum** is the sum of a node and its twin. Return the **maximum twin sum** of the linked list.

**Constraints:**
- Number of nodes is even and in range `[2, 10⁵]`
- `1 ≤ Node.val ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  5 → 4 → 2 → 1
Output: 6
Explanation: Twins are (5,1) and (4,2). Sums: 6, 6. Max = 6.
```

**Example 2:**
```
Input:  4 → 2 → 2 → 3
Output: 7
Explanation: Twins are (4,3) and (2,2). Sums: 7, 4. Max = 7.
```

---

## Key Insight

> The twin of node `i` is node `n-1-i` — mirrored pairs from opposite ends. By reversing the second half, we can walk both halves in parallel and sum corresponding pairs.

This is the same three-step pattern as **Palindrome Linked List** (LeetCode #234).

---

## Approach

1. **Find the middle** using slow/fast pointers.
2. **Reverse the second half** in-place.
3. **Walk both halves**, summing pairs and tracking the maximum.

```
FUNCTION maxTwinSum(head):
    // ——— Step 1: Find middle ———
    slow ← head
    fast ← head
    WHILE fast AND fast.next DO
        slow ← slow.next
        fast ← fast.next.next

    // ——— Step 2: Reverse second half ———
    prev ← NULL
    curr ← slow
    WHILE curr DO
        next ← curr.next
        curr.next ← prev
        prev ← curr
        curr ← next

    // ——— Step 3: Walk and compute max twin sum ———
    maxSum ← 0
    first ← head
    second ← prev
    WHILE second DO
        maxSum ← MAX(maxSum, first.val + second.val)
        first ← first.next
        second ← second.next

    RETURN maxSum
```

---

## Walkthrough

```
List: 5 → 4 → 2 → 1

Step 1 – Find middle:
  slow → 2, fast → null  →  middle at node 2

Step 2 – Reverse second half (2 → 1  becomes  1 → 2):
  prev = 1 → 2 → null

Step 3 – Walk both halves:
  first=5, second=1  →  sum=6,  maxSum=6
  first=4, second=2  →  sum=6,  maxSum=6

Return 6 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Reverse second half | **O(n)** | **O(1)** |
| Using a stack / array | O(n) | O(n) |

---

## Follow-Up Questions

1. **Can you solve it without modifying the list?** Yes — push first-half values onto a stack, then pop while walking the second half. Costs O(n/2) space.
2. **What if the list has odd length?** The middle node has no twin; skip it when computing sums.
3. **How does this relate to Palindrome Linked List?** Same decomposition (find mid → reverse → compare). Only the comparison step differs (sum vs equality).
4. **Can you do it with recursion?** Yes — recurse to the end, then pair with a pointer advancing from the head. O(n) stack space.

---

## Key Takeaway

> **"Find middle → reverse second half → process pairs"** is a reusable linked-list template that solves twin-sum, palindrome check, and reorder-list problems with O(1) extra space.

---
