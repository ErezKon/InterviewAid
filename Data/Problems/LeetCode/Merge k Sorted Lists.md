
# 23. Merge k Sorted Lists

**Difficulty:** 🔴 Hard
**Acceptance:** 59.6%
**LeetCode:** [https://leetcode.com/problems/merge-k-sorted-lists](https://leetcode.com/problems/merge-k-sorted-lists)
**Companies:** Airbnb, Amazon, Anduril, Apple, Bloomberg, Bytedance, Cisco, Citadel, Cloudflare, Cme Group, Cohesity, Coupang, Deloitte, Docusign, Doordash, Ebay, Flipkart, Goldman Sachs, Google, Huawei, Hubspot, Ibm, Ixl, Linkedin, Meta, Microsoft, Mongodb, Netskope, Nutanix, Nvidia, Oracle, Oyo, Palantir, Pinterest, Qualcomm, Rippling, Rivian, Salesforce, Samsung, Snowflake, Sofi, Tcs, Tiktok, Twitter, Two Sigma, Uber, Verkada, Walmart Labs, Warnermedia, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Merge One by One — O(kN)](#3-approach-1-merge-one-by-one--okn)
4. [Approach 2: Min-Heap (Priority Queue) — O(N log k) ✅](#4-approach-2-min-heap-priority-queue--on-log-k-)
5. [Approach 3: Divide and Conquer — O(N log k) ✅](#5-approach-3-divide-and-conquer--on-log-k-)
6. [Walkthrough (Min-Heap)](#6-walkthrough-min-heap)
7. [Complexity Comparison](#7-complexity-comparison)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into **one sorted** linked-list and return it.

---

## 2. Examples

```
Example 1:
  Input:  lists = [[1,4,5], [1,3,4], [2,6]]
  Output: [1,1,2,3,4,4,5,6]

Example 2:
  Input:  lists = []
  Output: []
```

---

## 3. Approach 1: Merge One by One — O(kN)

Merge lists sequentially: merge list 1 with list 2, then the result with list 3, etc.

```
FUNCTION mergeKListsSequential(lists):
    IF lists IS EMPTY: RETURN NULL

    result = lists[0]
    FOR i ← 1 TO k - 1:
        result = mergeTwoLists(result, lists[i])

    RETURN result
```

**Time:** O(kN) where N = total number of nodes. The first merge produces a list of up to 2n nodes, the second up to 3n, etc.

---

## 4. Approach 2: Min-Heap (Priority Queue) — O(N log k) ✅

### Key Insight

At any point, the next node in the merged list must be the **smallest** among the current heads of all k lists. A min-heap gives this in O(log k).

```
FUNCTION mergeKLists(lists):

    heap  = MIN-HEAP
    dummy = new ListNode(0)
    current = dummy

    // Initialize: add the head of each non-empty list
    FOR i ← 0 TO k - 1:
        IF lists[i] IS NOT NULL:
            heap.INSERT( (lists[i].val, i, lists[i]) )

    WHILE heap IS NOT EMPTY:
        (val, listIdx, node) = heap.EXTRACT_MIN()

        current.next = node
        current = current.next

        IF node.next IS NOT NULL:
            heap.INSERT( (node.next.val, listIdx, node.next) )

    RETURN dummy.next
```

### Why Include `listIdx`?

Tie-breaking. When two nodes have the same value, the heap needs a secondary comparison. Using the list index avoids comparing node objects directly.

---

## 5. Approach 3: Divide and Conquer — O(N log k) ✅

Pair up lists and merge each pair, then repeat. This is like the merge step of merge sort.

```
FUNCTION mergeKLists(lists):
    IF lists IS EMPTY: RETURN NULL

    WHILE LENGTH(lists) > 1:
        mergedLists = []

        FOR i ← 0 TO LENGTH(lists) - 1 STEP 2:
            l1 = lists[i]
            l2 = lists[i + 1] IF i + 1 < LENGTH(lists) ELSE NULL
            mergedLists.ADD(mergeTwoLists(l1, l2))

        lists = mergedLists

    RETURN lists[0]


FUNCTION mergeTwoLists(l1, l2):
    dummy = new ListNode(0)
    current = dummy

    WHILE l1 IS NOT NULL AND l2 IS NOT NULL:
        IF l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        ELSE:
            current.next = l2
            l2 = l2.next
        current = current.next

    current.next = l1 IF l1 IS NOT NULL ELSE l2
    RETURN dummy.next
```

Each level processes all N nodes once, and there are log k levels.

---

## 6. Walkthrough (Min-Heap)

```
lists = [[1,4,5], [1,3,4], [2,6]]

Initial heap: [(1,0,node), (1,1,node), (2,2,node)]

Extract (1,0): output 1, push 4 from list 0
  heap: [(1,1), (2,2), (4,0)]

Extract (1,1): output 1, push 3 from list 1
  heap: [(2,2), (3,1), (4,0)]

Extract (2,2): output 2, push 6 from list 2
  heap: [(3,1), (4,0), (6,2)]

Extract (3,1): output 3, push 4 from list 1
  heap: [(4,0), (4,1), (6,2)]

Extract (4,0): output 4, push 5 from list 0
  heap: [(4,1), (5,0), (6,2)]

Extract (4,1): output 4, list 1 exhausted
  heap: [(5,0), (6,2)]

Extract (5,0): output 5, list 0 exhausted
  heap: [(6,2)]

Extract (6,2): output 6, list 2 exhausted
  heap: []

Result: 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6 ✅
```

---

## 7. Complexity Comparison

| Approach | Time | Space |
|----------|------|-------|
| Merge one by one | O(kN) | O(1) |
| **Min-Heap** | **O(N log k)** | **O(k)** |
| **Divide and Conquer** | **O(N log k)** | **O(log k)** recursion / O(1) iterative |

Where N = total nodes across all lists, k = number of lists.

---

## 8. Follow-Up Questions

### 8.1 What if the input is k sorted arrays instead of linked lists?

Same approaches work. Min-heap is especially clean — push `(value, arrayIndex, elementIndex)` tuples.

### 8.2 How to merge two sorted lists? (LeetCode #21)

```
FUNCTION mergeTwoLists(l1, l2):
    dummy = new ListNode(0)
    current = dummy

    WHILE l1 AND l2:
        IF l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        ELSE:
            current.next = l2
            l2 = l2.next
        current = current.next

    current.next = l1 IF l1 ELSE l2
    RETURN dummy.next
```

### 8.3 External sort — what if data doesn't fit in memory?

This is the real-world application of k-way merge:

1. Split the data into chunks that fit in memory.
2. Sort each chunk individually and write to disk.
3. Use a **k-way merge with a min-heap** to merge the sorted chunks, reading one block at a time from each file.

This is how database systems and tools like `sort` handle large files.

### 8.4 Merge k sorted arrays in-place?

Not truly possible with linked lists (already in-place via pointer manipulation). With arrays, you'd need to allocate the output array. The min-heap approach is already optimal.

---

## Key Takeaway

> k-way merge is a fundamental operation in computer science — it powers external sorting, merge sort, and database query processing. The min-heap approach is the most versatile: it works for any ordered data source and naturally handles different-sized inputs. **Heap size = k** (number of sources), not N (total elements).
