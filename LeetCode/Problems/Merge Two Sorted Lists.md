# 21. Merge Two Sorted Lists

**Difficulty:** 🟢 Easy
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/merge-two-sorted-lists](https://leetcode.com/problems/merge-two-sorted-lists)
**Companies:** Accenture, Amazon, Apple, Arista Networks, Bloomberg, Capgemini, Docusign, Epam Systems, Flipkart, Goldman Sachs, Google, Hpe, Huawei, Hubspot, Infosys, Josh Technology, Linkedin, Meta, Microsoft, Mongodb, Nvidia, Oracle, Palo Alto Networks, Qualcomm, Rippling, Salesforce, Servicenow, Siemens, Snowflake, Squarespace, Swiggy, Tcs, Tiktok, Udemy, Visa, Wix, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Iterative — O(n+m) ✅](#3-approach-1-iterative--onm-)
4. [Approach 2: Recursive — O(n+m)](#4-approach-2-recursive--onm)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Constraints:**
- The number of nodes in both lists is in `[0, 50]`.
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in **non-decreasing** order.

---

## 2. Examples

```
Example 1:
  Input:  list1 = [1,2,4], list2 = [1,3,4]
  Output: [1,1,2,3,4,4]

Example 2:
  Input:  list1 = [], list2 = []
  Output: []

Example 3:
  Input:  list1 = [], list2 = [0]
  Output: [0]
```

---

## 3. Approach 1: Iterative — O(n+m) ✅

Use a **dummy head** node to simplify edge cases. Compare nodes from both lists and append the smaller one.

```
FUNCTION mergeTwoLists(list1, list2):

    dummy = new ListNode(0)
    current = dummy

    WHILE list1 != null AND list2 != null:
        IF list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        ELSE:
            current.next = list2
            list2 = list2.next
        current = current.next

    // Attach remaining nodes
    current.next = list1 IF list1 != null ELSE list2

    RETURN dummy.next
```

---

## 4. Approach 2: Recursive — O(n+m)

```
FUNCTION mergeTwoLists(list1, list2):

    IF list1 == null: RETURN list2
    IF list2 == null: RETURN list1

    IF list1.val <= list2.val:
        list1.next = mergeTwoLists(list1.next, list2)
        RETURN list1
    ELSE:
        list2.next = mergeTwoLists(list1, list2.next)
        RETURN list2
```

---

## 5. Walkthrough

```
list1: 1 → 2 → 4
list2: 1 → 3 → 4

dummy → [?]
Compare 1 vs 1: take list1(1) → dummy → 1
Compare 2 vs 1: take list2(1) → dummy → 1 → 1
Compare 2 vs 3: take list1(2) → dummy → 1 → 1 → 2
Compare 4 vs 3: take list2(3) → dummy → 1 → 1 → 2 → 3
Compare 4 vs 4: take list1(4) → dummy → 1 → 1 → 2 → 3 → 4
list1 = null → attach list2(4) → dummy → 1 → 1 → 2 → 3 → 4 → 4

Result: [1,1,2,3,4,4] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Iterative** | **O(n+m)** | **O(1)** |
| Recursive | O(n+m) | O(n+m) stack |

---

## 7. Follow-Up Questions

### 7.1 Merge k Sorted Lists (LeetCode #23)?

- **Min-heap:** Push heads of all k lists into a min-heap. Pop min, push its next. O(N log k).
- **Divide and conquer:** Pairwise merge lists, halving the count each round. O(N log k).

### 7.2 What about merging sorted arrays?

Same two-pointer approach but with array indices. If in-place, work from the end (LeetCode #88 — Merge Sorted Array).

### 7.3 Sort a linked list?

Use **merge sort** — split with slow/fast pointers, recursively sort halves, merge. O(n log n) time, O(log n) space.

---

## Key Takeaway

> The **dummy head** technique eliminates edge cases in linked list problems. This merge subroutine is the building block for merge sort and merge-k-lists.
