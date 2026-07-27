# 1118. Number of Days in a Month

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-days-in-a-month](https://leetcode.com/problems/number-of-days-in-a-month)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Lookup Table — O(1)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given a year `y` and month `m`, return the number of days in that month.

---

## 2. Approach: Lookup Table — O(1) ✅

```
FUNCTION numberOfDays(year, month):
    days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    IF month == 2 AND isLeapYear(year):
        RETURN 29
    RETURN days[month]

FUNCTION isLeapYear(y):
    RETURN (y % 4 == 0 AND y % 100 != 0) OR (y % 400 == 0)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Lookup table + leap year check.** February is the only variable month. Leap year: divisible by 4 but not 100, unless also divisible by 400.
