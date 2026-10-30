# 1870. Minimum Speed to Arrive on Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-speed-to-arrive-on-time](https://leetcode.com/problems/minimum-speed-to-arrive-on-time)
**Companies:** Apple, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search — O(n log M)](#4-approach-binary-search--on-log-m)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a floating-point number `hour`, representing the amount of time you have to reach the office. To commute to the office, you must take `n` trains in sequential order. You are also given an integer array `dist` of length `n`, where `dist[i]` describes the distance (in kilometers) of the `i^th` train ride.

Each train can only depart at an integer hour, so you may need to wait in between each train ride.

- For example, if the `1^st` train ride takes `1.5` hours, you must wait for an additional `0.5` hours before you can depart on the `2^nd` train ride at the 2 hour mark.

Return *the **minimum positive integer** speed **(in kilometers per hour)** that all the trains must travel at for you to reach the office on time, or *`-1`* if it is impossible to be on time*.

Tests are generated such that the answer will not exceed `10^7` and `hour` will have **at most two digits after the decimal point**.

**Constraints:**
- `n == dist.length`
- `1 <= n <= 10^5`
- `1 <= dist[i] <= 10^5`
- `1 <= hour <= 10^9`
- There will be at most two digits after the decimal point in `hour`.

---

## 2. Examples

**Example 1:**
```
Input: dist = [1,3,2], hour = 6
Output: 1
Explanation: At speed 1:
- The first train ride takes 1/1 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 1 hour mark. The second train takes 3/1 = 3 hours.
- Since we are already at an integer hour, we depart immediately at the 4 hour mark. The third train takes 2/1 = 2 hours.
- You will arrive at exactly the 6 hour mark.
```

**Example 2:**
```
Input: dist = [1,3,2], hour = 2.7
Output: 3
Explanation: At speed 3:
- The first train ride takes 1/3 = 0.33333 hours.
- Since we are not at an integer hour, we wait until the 1 hour mark to depart. The second train ride takes 3/3 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 2 hour mark. The third train takes 2/3 = 0.66667 hours.
- You will arrive at the 2.66667 hour mark.
```

**Example 3:**
```
Input: dist = [1,3,2], hour = 1.9
Output: -1
Explanation: It is impossible because the earliest the third train can depart is at the 2 hour mark.
```

---

## 3. Key Insight

> Higher speed → less time (monotonic). Binary search on speed. For a given speed `s`, time = `Σ ceil(dist[i]/s)` for all but the last train, plus `dist[n-1]/s` for the last.

---

## 4. Approach: Binary Search — O(n log M) ✅

```
FUNCTION minSpeedOnTime(dist, hour):
    IF hour <= n - 1: RETURN -1  // impossible even at infinite speed

    lo, hi = 1, 10^7

    WHILE lo < hi:
        mid = (lo + hi) / 2
        time = 0
        FOR i ← 0 TO n - 2:
            time += CEIL(dist[i] / mid)
        time += dist[n-1] / mid  // last train, no ceiling

        IF time <= hour:
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo
```

---

## 5. Walkthrough

```
dist = [1, 3, 2], hour = 2.7

Binary search [1, 10^7]:
  mid=5000000: time ≈ 0 → hi=5000000
  ...converges...
  mid=3: ceil(1/3)+ceil(3/3)+2/3 = 1+1+0.67 = 2.67 ≤ 2.7 ✅
  mid=2: ceil(1/2)+ceil(3/2)+2/2 = 1+2+1 = 4 > 2.7 ✗

Answer = 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log M) where M = max speed (10⁷) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search on the answer** — when the feasibility function is monotonic (faster speed = less time), binary search finds the minimum speed. Classic pattern for optimization problems with monotonic predicates.
