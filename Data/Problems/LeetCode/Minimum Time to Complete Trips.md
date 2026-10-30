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

You are given an array `time` where `time[i]` denotes the time taken by the `i^th` bus to complete **one trip**.

Each bus can make multiple trips **successively**; that is, the next trip can start **immediately after** completing the current trip. Also, each bus operates **independently**; that is, the trips of one bus do not influence the trips of any other bus.

You are also given an integer `totalTrips`, which denotes the number of trips all buses should make **in total**. Return *the **minimum time** required for all buses to complete **at least** *`totalTrips`* trips*.

**Constraints:**
- `1 <= time.length <= 10^5`
- `1 <= time[i], totalTrips <= 10^7`

---

## 2. Examples

**Example 1:**
```
Input: time = [1,2,3], totalTrips = 5
Output: 3
Explanation: - At time t = 1, the number of trips completed by each bus are [1,0,0].
  The total number of trips completed is 1 + 0 + 0 = 1.
- At time t = 2, the number of trips completed by each bus are [2,1,0].
  The total number of trips completed is 2 + 1 + 0 = 3.
- At time t = 3, the number of trips completed by each bus are [3,1,1].
  The total number of trips completed is 3 + 1 + 1 = 5.
So the minimum time needed for all buses to complete at least 5 trips is 3.
```

**Example 2:**
```
Input: time = [2], totalTrips = 1
Output: 2
Explanation: There is only one bus, and it will complete its first trip at t = 2.
So the minimum time needed to complete 1 trip is 2.
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
