# 1360. Number of Days Between Two Dates

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-days-between-two-dates](https://leetcode.com/problems/number-of-days-between-two-dates)
**Companies:** Amazon, Google, Meta, Microsoft, Optiver

---

## 1. Problem Description

Write a program to count the number of days between two dates.

The two dates are given as strings, their format is `YYYY-MM-DD` as shown in the examples.

**Constraints:**

- The given dates are valid dates between the years `1971` and `2100`.

---

## 2. Examples

```
Example 1:
  Input: date1 = "2019-06-29", date2 = "2019-06-30"
  Output: 1
```

```
Example 2:
  Input: date1 = "2020-01-15", date2 = "2019-12-31"
  Output: 15
```

---

## 3. Approach: Date Parsing — O(1) ✅

```text
FUNCTION daysBetweenDates(date1, date2):
    // Convert ISO strings to date objects
    d1 ← PARSE_DATE(date1)
    d2 ← PARSE_DATE(date2)
    // Compute absolute difference in days
    RETURN ABS(d2 - d1)
```

---

## 4. Walkthrough

Consider `date1 = "2020-01-15"` and `date2 = "2020-01-20"`.

| Step | Action | Result |
|------|--------|--------|
| 1 | Parse `date1` | d1 = Jan 15, 2020 |
| 2 | Parse `date2` | d2 = Jan 20, 2020 |
| 3 | Compute difference | d2 - d1 = 5 days |
| 4 | Absolute value | 5 |

The function returns `5`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you implement the solution without using built‑in date libraries?
2. How do you handle leap years and different month lengths when calculating manually?
3. Can you extend the function to support time zones or timestamps?

---

## Key Takeaway

> **Use library date parsing.** In interviews, mention leap year rules if implementing from scratch: divisible by 4, except centuries unless divisible by 400.
