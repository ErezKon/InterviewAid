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

Given the head of a linked list, between every pair of adjacent nodes insert a new node whose value is the **greatest common divisor (GCD)** of the two adjacent values. Return the modified linked list.

**Constraints:**
- The number of nodes is in `[1, 5000]`.
- `1 <= Node.val <= 1000`

---

## 2. Examples

**Example 1:**
```
Input:  18 → 6 → 10 → 3
Output: 18 → 6 → 6 → 2 → 10 → 1 → 3

GCD(18,6)=6, GCD(6,10)=2, GCD(10,3)=1
```

**Example 2:**
```
Input:  7
Output: 7   (single node, nothing to insert)
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
