# 197. Rising Temperature

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rising-temperature](https://leetcode.com/problems/rising-temperature)
**Companies:** Accenture, Amazon, Bloomberg, Cisco, Cognizant, Deloitte, Fractal Analytics, Google, Meesho, Meta, Microsoft, Walmart Labs

---

## Problem Description

Table: `Weather`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id is the column with unique values for this table.
There are no different rows with the same recordDate.
This table contains information about the temperature on a certain day.
```

Write a solution to find all dates' `id` with higher temperatures compared to its previous calendar dates (yesterday).

Return the result table in **any order**.

The result format is in the following example.

---

## Approach

```sql
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
```

---

## Examples

**Example 1:**
```
Input:
Weather table:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
Output:
+----+
| id |
+----+
| 2  |
| 4  |
+----+
Explanation:
In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
In 2015-01-04, the temperature was higher than the previous day (20 -> 30).
```

---

## Walkthrough

1. Self‑join the table on `recordDate` offset by one day.
2. Compare `w1.temperature` with `w2.temperature`.
3. Return `w1.id` where the condition holds.

---

## Complexity Analysis

- **Time:** O(n) – each row participates in at most one join.
- **Space:** O(1) extra beyond the input table.

---

## Follow-Up Questions

- How would you modify the query to find days with a temperature drop?
- How to handle missing dates in the dataset?
- Can you compute the longest streak of rising temperatures?

---

## Key Takeaway

> Self‑join with `DATEDIFF = 1` connects each day to its predecessor — the standard SQL pattern for comparing consecutive rows by date.
