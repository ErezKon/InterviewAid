# 2580. Count Ways to Group Overlapping Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-ways-to-group-overlapping-ranges](https://leetcode.com/problems/count-ways-to-group-overlapping-ranges)
**Companies:** Ibm, Oracle

---

## Problem Description

Given ranges, split them into two groups such that no two overlapping ranges are in different groups. Count valid groupings modulo `10^9 + 7`.

---

## Key Insight

Merge overlapping ranges. After merging, each merged segment is independent and can go to either group → `2^m` ways where `m` = number of merged segments.

---

## Approach

```
FUNCTION countWays(ranges):
    MOD = 10^9 + 7
    SORT ranges by start
    merged = 0
    maxEnd = -1

    FOR [start, end] IN ranges:
        IF start > maxEnd: merged += 1   // new segment
        maxEnd = MAX(maxEnd, end)

    RETURN pow(2, merged, MOD)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) |

---

## Key Takeaway

> **Merge overlapping intervals, then each merged group independently chooses which of the two groups to join → `2^(merged_count)` total ways.**
