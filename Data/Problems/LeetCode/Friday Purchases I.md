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

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode. The Approach below does not output the official `purchase_date` column.*

Table: `Purchases`

```
+---------------+------+
| Column Name   | Type |
+---------------+------+
| user_id       | int  |
| purchase_date | date |
| amount_spend  | int  |
+---------------+------+
(user_id, purchase_date, amount_spend) is the primary key (combination of columns with unique values) for this table.
purchase_date will range from November 1, 2023, to November 30, 2023, inclusive of both dates.
Each row contains user id, purchase date, and amount spend.
```

Write a solution to calculate the **total spending** by users on **each Friday** of **every week** in **November 2023**. Output only weeks that include **at least one** purchase on a **Friday**.

Return *the result table ordered by week of month in **ascending** order* (columns: `week_of_month`, `purchase_date`, `total_amount`).

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Purchases table:
+---------+---------------+--------------+
| user_id | purchase_date | amount_spend |
+---------+---------------+--------------+
| 11      | 2023-11-07    | 1126         |
| 15      | 2023-11-30    | 7473         |
| 17      | 2023-11-14    | 2414         |
| 12      | 2023-11-24    | 9692         |
| 8       | 2023-11-03    | 5117         |
| 1       | 2023-11-16    | 5241         |
| 10      | 2023-11-12    | 8266         |
| 13      | 2023-11-24    | 12000        |
+---------+---------------+--------------+
Output:
+---------------+---------------+--------------+
| week_of_month | purchase_date | total_amount |
+---------------+---------------+--------------+
| 1             | 2023-11-03    | 5117         |
| 4             | 2023-11-24    | 21692        |
+---------------+---------------+--------------+
Explanation:
- During the first week of November 2023, transactions amounting to $5,117 occurred on Friday, 2023-11-03.
- For the second week of November 2023, there were no transactions on Friday, 2023-11-10.
- Similarly, during the third week of November 2023, there were no transactions on Friday, 2023-11-17.
- In the fourth week of November 2023, two transactions took place on Friday, 2023-11-24, amounting to $12,000 and $9,692 respectively, summing up to a total of $21,692.
Output table is ordered by week_of_month in ascending order.
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
2. **Restrict to month/year** – `MONTH` and `YEAR` limit to November 2023.
3. **Compute week number** – `CEIL(DAY/7)` converts the day of month to a week index (1-4).
4. **Aggregate** – `SUM(amount_spend)` gives total spend per week.
5. **Order** – `ORDER BY week_of_month` returns results chronologically.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) – scans each row once (handled by the DB engine) |
| **Space** | O(w) – stores aggregates for `w` weeks (constant ≤ 5) |

---

## 6. Follow-Up Questions

- How would you modify the query to handle purchases across multiple months?
- Can you write a version that returns the day with the highest total spend instead of weekly totals?
- How would you adapt the solution for a NoSQL database that lacks `DAYOFWEEK`?

---

## 7. Key Takeaway

> Use `DAYOFWEEK` to filter Fridays, `CEIL(DAY/7)` to bucket by week, and aggregate with `SUM`.
