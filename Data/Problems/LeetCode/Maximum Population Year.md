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

You are given a 2D integer array `logs` where each `logs[i] = [birth_i, death_i]` indicates the birth and death years of the `i`th person.

The **population** of some year `x` is the number of people alive during that year. The `i`th person is counted in year `x`'s population if `x` is in the **inclusive** range `[birth_i, death_i - 1]`. Note that the person is **not** counted in the year that they die.

Return *the **earliest** year with the **maximum population***.

**Constraints:**
- `1 <= logs.length <= 100`
- `1950 <= birth_i < death_i <= 2050`

---

## Examples

```
Example 1:
  Input: logs = [[1993,1999],[2000,2010]]
  Output: 1993
  Explanation: The maximum population is 1, and 1993 is the earliest year with this population.
```

```
Example 2:
  Input: logs = [[1950,1961],[1960,1971],[1970,1981]]
  Output: 1960
  Explanation:
    The maximum population is 2, and it had happened in years 1960 and 1970.
    The earlier year between them is 1960.
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
