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

There is a biker going on a road trip. The road trip consists of `n + 1` points at different altitudes. The biker starts his trip on point `0` with altitude equal `0`.

You are given an integer array `gain` of length `n` where `gain[i]` is the **net gain in altitude** between points `i` and `i + 1` for all (`0 <= i < n`). Return *the **highest altitude** of a point.*

**Constraints:**
- `n == gain.length`
- `1 <= n <= 100`
- `-100 <= gain[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input: gain = [-5,1,5,0,-7]
  Output: 1
  Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.

Example 2:
  Input: gain = [-4,-3,-2,-1,4,3,2]
  Output: 0
  Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
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
