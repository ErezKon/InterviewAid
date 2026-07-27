# 1854. Maximum Population Year

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-population-year](https://leetcode.com/problems/maximum-population-year)
**Companies:** Amazon, Apple, Bloomberg, Envoy, Google, Meta, Microsoft, Paypal, Zoho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `logs` where `logs[i] = [birth, death]`, return the **earliest year** with the maximum population alive. A person is alive in `[birth, death)`.

**Constraints:**
- `1 <= logs.length <= 100`
- `1950 <= birth < death <= 2050`

---

## Examples

**Example 1:**
```
Input:  logs = [[1993,1999],[2000,2010]]
Output: 1993
```

---

## Key Insight

> **Difference array / line sweep** on years: +1 at birth, -1 at death. Prefix sum gives population each year.

---

## Approach

```
FUNCTION maximumPopulation(logs)
    delta ← array of 2051 zeros

    FOR each [birth, death] IN logs DO
        delta[birth] ← delta[birth] + 1
        delta[death] ← delta[death] - 1

    maxPop ← 0, maxYear ← 1950, pop ← 0
    FOR year ← 1950 TO 2050 DO
        pop ← pop + delta[year]
        IF pop > maxPop THEN
            maxPop ← pop
            maxYear ← year

    RETURN maxYear
END FUNCTION
```

---

## Walkthrough

```
logs = [[1950,1961],[1960,1971]]
delta[1950]=+1, delta[1961]=-1, delta[1960]=+1, delta[1971]=-1
```

Year 1950-1959: pop=1. Year 1960: pop=2 (max). Year 1961: pop=1.

**Result: 1960** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n + Y)** — n logs + Y year range |
| Space  | **O(Y)** — delta array |

---

## Key Takeaway

> **Difference array + prefix sum** — classic line sweep for interval counting. O(n + Y) where Y is the year range.
