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

You are given an integer array `ranks` representing the **ranks** of some mechanics. ranks_i is the rank of the i^th mechanic. A mechanic with a rank `r` can repair n cars in `r * n^2` minutes.

You are also given an integer `cars` representing the total number of cars waiting in the garage to be repaired.

Return *the **minimum** time taken to repair all the cars.*

**Note:** All the mechanics can repair the cars simultaneously.

**Constraints:**
- `1 <= ranks.length <= 10^5`
- `1 <= ranks[i] <= 100`
- `1 <= cars <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation: - The first mechanic will repair two cars. The time required is 4 * 2 * 2 = 16 minutes.
- The second mechanic will repair two cars. The time required is 2 * 2 * 2 = 8 minutes.
- The third mechanic will repair two cars. The time required is 3 * 2 * 2 = 12 minutes.
- The fourth mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.
```

**Example 2:**
```
Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation: - The first mechanic will repair one car. The time required is 5 * 1 * 1 = 5 minutes.
- The second mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
- The third mechanic will repair one car. The time required is 8 * 1 * 1 = 8 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.
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
