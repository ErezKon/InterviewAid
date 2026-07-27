# 1825. Finding MK Average

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/finding-mk-average](https://leetcode.com/problems/finding-mk-average)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Three Sorted Sets — O(log m) per operation ✅](#3-approach-three-sorted-sets)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Design a data structure that maintains the last `m` elements and can compute the MK average: remove the smallest `k` and largest `k` elements from the last `m`, return the average of the remaining.

**Constraints:**
- `3 <= m <= 10⁵`
- `1 <= k < m/2`

---

## 2. Key Insight

> Maintain three sorted containers: `bottom` (smallest k), `middle` (remaining m-2k), and `top` (largest k). Track the sum of `middle`. On each add/remove, rebalance between the three sets.

---

## 3. Approach: Three Sorted Sets — O(log m) per operation ✅

```
CLASS MKAverage:
    CONSTRUCTOR(m, k):
        bottom, middle, top ← sorted sets
        queue ← deque for last m elements
        midSum ← 0

    FUNCTION addElement(num):
        queue.ADD(num)
        Insert num into correct set, rebalance
        IF queue.SIZE > m:
            Remove oldest element, rebalance
        Update midSum accordingly

    FUNCTION calculateMKAverage():
        IF queue.SIZE < m: RETURN -1
        RETURN midSum / (m - 2*k)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log m) per add, O(1) per query |
| **Space** | O(m) |

---

## 5. Key Takeaway

> **Three sorted containers** (bottom-k, middle, top-k) with rebalancing enable O(log m) updates and O(1) average queries.
