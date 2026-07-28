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

Given a set of non-overlapping intervals (groups) on a number line and the ability to insert **one** interval of length `k`, minimize the number of **connected groups** after insertion.

**Constraints:**
- `1 ≤ intervals.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
intervals = [[1,2],[5,6],[9,10]], k = 3
```
Insert interval `[3,5]` connects the first two groups, resulting in 2 groups.

**Example 2:**
```
intervals = [[1,4],[6,9],[12,15]], k = 2
```
No interval of length 2 can bridge any gap, so the answer is 4 (original 3 groups plus the inserted one).

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