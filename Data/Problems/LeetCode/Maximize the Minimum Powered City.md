# 2528. Maximize the Minimum Powered City

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-minimum-powered-city](https://leetcode.com/problems/maximize-the-minimum-powered-city)
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search + Greedy + Prefix Sum — O(n log V)](#approach-binary-search--greedy--prefix-sum--on-log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** integer array `stations` of length `n`, where `stations[i]` represents the number of power stations in the `i^th` city.

Each power station can provide power to every city in a fixed **range**. In other words, if the range is denoted by `r`, then a power station at city `i` can provide power to all cities `j` such that `|i - j| <= r` and `0 <= i, j <= n - 1`.

- Note that `|x|` denotes **absolute** value. For example, `|7 - 5| = 2` and `|3 - 10| = 7`.

The **power** of a city is the total number of power stations it is being provided power from.

The government has sanctioned building `k` more power stations, each of which can be built in any city, and have the same range as the pre-existing ones.

Given the two integers `r` and `k`, return *the **maximum possible minimum power** of a city, if the additional power stations are built optimally.*

**Note** that you can build the `k` power stations in multiple cities.

**Constraints:**
- `n == stations.length`
- `1 <= n <= 10^5`
- `0 <= stations[i] <= 10^5`
- `0 <= r <= n - 1`
- `0 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
Explanation: One of the optimal ways is to install both the power stations at city 1.
So stations will become [1,4,4,5,0].
- City 0 is provided by 1 + 4 = 5 power stations.
- City 1 is provided by 1 + 4 + 4 = 9 power stations.
- City 2 is provided by 4 + 4 + 5 = 13 power stations.
- City 3 is provided by 5 + 4 = 9 power stations.
- City 4 is provided by 5 + 0 = 5 power stations.
So the minimum power of a city is 5.
Since it is not possible to obtain a larger power, we return 5.
```

**Example 2:**
```
Input: stations = [4,4,4,4], r = 0, k = 3
Output: 4
Explanation: It can be proved that we cannot make the minimum power of a city greater than 4.
```

---

## Key Insight

> Binary search on the minimum power level. For each candidate, greedily scan left to right: if a city's power is below the threshold, place stations as far right as possible (to cover the most future cities). Use a **difference array** to efficiently track station coverage.

---

## Approach: Binary Search + Greedy + Prefix Sum — O(n log V) ✅

```
FUNCTION maxMinPower(stations, r, k):
    // Compute initial power per city using prefix sum
    power = computePower(stations, r)

    FUNCTION canAchieve(minPower):
        extra = k; diff = [0] * (n + 1)
        curr = 0
        FOR i ← 0 TO n - 1:
            curr += diff[i]
            deficit = minPower - (power[i] + curr)
            IF deficit > 0:
                IF deficit > extra: RETURN False
                extra -= deficit
                curr += deficit
                // Place at rightmost effective position
                IF i + 2*r + 1 < n: diff[i + 2*r + 1] -= deficit
        RETURN True

    lo, hi = 0, SUM(stations) + k
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canAchieve(mid): lo = mid
        ELSE: hi = mid - 1
    RETURN lo
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Greedy | **O(n log V)** | O(n) |

---

## Key Takeaway

> **Binary search on min power + greedy station placement using a difference array.** Place each new station as far right as possible to maximize coverage of future cities.
