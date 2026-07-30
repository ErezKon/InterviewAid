# 147. Insertion Sort List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/insertion-sort-list](https://leetcode.com/problems/insertion-sort-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Dummy Head Insertion Sort — O(n²) ✅](#4-approach-dummy-head-insertion-sort--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given the head of a singly linked list, sort it using **insertion sort** and return the sorted list's head.

**Constraints:**
- Number of nodes: `[1, 5000]`
- `-5000 <= Node.val <= 5000`

---

## 2. Examples

```
Input:  4 → 2 → 1 → 3
Output: 1 → 2 → 3 → 4

Input:  -1 → 5 → 3 → 4 → 0
Output: -1 → 0 → 3 → 4 → 5
```

---

## 3. Key Insight

Use a **dummy head** for the sorted portion. For each node in the original list, find its correct insertion position in the sorted list by scanning from the dummy head. This avoids dealing with edge cases of inserting at the beginning.

---

## 4. Approach: Dummy Head Insertion Sort — O(n²) ✅

```
FUNCTION insertionSortList(head):
    dummy = ListNode(0)
    curr = head

    WHILE curr:
        next = curr.next
        // Find insertion point
        prev = dummy
        WHILE prev.next AND prev.next.val < curr.val:
            prev = prev.next
        curr.next = prev.next
        prev.next = curr
        curr = next

    RETURN dummy.next
```

---

## 5. Walkthrough

```
Input: 4 → 2 → 1 → 3
Sorted (dummy → ...):
```

| Step | curr | Sorted List | Action |
|------|------|-------------|--------|
| 1 | 4 | dummy → **4** | Insert 4 after dummy |
| 2 | 2 | dummy → **2** → 4 | 2 < 4, insert before 4 |
| 3 | 1 | dummy → **1** → 2 → 4 | 1 < 2, insert at head |
| 4 | 3 | dummy → 1 → 2 → **3** → 4 | 3 > 2 and 3 < 4, insert between |

**Result:** `1 → 2 → 3 → 4` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n²) | Each of n nodes may scan the entire sorted portion |
| Space | O(1) | Re-links existing nodes, no new allocation |

---

## 7. Follow-Up Questions

### 7.1 Why not just use merge sort for linked lists?

Merge sort is O(n log n) and is generally preferred. Insertion sort is asked specifically to test linked list manipulation skills.

### 7.2 Can we optimize the inner scan?

We can keep a `tail` pointer. If `curr.val >= tail.val`, append directly in O(1) instead of scanning from the dummy. This helps nearly-sorted inputs.

### 7.3 Is insertion sort stable?

Yes. Elements with equal values maintain their original relative order because we use `<` (not `<=`) when finding the insertion point.

---

## 8. Key Takeaway

> Linked list insertion sort uses a **dummy head** to build the sorted list node by node. The key is detaching each node, scanning the sorted portion for the right position, and re-linking. O(n²) worst case but O(1) space — a classic linked list manipulation exercise.
