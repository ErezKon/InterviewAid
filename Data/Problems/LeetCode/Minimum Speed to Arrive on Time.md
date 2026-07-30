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

Given `n` train distances and a deadline `hour`, each train after the first requires waiting until the next integer hour. Return the **minimum** integer speed to arrive on time, or `-1`.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= dist[i] <= 10⁵`
- `1 <= hour <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: dist = [1,3,2], hour = 6
  Output: 1
  Explanation: At speed 1: ceil(1/1)+ceil(3/1)+2/1 = 1+3+2 = 6 ≤ 6.

Example 2:
  Input: dist = [1,3,2], hour = 2.7
  Output: 3
  Explanation: At speed 3: ceil(1/3)+ceil(3/3)+2/3 = 1+1+0.67 = 2.67 ≤ 2.7.
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
