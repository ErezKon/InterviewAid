# 1185. Day of the Week

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/day-of-the-week](https://leetcode.com/problems/day-of-the-week)
**Companies:** Google, Microsoft, Zoho

---

## Problem Description

Given a date (day, month, year), return the day of the week as a string.

---

## Approach

```
FUNCTION dayOfTheWeek(day, month, year):
    import datetime
    days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    RETURN days[datetime.date(year, month, day).weekday()]
```

---

## Key Takeaway

> **Use built-in datetime libraries. Alternatively, Zeller's congruence or Tomohiko Sakamoto's algorithm computes the day of the week from scratch.**
