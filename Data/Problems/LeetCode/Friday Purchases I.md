# 2993. Friday Purchases I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friday-purchases-i](https://leetcode.com/problems/friday-purchases-i)
**Companies:** Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Date Filter ✅](#3-approach-sql-date-filter-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Find total purchases made on Fridays. Group by week and return the sum. (SQL problem)

---

## 2. Examples

| purchase_date | amount_spend |
|---------------|--------------|
| 2023-11-03    | 120          |
| 2023-11-10    | 80           |
| 2023-11-17    | 150          |
| 2023-11-24    | 200          |

**Result:**
```
week_of_month | total_amount
1             | 120
2             | 80
3             | 150
4             | 200
```

---

## 3. Approach: SQL Date Filter ✅

```sql
SELECT
    CEIL(DAY(purchase_date) / 7) AS week_of_month,
    SUM(amount_spend) AS total_amount
FROM Purchases
WHERE DAYOFWEEK(purchase_date) = 6  -- Friday
  AND MONTH(purchase_date) = 11
  AND YEAR(purchase_date) = 2023
GROUP BY week_of_month
ORDER BY week_of_month;
```

---

## 4. Walkthrough

1. **Filter Fridays** – `DAYOFWEEK(purchase_date) = 6` selects only Friday rows.
2. **Restrict to month/year** – `MONTH` and `YEAR` limit to November 2023.
3. **Compute week number** – `CEIL(DAY/7)` converts the day of month to a week index (1‑4).
4. **Aggregate** – `SUM(amount_spend)` gives total spend per week.
5. **Order** – `ORDER BY week_of_month` returns results chronologically.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) – scans each row once (handled by the DB engine) |
| **Space** | O(w) – stores aggregates for `w` weeks (constant ≤ 5) |

---

## 6. Follow-Up Questions

- How would you modify the query to handle purchases across multiple months?
- Can you write a version that returns the day with the highest total spend instead of weekly totals?
- How would you adapt the solution for a NoSQL database that lacks `DAYOFWEEK`?

---

## 7. Key Takeaway

> Use `DAYOFWEEK` to filter Fridays, `CEIL(DAY/7)` to bucket by week, and aggregate with `SUM`.
