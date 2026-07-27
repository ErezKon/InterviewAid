# 3323. Minimize Connected Groups by Inserting Interval

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-connected-groups-by-inserting-interval](https://leetcode.com/problems/minimize-connected-groups-by-inserting-interval)
**Companies:** De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a set of non-overlapping intervals (groups) on a number line and the ability to insert **one** interval of length `k`, minimize the number of **connected groups** after insertion.

**Constraints:**
- `1 ≤ intervals.length ≤ 10⁵`

---

## Key Insight

> Sort intervals. Use a **sliding window** to find the maximum number of existing groups that can be connected by a single interval of length `k`. The answer is `totalGroups - maxConnected + 1` (the inserted interval and all groups it touches become one group).

---

## Approach

```
FUNCTION minConnectedGroups(intervals, k):
    SORT intervals BY start
    n ← LEN(intervals)
    maxConnected ← 1
    
    j ← 0
    FOR i ← 0 TO n - 1 DO
        // Find rightmost group j such that intervals[j].start ≤ intervals[i].end + k
        WHILE j < n - 1 AND intervals[j+1][0] ≤ intervals[i][1] + k DO
            j ← j + 1
        maxConnected ← MAX(maxConnected, j - i + 1)
    
    RETURN n - maxConnected + 1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Sliding window on sorted intervals** — find the maximum number of groups coverable by an interval of length `k`, then subtract from total.

---
