# 1185. Day of the Week

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/day-of-the-week](https://leetcode.com/problems/day-of-the-week)
**Companies:** Google, Microsoft, Zoho

---

## Problem Description

Given a date (day, month, year), return the day of the week as a string.

---

## Examples

| Input | Output |
|-------|--------|
| `day = 31, month = 8, year = 2019` | `"Saturday"` |
| `day = 18, month = 7, year = 1999` | `"Sunday"` |
| `day = 15, month = 8, year = 1993` | `"Sunday"` |

*Explanation:* Using the Gregorian calendar, these dates correspond to the shown weekdays.

---

## Walkthrough

We use Zeller's Congruence (or built‑in datetime) to compute the weekday.

1. Adjust month and year: if month ≤ 2, month += 12 and year‑‑.
2. Compute:
   `K = year % 100`
   `J = year // 100`
   `h = (day + (13*(month+1))//5 + K + K//4 + J//4 + 5*J) % 7`
3. Map `h` to weekday name where 0 = Saturday, 1 = Sunday, …, 6 = Friday.

For `31/8/2019`:
- month = 8 (no adjustment), K = 19, J = 20
- h = (31 + (13*9)//5 + 19 + 19//4 + 20//4 + 5*20) % 7 = 0 → Saturday.

---

## Approach

```
FUNCTION dayOfTheWeek(day, month, year):
    IF month ≤ 2:
        month ← month + 12
        year ← year - 1
    K ← year % 100
    J ← year // 100
    h ← (day + (13*(month+1)) // 5 + K + K // 4 + J // 4 + 5*J) % 7
    days ← ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
    RETURN days[h]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) — constant arithmetic operations |
| **Space** | O(1) — only a few integer variables |

---

## Follow-Up Questions

* How would you handle dates before the Gregorian reform?
* Can you compute the day of the week without division/modulo operations?
* Extend the solution to support multiple calendar systems.

---

## Key Takeaway

> **Date to weekday:** Adjust month/year for Jan/Feb, apply Zeller’s formula, and map the result to a weekday name.
