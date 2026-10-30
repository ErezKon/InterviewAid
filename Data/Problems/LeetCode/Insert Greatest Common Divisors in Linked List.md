# 2807. Insert Greatest Common Divisors in Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Single Pass — O(n) ✅](#4-approach-single-pass--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given the head of a linked list `head`, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the **greatest common divisor** of them.

Return *the linked list after insertion*.

The **greatest common divisor** of two numbers is the largest positive integer that evenly divides both numbers.

**Constraints:**
- The number of nodes in the list is in the range `[1, 5000]`.
- `1 <= Node.val <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1^st diagram denotes the initial linked list and the 2^nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1^st and the 2^nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2^nd and the 3^rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3^rd and the 4^th nodes.
There are no more adjacent nodes, so we return the linked list.
```

**Example 2:**
```
Input: head = [7]
Output: [7]
Explanation: The 1^st diagram denotes the initial linked list and the 2^nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
```

---

## 3. Key Insight

Iterate through the list, and for every pair `(curr, curr.next)`, create a new node with `GCD(curr.val, curr.next.val)` and splice it in between. Advance past the newly inserted node to continue with the original next pair.

---

## 4. Approach: Single Pass — O(n) ✅

```
FUNCTION insertGreatestCommonDivisors(head):
    curr = head
    WHILE curr.next:
        g = GCD(curr.val, curr.next.val)
        newNode = ListNode(g, curr.next)
        curr.next = newNode
        curr = newNode.next
    RETURN head
```

---

## 5. Walkthrough

```
Input: 18 → 6 → 10 → 3
```

| Step | curr | curr.next | GCD | After insertion |
|------|------|-----------|-----|-----------------|
| 1 | 18 | 6 | 6 | 18 → **6** → 6 → 10 → 3 |
| 2 | 6 | 10 | 2 | 18 → 6 → 6 → **2** → 10 → 3 |
| 3 | 10 | 3 | 1 | 18 → 6 → 6 → 2 → 10 → **1** → 3 |
| 4 | 3 | null | — | Done |

**Result:** `18 → 6 → 6 → 2 → 10 → 1 → 3` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n · log(max_val)) | One pass; GCD computation is O(log(max_val)) per pair |
| Space | O(1) | New nodes are required by output (no auxiliary space) |

---

## 7. Follow-Up Questions

### 7.1 What if the list is doubly linked?

Same approach, but also set `newNode.prev = curr` and `curr.next.prev = newNode`.

### 7.2 What if we insert LCM instead of GCD?

Replace `GCD(a, b)` with `a * b / GCD(a, b)`. Watch for integer overflow with large values.

### 7.3 Can this be done recursively?

Yes — process `head` and `head.next`, insert the GCD node, then recurse on `head.next` (original). Base case: single node.

---

## 8. Key Takeaway

> A straightforward linked list traversal problem: iterate pairs, compute GCD, splice in a new node, and skip past it. The key is advancing `curr` to `newNode.next` (not `curr.next`) to avoid processing the inserted node again.
