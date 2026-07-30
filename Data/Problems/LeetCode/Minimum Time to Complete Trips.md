# 2187. Minimum Time to Complete Trips

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-complete-trips](https://leetcode.com/problems/minimum-time-to-complete-trips)
**Companies:** Amazon, Google, Meesho, Meta, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search — O(n log(max))](#4-approach-binary-search--on-logmax)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` buses with trip times `time[i]` and a target `totalTrips`, return the **minimum** time such that all buses together complete at least `totalTrips`.

**Constraints:**
- `1 <= time.length <= 10⁵`
- `1 <= time[i], totalTrips <= 10⁷`

---

## 2. Examples

```
Example 1:
  Input: time = [1, 2, 3], totalTrips = 5
  Output: 3
  Explanation: At t=3: bus1=3 trips, bus2=1 trip, bus3=1 trip = 5 total.
```

---

## 3. Key Insight

> More time → more trips (monotonic). Binary search on the answer. For a given time `T`, each bus `i` completes `⌊T/time[i]⌋` trips. Check if total ≥ `totalTrips`.

---

## 4. Approach: Binary Search — O(n log(max)) ✅

```
FUNCTION minimumTime(time, totalTrips):
    lo, hi = 1, MIN(time) * totalTrips

    WHILE lo < hi:
        mid = (lo + hi) / 2
        trips = SUM(mid // t for t in time)
        IF trips >= totalTrips: hi = mid
        ELSE: lo = mid + 1

    RETURN lo
```

---

## 5. Walkthrough

```
time = [1, 2, 3], totalTrips = 5
lo=1, hi=1*5=5

mid=3: trips = 3+1+1 = 5 ≥ 5 → hi=3
mid=2: trips = 2+1+0 = 3 < 5 → lo=3
lo==hi=3

Answer = 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · log(min(time) · totalTrips)) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search on time** — classic "binary search the answer" pattern. The feasibility check (total trips at time T) is monotonically non-decreasing, enabling binary search.
