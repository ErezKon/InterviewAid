# 436. Find Right Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-right-interval](https://leetcode.com/problems/find-right-interval)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Binary Search — O(n log n) ✅](#4-approach-sort--binary-search--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, for each interval find the **right interval** — the interval `j` with the smallest `start_j >= end_i`. Return an array of indices, or `-1` if no right interval exists.

Each `start_i` is unique.

**Constraints:**
- `1 <= intervals.length <= 2 * 10⁴`
- `-10⁶ <= start_i <= end_i <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input:  intervals = [[3,4],[2,3],[1,2]]
  Output: [-1, 0, 1]
  Reason: [3,4] has no right interval. [2,3] → [3,4] (start 3 ≥ end 3). [1,2] → [2,3].

Example 2:
  Input:  intervals = [[1,2]]
  Output: [-1]
```

---

## 3. Key Insight

> Sort intervals by their start values. For each interval's end value, **binary search** for the first start ≥ end. This converts an O(n²) brute-force to O(n log n).

---

## 4. Approach: Sort + Binary Search — O(n log n) ✅

```
FUNCTION findRightInterval(intervals):
    starts = sorted((iv[0], i) for i, iv in enumerate(intervals))
    result = []
    FOR iv IN intervals:
        idx = bisect_left(starts, (iv[1],))
        result.ADD(starts[idx][1] IF idx < len(starts) ELSE -1)
    RETURN result
```

---

## 5. Walkthrough

```
intervals = [[3,4],[2,3],[1,2]]

starts sorted by start value: [(1,2), (2,1), (3,0)]

Interval [3,4]: bisect_left for end=4 → idx=3 (out of bounds) → -1
Interval [2,3]: bisect_left for end=3 → idx=2 → starts[2]=(3,0) → 0
Interval [1,2]: bisect_left for end=2 → idx=1 → starts[1]=(2,1) → 1

Result: [-1, 0, 1] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sort + n binary searches |
| **Space** | O(n) — sorted starts array |

---

## 7. Follow-Up Questions

### 7.1 What if start values are not unique?

The binary search still works — `bisect_left` finds the leftmost match, which is the smallest-index right interval.

### 7.2 Can you solve this with two pointers?

Sort both by start and by end, then sweep with two pointers. Also O(n log n) but avoids per-element binary search.

### 7.3 How does this relate to scheduling problems?

Finding the "next available slot" after a task ends is the same operation. It appears in interval scheduling and greedy algorithms.

---

## 8. Key Takeaway

> **Sort by start + binary search for end** is the standard O(n log n) pattern for finding the "next interval" in scheduling-type problems.
