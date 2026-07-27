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

Given `n` cities in a line, each with some power stations, and a range `r` (each station powers cities within distance `r`), you can place `k` additional stations anywhere. Maximize the **minimum power** of any city.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `0 ≤ stations[i] ≤ 10⁵`
- `0 ≤ r ≤ n - 1`
- `0 ≤ k ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
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
