# 2594. Minimum Time to Repair Cars

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-repair-cars](https://leetcode.com/problems/minimum-time-to-repair-cars)
**Companies:** Amazon, Deloitte, Google, Hashedin, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search on Answer — O(n log(max))](#4-approach-binary-search-on-answer--on-logmax)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given mechanics with ranks, a mechanic with rank `r` takes `r * n²` minutes to repair `n` cars. All work in parallel. Return the **minimum** time to repair `cars` total cars.

**Constraints:**
- `1 <= ranks.length <= 10⁵`
- `1 <= ranks[i] <= 100`
- `1 <= cars <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input: ranks = [4, 2, 3, 1], cars = 10
  Output: 16
  Explanation: At t=16: rank1→4 cars, rank2→2 cars, rank3→2 cars, rank4→1 car. Varies.
```

---

## 3. Key Insight

> Binary search on time. Given time `T`, mechanic with rank `r` repairs `⌊√(T/r)⌋` cars. Sum all mechanics' capacity. Check if ≥ `cars`.

---

## 4. Approach: Binary Search on Answer — O(n log(max)) ✅

```
FUNCTION repairCars(ranks, cars):
    FUNCTION canRepair(time):
        total = SUM(floor(sqrt(time / r)) for r in ranks)
        RETURN total >= cars

    lo, hi = 1, MIN(ranks) * cars * cars
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canRepair(mid): hi = mid
        ELSE: lo = mid + 1

    RETURN lo
```

---

## 5. Walkthrough

```
ranks = [4, 2, 3, 1], cars = 10
hi = 1 * 10² = 100

Binary search: mid=50
  rank4: sqrt(50/4)=3, rank2: sqrt(50/2)=5, rank3: sqrt(50/3)=4, rank1: sqrt(50/1)=7
  total = 3+5+4+7 = 19 ≥ 10 → hi=50
  ...converges to minimum feasible time.
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · log(min_rank · cars²)) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search on time with capacity check** — each mechanic's capacity at time T is `⌊√(T/rank)⌋`. Same "binary search the answer" pattern as Minimum Time to Complete Trips.
