# 57. Insert Interval

**Difficulty:** 🟡 Medium
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/insert-interval](https://leetcode.com/problems/insert-interval)
**Companies:** Amazon, Apple, Blend, Bloomberg, Google, Linkedin, Meta, Microsoft, Mongodb, Oracle, Paypal, Phonepe, Tesco, Tiktok, Uber, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Linear Scan — O(n) ✅](#4-approach-linear-scan--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a sorted list of **non-overlapping** intervals `intervals` (sorted by start) and a `newInterval`, insert the new interval and merge if necessary. Return the resulting list of non-overlapping intervals, still sorted by start.

**Constraints:**
- `0 <= intervals.length <= 10⁴`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10⁵`
- `intervals` is sorted by `starti` in ascending order.
- `newInterval.length == 2`

---

## 2. Examples

**Example 1:**
```
Input:  intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Explanation: [2,5] overlaps with [1,3] → merge to [1,5].
```

**Example 2:**
```
Input:  intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: [4,8] overlaps with [3,5],[6,7],[8,10] → merge to [3,10].
```

---

## 3. Key Insight

Since the intervals are already sorted and non-overlapping, we can solve this in a **single linear pass** with three phases:

1. **Before** — add all intervals that end before newInterval starts (no overlap).
2. **Merge** — merge all intervals that overlap with newInterval into one.
3. **After** — add all remaining intervals.

---

## 4. Approach: Linear Scan — O(n) ✅

```
FUNCTION insert(intervals, newInterval):
    result = []
    i = 0

    // Add all intervals ending before newInterval starts
    WHILE i < n AND intervals[i].end < newInterval.start:
        result.ADD(intervals[i])
        i += 1

    // Merge overlapping intervals
    WHILE i < n AND intervals[i].start <= newInterval.end:
        newInterval.start = MIN(newInterval.start, intervals[i].start)
        newInterval.end = MAX(newInterval.end, intervals[i].end)
        i += 1
    result.ADD(newInterval)

    // Add remaining
    WHILE i < n:
        result.ADD(intervals[i])
        i += 1

    RETURN result
```

---

## 5. Walkthrough

```
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
```

| Phase | i | Interval | Action |
|-------|---|----------|--------|
| Before | 0 | [1,2] | 2 < 4 → add [1,2] to result |
| Merge | 1 | [3,5] | 3 ≤ 8 → merge: new = [min(4,3), max(8,5)] = [3,8] |
| Merge | 2 | [6,7] | 6 ≤ 8 → merge: new = [3, max(8,7)] = [3,8] |
| Merge | 3 | [8,10] | 8 ≤ 8 → merge: new = [3, max(8,10)] = [3,10] |
| — | — | — | Add merged [3,10] to result |
| After | 4 | [12,16] | Add [12,16] to result |

**Result:** `[[1,2],[3,10],[12,16]]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Single pass through all intervals |
| Space | O(n) | Output list |

---

## 7. Follow-Up Questions

### 7.1 What if the intervals aren't sorted?

Sort them first in O(n log n), then apply the same algorithm. This becomes the standard **Merge Intervals** problem (LeetCode #56).

### 7.2 Can we use binary search to find insertion point?

Yes — binary search finds where the new interval starts overlapping in O(log n), but the merge and output construction still take O(n), so overall time remains O(n).

### 7.3 What if we need to support repeated insertions efficiently?

Use a balanced BST or interval tree to support O(log n) insertions and merges.

---

## 8. Key Takeaway

> Three phases: (1) add non-overlapping intervals before, (2) merge all overlapping intervals with the new one, (3) add remaining. Clean linear scan — the sorted, non-overlapping precondition makes this elegant.
