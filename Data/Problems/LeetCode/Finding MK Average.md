# 1825. Finding MK Average

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/finding-mk-average](https://leetcode.com/problems/finding-mk-average)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Three Sorted Sets — O(log m) per operation ✅](#4-approach-three-sorted-sets---olog-m-per-operation-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Design a data structure that maintains the last `m` elements and can compute the MK average: remove the smallest `k` and largest `k` elements from the last `m`, return the average of the remaining.

**Constraints:**
- `3 <= m <= 10⁵`
- `1 <= k < m/2`

---

## 2. Examples

```text
MKAverage mk = new MKAverage(3, 1);
mk.addElement(3);   // window: [3]
mk.addElement(1);   // window: [3,1]
mk.addElement(10);  // window: [3,1,10] → remove smallest 1 and largest 10, average = 3
mk.calculateMKAverage(); // returns 3
mk.addElement(5);   // window slides to [1,10,5]
mk.calculateMKAverage(); // remove 1 and 10, average = 5
```

---

## 3. Key Insight

> Maintain three sorted containers: `bottom` (smallest k), `middle` (remaining m‑2k), and `top` (largest k). Track the sum of `middle`. On each insertion or removal, rebalance the containers so the size constraints hold.

---

## 4. Approach: Three Sorted Sets — O(log m) per operation ✅

```text
CLASS MKAverage:
    CONSTRUCTOR(m, k):
        bottom, middle, top ← empty balanced BSTs
        queue ← deque for last m elements
        midSum ← 0
        self.m ← m
        self.k ← k

    FUNCTION addElement(num):
        queue.APPEND(num)
        // Insert into appropriate set
        IF bottom.SIZE < k OR num <= bottom.MAX():
            bottom.INSERT(num)
        ELSE IF top.SIZE < k OR num >= top.MIN():
            top.INSERT(num)
        ELSE:
            middle.INSERT(num)
            midSum ← midSum + num
        // Rebalance sizes
        REBALANCE()
        // Remove oldest if window exceeds m
        IF queue.SIZE > m:
            old ← queue.POP_FRONT()
            DELETE_FROM_SETS(old)
            REBALANCE()

    FUNCTION DELETE_FROM_SETS(value):
        IF bottom.CONTAINS(value):
            bottom.REMOVE(value)
        ELSE IF top.CONTAINS(value):
            top.REMOVE(value)
        ELSE:
            middle.REMOVE(value)
            midSum ← midSum - value

    FUNCTION REBALANCE():
        // Ensure bottom and top each have exactly k elements
        WHILE bottom.SIZE > k:
            move ← bottom.MAX()
            bottom.REMOVE(move)
            middle.INSERT(move)
            midSum ← midSum + move
        WHILE bottom.SIZE < k AND middle.SIZE > 0:
            move ← middle.MIN()
            middle.REMOVE(move)
            midSum ← midSum - move
            bottom.INSERT(move)
        WHILE top.SIZE > k:
            move ← top.MIN()
            top.REMOVE(move)
            middle.INSERT(move)
            midSum ← midSum + move
        WHILE top.SIZE < k AND middle.SIZE > 0:
            move ← middle.MAX()
            middle.REMOVE(move)
            midSum ← midSum - move
            top.INSERT(move)

    FUNCTION calculateMKAverage():
        IF queue.SIZE < m: RETURN -1
        RETURN midSum / (m - 2*k)
```

---

## 5. Walkthrough

**Step 1:** `addElement(3)` → bottom=[3], middle=[], top=[], midSum=0 (k=1, need to move later).
**Step 2:** `addElement(1)` → bottom now holds smallest k (1), middle gets 3, midSum=3.
**Step 3:** `addElement(10)` → top gets 10, middle still [3], midSum=3. Window full, `calculateMKAverage()` returns `3 / (3-2) = 3`.
**Step 4:** Add `5`, oldest `3` leaves. Rebalance moves 1 to bottom, 5 to middle, updates midSum accordingly, yielding average `5`.

---

## 6. Complexity Analysis

- **Time:** O(log m) for each insertion, deletion, and rebalancing (balanced BST operations).
- **Space:** O(m) to store the last `m` elements and three sets.

---

## 7. Follow-Up Questions

- How would you adapt the structure for a sliding window median (k = 0)?
- Can the solution be implemented with two heaps instead of three balanced trees?
- What changes are needed if the query asks for the sum of the middle elements instead of the average?

---

## 8. Key Takeaway

> Keeping three balanced containers for the smallest k, middle, and largest k elements lets you update and query the MK average in logarithmic time per operation.
