# 1154. Day of the Year

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/day-of-the-year](https://leetcode.com/problems/day-of-the-year)
**Companies:** Google, Zscaler

---

## Problem Description

Given a date string `"YYYY-MM-DD"`, return the day number of the year (1-indexed).

---

## Approach

```
FUNCTION dayOfYear(date):
    year, month, day = parse date
    daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
    IF isLeapYear(year): daysInMonth[1] = 29
    RETURN SUM(daysInMonth[:month-1]) + day
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Key Takeaway

> **Day of year = sum of days in preceding months + current day. Handle leap years by adjusting February.**
