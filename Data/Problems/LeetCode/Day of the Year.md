# 1154. Day of the Year

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/day-of-the-year](https://leetcode.com/problems/day-of-the-year)
**Companies:** Google, Zscaler

---

## Problem Description

Given a string `date` representing a Gregorian calendar date formatted as `YYYY-MM-DD`, return *the day number of the year*.

**Constraints:**
- `date.length == 10`
- `date[4] == date[7] == '-'`, and all other `date[i]`'s are digits
- `date` represents a calendar date between Jan 1^st, 1900 and Dec 31^st, 2019.

---

## Examples

**Example 1:**
```
Input: date = "2019-01-09"
Output: 9
Explanation: Given date is the 9th day of the year in 2019.
```

**Example 2:**
```
Input: date = "2019-02-10"
Output: 41
```

---

## Walkthrough

1. **Parse the string** into `year = 2019`, `month = 2`, `day = 10`.
2. **Determine leap year**: a year divisible by 4 is leap, except centuries not divisible by 400. 2019 is not leap, so February = 28 days.
3. **Sum days of previous months**: for month 2, sum days of month 1 → 31.
4. **Add current day**: 31 + 10 = 41 → result.

The same steps applied to other examples yield the shown outputs.

---

## Approach

```
FUNCTION dayOfYear(date):
    year, month, day ← PARSE(date) // split by '-'
    daysInMonth ← [31,28,31,30,31,30,31,31,30,31,30,31]
    IF (year % 400 = 0) OR (year % 4 = 0 AND year % 100 ≠ 0):
        daysInMonth[1] ← 29 // leap year February
    total ← SUM(daysInMonth[0 TO month-2]) + day
    RETURN total
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) — constant number of operations |
| **Space** | O(1) — fixed‑size array for month lengths |

---

## Follow-Up Questions

* How would you compute the day of the year for dates before 1900 where built‑in libraries may not support parsing?
* Can you extend the solution to handle the Julian calendar?
* How would you modify the algorithm to return the day of the year for a range of dates efficiently?

---

## Key Takeaway

> **Day of year:** sum days of all preceding months (adjusting February for leap years) and add the current day.
