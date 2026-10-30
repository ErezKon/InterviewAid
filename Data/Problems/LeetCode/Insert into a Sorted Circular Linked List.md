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

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a Circular Linked List node, which is sorted in non-descending order, write a function to insert a value `insertVal` into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list and may not necessarily be the smallest value in the circular list.

If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.

If the list is empty (i.e., the given node is `null`), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the originally given node.

**Constraints:**
- The number of nodes in the list is in the range `[0, 5 * 10^4]`.
- `-10^6 <= Node.val, insertVal <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: head = [3,4,1], insertVal = 2
Output: [3,4,1,2]
Explanation: In the figure above, there is a sorted circular list of three elements. You are given a reference to the node with value 3, and we need to insert 2 into the list. The new node should be inserted between node 1 and node 3. After the insertion, the list should look like this, and we should still return node 3.
```

**Example 2:**
```
Input: head = [], insertVal = 1
Output: [1]
Explanation: The list is empty (given head is null). We create a new single circular list and return the reference to that single node.
```

**Example 3:**
```
Input: head = [1], insertVal = 0
Output: [1,0]
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
