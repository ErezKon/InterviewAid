# 2993. Friday Purchases I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friday-purchases-i](https://leetcode.com/problems/friday-purchases-i)
**Companies:** Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Date Filter ✅](#2-approach-sql-date-filter-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find total purchases made on Fridays. Group by week and return the sum. (SQL problem)

---

## 2. Approach: SQL Date Filter ✅

```sql
SELECT
    CEIL(DAY(purchase_date) / 7) AS week_of_month,
    purchase_date,
    SUM(amount_spend) AS total_amount
FROM Purchases
WHERE DAYOFWEEK(purchase_date) = 6  -- Friday
  AND MONTH(purchase_date) = 11
  AND YEAR(purchase_date) = 2023
GROUP BY week_of_month, purchase_date
ORDER BY week_of_month;
```

---

## 3. Key Takeaway

> Filter by day of week (Friday), group by week number within the month, and sum amounts.
