# 539. Minimum Time Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-difference](https://leetcode.com/problems/minimum-time-difference)
**Companies:** Amazon, Bloomberg, Capital One, Google, Meta, Microsoft, Palantir, Visa, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort — O(n log n)](#4-approach-sort--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a list of 24-hour time points in `"HH:MM"` format, return the **minimum** difference in minutes between any two times.

**Constraints:**
- `2 <= timePoints.length <= 2 × 10⁴`

---

## 2. Examples

```
Example 1:
  Input: timePoints = ["23:59", "00:00"]
  Output: 1
  Explanation: Circular: 23:59 → 00:00 is 1 minute.

Example 2:
  Input: timePoints = ["00:00", "23:59", "00:00"]
  Output: 0
```

---

## 3. Key Insight

> Convert to minutes, sort, then the minimum difference is between consecutive times OR the circular wrap-around (last to first + 1440). If n > 1440, by pigeonhole there must be a duplicate → answer is 0.

---

## 4. Approach: Sort — O(n log n) ✅

```
FUNCTION findMinDifference(timePoints):
    minutes = [int(t[:2]) * 60 + int(t[3:]) for t in timePoints]
    SORT minutes

    minDiff = 24 * 60 - minutes[-1] + minutes[0]    // wrap-around
    FOR i ← 1 TO n - 1:
        minDiff = MIN(minDiff, minutes[i] - minutes[i-1])

    RETURN minDiff
```

---

## 5. Walkthrough

```
timePoints = ["23:59", "00:00"]
minutes = [1439, 0] → sorted: [0, 1439]

Consecutive: 1439 - 0 = 1439
Wrap-around: 1440 - 1439 + 0 = 1

Answer = min(1439, 1) = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(n) — minutes array |

---

## 7. Key Takeaway

> **Circular difference = sort + check wrap.** After sorting, minimum difference is between adjacent elements or the circular wrap (first + 1440 - last). Pigeonhole: n > 1440 → guaranteed 0.
