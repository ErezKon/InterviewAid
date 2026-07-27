# 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points](https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points)
**Companies:** Amazon, Bloomberg, Google, Info Edge, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Collect Critical Points — O(n) ✅](#4-approach-collect-critical-points--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

A **critical point** in a linked list is a local minimum or local maximum. Given a linked list, return `[minDistance, maxDistance]` between any two critical points. Return `[-1, -1]` if fewer than 2 critical points exist.

**Constraints:**
- `2 <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  head = [5, 3, 1, 2, 5, 1, 2]
  Output: [1, 3]
  Reason: Critical points at indices 2 (min), 4 (max), 5 (min). Min dist = 1, Max dist = 3.
```

---

## 3. Key Insight

> Traverse once collecting indices of critical points. Min distance = minimum of consecutive differences. Max distance = last - first.

---

## 4. Approach: Collect Critical Points — O(n) ✅

```
FUNCTION nodesBetweenCriticalPoints(head):
    criticals = []
    prev = head; curr = head.next; idx = 1

    WHILE curr.next:
        IF (curr.val > prev.val AND curr.val > curr.next.val) OR
           (curr.val < prev.val AND curr.val < curr.next.val):
            criticals.ADD(idx)
        prev = curr; curr = curr.next; idx += 1

    IF len(criticals) < 2: RETURN [-1, -1]
    minDist = MIN(criticals[i+1] - criticals[i] for i)
    maxDist = criticals[-1] - criticals[0]
    RETURN [minDist, maxDist]
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(c) — c = number of critical points |

---

## 6. Key Takeaway

> Collect critical point indices in one pass. **Min distance is between consecutive critical points; max distance is between first and last.**
