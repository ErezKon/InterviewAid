# 430. Flatten a Multilevel Doubly Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Iterative Flattening — O(n) ✅](#3-approach-iterative-flattening--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Flatten a multilevel doubly linked list where nodes may have a `child` pointer to another doubly linked list. All children should be inlined at their parent's position.

---

## 2. Key Insight

> When a node has a child, find the tail of the child list, splice it between the current node and its next, then clear the child pointer. Continue traversal.

---

## 3. Approach: Iterative Flattening — O(n) ✅

```
FUNCTION flatten(head):
    curr = head
    WHILE curr:
        IF curr.child:
            // Find tail of child list
            tail = curr.child
            WHILE tail.next: tail = tail.next

            // Insert child list between curr and curr.next
            tail.next = curr.next
            IF curr.next: curr.next.prev = tail
            curr.next = curr.child
            curr.child.prev = curr
            curr.child = null

        curr = curr.next
    RETURN head
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Inline child lists** by splicing them between the current node and its next. Iterative approach runs in O(n) time and O(1) space.
