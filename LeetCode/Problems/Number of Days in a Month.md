# 1118. Number of Days in a Month

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-days-in-a-month](https://leetcode.com/problems/number-of-days-in-a-month)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Lookup Table — O(1)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a year `y` and month `m`, return the number of days in that month.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `y = 2020, m = 2` | `29` | 2020 is a leap year, so February has 29 days. |
| `y = 2019, m = 2` | `28` | 2019 is not a leap year, February has 28 days. |
| `y = 2021, m = 11` | `30` | November always has 30 days.

---

## 3. Approach: Lookup Table — O(1) ✅

```text
FUNCTION numberOfDays(year, month):
    days ← [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    IF month == 2 AND isLeapYear(year):
        RETURN 29
    RETURN days[month]

FUNCTION isLeapYear(y):
    RETURN (y % 4 == 0 AND y % 100 != 0) OR (y % 400 == 0)
```

---

## 4. Walkthrough

**Example:** `year = 2020, month = 2`

1. Call `isLeapYear(2020)` → `TRUE` because 2020 % 4 == 0 and not a century.
2. Since month is 2 and leap year, return `29`.
3. Result matches expected output.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would you handle the Gregorian calendar reform dates before 1582?
- Can you extend this to compute the day of the week for a given date?
- How would you adapt the solution for a different calendar system (e.g., Julian)?

---

## 7. Key Takeaway

> **Lookup table + leap year check.** February is the only variable month. Leap year: divisible by 4 but not 100, unless also divisible by 400.
