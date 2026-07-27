# 986. Interval List Intersections

**Difficulty:** 🟡 Medium
**Acceptance:** 72.0%
**LeetCode:** [https://leetcode.com/problems/interval-list-intersections](https://leetcode.com/problems/interval-list-intersections)
**Companies:** Amazon, Apple, Bloomberg, Doordash, Google, Meta, Microsoft, Mixpanel, Nuro, Uber, Verkada, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(m+n) ✅](#4-approach-two-pointers--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two lists of **closed intervals** `firstList` and `secondList` (each sorted by start and non-overlapping), return the intersection of these two interval lists.

**Constraints:**
- `0 <= firstList.length, secondList.length <= 1000`
- `0 <= starti < endi <= 10⁹`

---

## 2. Examples

```
Input:  firstList = [[0,2],[5,10],[13,23],[24,25]]
        secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

---

## 3. Key Insight

The intersection of two intervals `[a1,a2]` and `[b1,b2]` is `[max(a1,b1), min(a2,b2)]` — valid only if `max(a1,b1) ≤ min(a2,b2)`. After computing, advance the pointer whose interval **ends first** (it can't contribute to any more intersections).

---

## 4. Approach: Two Pointers — O(m+n) ✅

```
FUNCTION intervalIntersection(firstList, secondList):
    result = []
    i, j = 0, 0

    WHILE i < len(firstList) AND j < len(secondList):
        lo = MAX(firstList[i][0], secondList[j][0])
        hi = MIN(firstList[i][1], secondList[j][1])

        IF lo <= hi:
            result.ADD([lo, hi])

        // Advance the interval that ends first
        IF firstList[i][1] < secondList[j][1]:
            i += 1
        ELSE:
            j += 1

    RETURN result
```

---

## 5. Walkthrough

```
firstList  = [[0,2],[5,10]]
secondList = [[1,5],[8,12]]
```

| i | j | Intervals | lo=max(starts) | hi=min(ends) | Valid? | Result |
|---|---|-----------|---------------|-------------|--------|--------|
| 0 | 0 | [0,2]∩[1,5] | 1 | 2 | ✅ | [1,2] |
| 1 | 0 | [5,10]∩[1,5] | 5 | 5 | ✅ | [5,5] |
| 1 | 1 | [5,10]∩[8,12] | 8 | 10 | ✅ | [8,10] |

**Result:** `[[1,2],[5,5],[8,10]]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | Each pointer advances at most once per step |
| Space | O(m + n) | Output list |

---

## 7. Follow-Up Questions

### 7.1 How does this differ from Merge Intervals (#56)?

Merge combines overlapping intervals into one. Intersection finds the overlap between two separate lists — different operation, similar two-pointer technique.

### 7.2 What if the lists aren't sorted?

Sort both lists by start time first (O(m log m + n log n)), then apply the two-pointer algorithm.

### 7.3 What about k interval lists?

Use a priority queue (min-heap) to track the current interval from each list. More complex but same core intersection logic.

---

## 8. Key Takeaway

> Intersection of two intervals: `[max(starts), min(ends)]` — valid only if `max(starts) ≤ min(ends)`. Advance the pointer with the earlier end. This two-pointer pattern is the foundation for all interval comparison problems.
