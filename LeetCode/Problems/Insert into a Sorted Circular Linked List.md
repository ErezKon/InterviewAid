# 708. Insert into a Sorted Circular Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list](https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list)
**Companies:** Anduril, Google, Meta, Tiktok

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

Given a node in a **sorted circular linked list**, insert a new value `insertVal` such that the list remains sorted. Return any node from the list. If the list is empty, create a single-node cycle.

**Constraints:**
- `0 <= Number of nodes <= 5 × 10⁴`
- `-10⁶ <= Node.val, insertVal <= 10⁶`

---

## 2. Examples

**Example 1:**
```
Input:  3 → 4 → 1 → (back to 3), insertVal = 2
Output: 3 → 4 → 1 → 2 → (back to 3)
                      ^inserted between 1 and 3
```

**Example 2:**
```
Input:  head = null, insertVal = 1
Output: 1 → (self-loop)
```

---

## 3. Key Insight

There are **three cases** for where to insert:

1. **Normal position** — value fits between two consecutive sorted nodes: `curr.val <= insertVal <= curr.next.val`
2. **Wrap-around** — value is the new max or min, insert at the boundary where `curr.val > curr.next.val`
3. **All same values** — traversed the full loop without finding a spot; insert anywhere

---

## 4. Approach: Single Pass — O(n) ✅

```
FUNCTION insert(head, insertVal):
    node = Node(insertVal)
    IF NOT head: node.next = node; RETURN node

    curr = head
    WHILE true:
        // Case 1: between two sorted nodes
        IF curr.val <= insertVal <= curr.next.val: BREAK
        // Case 2: at the wrap-around point
        IF curr.val > curr.next.val AND (insertVal >= curr.val OR insertVal <= curr.next.val): BREAK
        curr = curr.next
        IF curr == head: BREAK    // full loop, insert anywhere

    node.next = curr.next
    curr.next = node
    RETURN head
```

---

## 5. Walkthrough

```
List: 1 → 3 → 4 → (back to 1), insertVal = 2
```

| Step | curr | curr.next | Check | Result |
|------|------|-----------|-------|--------|
| 1 | 1 | 3 | 1 ≤ 2 ≤ 3? **Yes** | Break — insert between 1 and 3 |

```
After: 1 → 2 → 3 → 4 → (back to 1) ✅
```

**Wrap-around example:** insertVal = 5 in list `1 → 3 → 4`
| Step | curr | curr.next | Check |
|------|------|-----------|-------|
| 1 | 1 | 3 | 1 ≤ 5 ≤ 3? No |
| 2 | 3 | 4 | 3 ≤ 5 ≤ 4? No |
| 3 | 4 | 1 | 4 > 1 (wrap) AND 5 ≥ 4? **Yes** → insert here |

```
After: 1 → 3 → 4 → 5 → (back to 1) ✅
```

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | At most one full traversal of the cycle |
| Space | O(1) | Only the new node is created |

---

## 7. Follow-Up Questions

### 7.1 What if there are duplicate values?

The `<=` comparisons handle duplicates correctly — the value is inserted at any valid position among equals.

### 7.2 What if we need to maintain a doubly-linked circular list?

Also update `prev` pointers: `node.prev = curr`, `curr.next.prev = node`.

### 7.3 How to delete from a sorted circular linked list?

Find the node to delete, then update the predecessor's `next` pointer. Special case: single-node list.

---

## 8. Key Takeaway

> Inserting into a sorted circular linked list requires handling three cases: **normal position** (between sorted neighbors), **wrap-around** (new extreme value at the max→min boundary), and **uniform list** (full loop traversal). A clean single-pass with careful conditionals solves all cases.
