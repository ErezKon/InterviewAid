# 430. Flatten a Multilevel Doubly Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Flatten a multilevel doubly linked list where each node may have a `child` pointer to another doubly linked list. All child lists should be inserted into the main list at the position of their parent node, preserving the original order. Return the head of the flattened list.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `1↔2↔3` with `2.child = 4↔5` | `1↔2↔4↔5↔3` | The child list `4↔5` is spliced between `2` and `3`. |
| `1` with `1.child = 2` and `2.child = 3` | `1↔2↔3` | Nested children are flattened recursively/iteratively. |

---

## 3. Approach

Iteratively traverse the list. When a node has a `child`, locate the tail of the child list, splice the child list between the current node and its `next`, and clear the `child` pointer. Continue until the end of the list.

```text
FUNCTION flatten(head):
    curr ← head
    WHILE curr IS NOT NULL:
        IF curr.child IS NOT NULL:
            // Find tail of child list
            tail ← curr.child
            WHILE tail.next IS NOT NULL:
                tail ← tail.next
            // Connect tail to curr.next
            tail.next ← curr.next
            IF curr.next IS NOT NULL:
                curr.next.prev ← tail
            // Connect curr to child list
            curr.next ← curr.child
            curr.child.prev ← curr
            // Remove child pointer
            curr.child ← NULL
        END IF
        curr ← curr.next
    END WHILE
    RETURN head
```

---

## 4. Walkthrough

Consider the list `1↔2↔3` where `2.child = 4↔5`.

| Step | Current Node | Action |
|------|--------------|--------|
| 1 | 1 | No child, move to next. |
| 2 | 2 | Child exists. Find tail (`5`). Splice `4↔5` between `2` and `3`. |
| 3 | 4 | No child, move forward. |
| 4 | 5 | No child, move forward. |
| 5 | 3 | No child, end traversal. |

Resulting list: `1↔2↔4↔5↔3`.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) – each node visited a constant number of times |
| **Space** | O(1) – in‑place modifications only |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to flatten the list in **reverse order** (children inserted after the parent’s next node)?
2. Can you flatten the list using **recursion** while still achieving O(n) time?
3. How would you handle **circular doubly linked lists**?

---

## 7. Key Takeaway

> Inline child lists by splicing them between the current node and its next pointer. An iterative traversal achieves O(n) time and O(1) extra space.
