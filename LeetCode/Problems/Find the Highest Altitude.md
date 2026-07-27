# 1732. Find the Highest Altitude

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-highest-altitude](https://leetcode.com/problems/find-the-highest-altitude)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Sum — O(n) ✅](#4-approach-prefix-sum--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

A biker starts at altitude 0 and goes through `n+1` points. Given an array `gain` where `gain[i]` is the altitude change between point `i` and `i+1`, return the **highest altitude** reached.

**Constraints:**
- `n == gain.length`
- `1 <= n <= 100`
- `-100 <= gain[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input:  gain = [-5, 1, 5, 0, -7]
  Output: 1
  Reason: Altitudes: [0, -5, -4, 1, 1, -6]. Max = 1.

Example 2:
  Input:  gain = [-4, -3, -2, -1, 4, 3, 2]
  Output: 0
  Reason: Starting altitude 0 is the highest.
```

---

## 3. Key Insight

> The altitude at each point is the prefix sum of the gain array. Track the running sum and its maximum. Don't forget the starting altitude 0.

---

## 4. Approach: Prefix Sum — O(n) ✅

```
FUNCTION largestAltitude(gain):
    altitude = 0; maxAlt = 0
    FOR g IN gain:
        altitude += g
        maxAlt = MAX(maxAlt, altitude)
    RETURN maxAlt
```

---

## 5. Walkthrough

```
gain = [-5, 1, 5, 0, -7]

altitude=0: +(-5)=-5, maxAlt=0
altitude=-5: +1=-4, maxAlt=0
altitude=-4: +5=1, maxAlt=1
altitude=1: +0=1, maxAlt=1
altitude=1: +(-7)=-6, maxAlt=1

Result: 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Prefix sum max** — compute the running total and track the maximum. The initial altitude 0 is implicitly included by initializing `maxAlt = 0`.
