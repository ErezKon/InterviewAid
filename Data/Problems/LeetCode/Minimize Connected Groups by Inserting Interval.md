# 3323. Minimize Connected Groups by Inserting Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-connected-groups-by-inserting-interval](https://leetcode.com/problems/minimize-connected-groups-by-inserting-interval)
**Companies:** De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a 2D array `intervals`, where `intervals[i] = [start_i, end_i]` represents the start and the end of interval `i`. You are also given an integer `k`.

You must add **exactly one** new interval `[start_new, end_new]` to the array such that:

- The length of the new interval, `end_new - start_new`, is at most `k`.
- After adding, the number of **connected groups** in `intervals` is **minimized**.

A **connected group** of intervals is a maximal collection of intervals that, when considered together, cover a continuous range from the smallest point to the largest point with no gaps between them. Here are some examples:

- A group of intervals `[[1, 2], [2, 5], [3, 3]]` is connected because together they cover the range from 1 to 5 without any gaps.
- However, a group of intervals `[[1, 2], [3, 4]]` is not connected because the segment `(2, 3)` is not covered.

Return the **minimum** number of connected groups after adding **exactly one** new interval to the array.

**Constraints:**
- `1 <= intervals.length <= 10^5`
- `intervals[i] == [start_i, end_i]`
- `1 <= start_i <= end_i <= 10^9`
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: intervals = [[1,3],[5,6],[8,10]], k = 3
Output: 2
Explanation: After adding the interval [3, 5], we have two connected groups: [[1, 3], [3, 5], [5, 6]] and [[8, 10]].
```

**Example 2:**
```
Input: intervals = [[5,10],[1,1],[3,3]], k = 1
Output: 3
Explanation: After adding the interval [1, 1], we have three connected groups: [[1, 1], [1, 1]], [[3, 3]], and [[5, 10]].
```

---

## Key Insight

> Sort intervals. Use a **sliding window** to find the maximum number of existing groups that can be connected by a single interval of length `k`. The answer is `totalGroups - maxConnected + 1` (the inserted interval and all groups it touches become one group).

---

## Approach

```text
FUNCTION minConnectedGroups(intervals, k):
    // Sort intervals by their start coordinate
    SORT intervals BY start
    n ← LEN(intervals)
    maxConnected ← 1
    j ← 0
    FOR i ← 0 TO n - 1 DO
        // Expand window while the next interval starts within k of the current interval's end
        WHILE j < n - 1 AND intervals[j+1][0] ≤ intervals[i][1] + k DO
            j ← j + 1
        maxConnected ← MAX(maxConnected, j - i + 1)
    RETURN n - maxConnected + 1
```

---

## Walkthrough

| Step | i (left) | j (right) | Window Covered | maxConnected |
|------|----------|-----------|----------------|--------------|
| Init | 0 | 0 | `[1,2]` | 1 |
| Expand | 0 | 1 | `[1,2]` & `[5,6]` (gap ≤ k) | 2 |
| Expand | 0 | 2 | Gap to `[9,10]` > k, stop | 2 |
| Slide i | 1 | 2 | New window `[5,6]` & `[9,10]` (gap ≤ k) | 2 |
| End | – | – | – | 2 |

Result: `totalGroups = 3`, `maxConnected = 2` → answer `3 - 2 + 1 = 2` groups.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window | **O(n log n)** | **O(1)** |

---

## Follow-Up Questions

- How would the solution change if you could insert **multiple** intervals?
- What if intervals could overlap initially?
- Can you adapt the algorithm to return the actual interval to insert?

---

## Key Takeaway

> **Sliding window on sorted intervals** — find the maximum number of groups coverable by an interval of length `k`, then subtract from total.

---