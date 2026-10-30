# 1445. Apples & Oranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apples-oranges](https://leetcode.com/problems/apples-oranges)
**Companies:** Meta

---

## 1. Problem Description

*(SQL problem)*

Table: `Sales`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| sale_date     | date    |
| fruit         | enum    |
| sold_num      | int     |
+---------------+---------+
(sale_date, fruit) is the primary key (combination of columns with unique values) of this table.
This table contains the sales of "apples" and "oranges" sold each day.
```

Write a solution to report the difference between the number of **apples** and **oranges** sold each day.

Return the result table **ordered** by `sale_date`.

---

## 2. Approach: Conditional Aggregation — O(n) ✅

```sql
SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;
```

---

## 3. Examples

```
Example 1:
  Input:
  Sales table:
  +------------+------------+-------------+
  | sale_date  | fruit      | sold_num    |
  +------------+------------+-------------+
  | 2020-05-01 | apples     | 10          |
  | 2020-05-01 | oranges    | 8           |
  | 2020-05-02 | apples     | 15          |
  | 2020-05-02 | oranges    | 15          |
  | 2020-05-03 | apples     | 20          |
  | 2020-05-03 | oranges    | 0           |
  | 2020-05-04 | apples     | 15          |
  | 2020-05-04 | oranges    | 16          |
  +------------+------------+-------------+
  Output:
  +------------+--------------+
  | sale_date  | diff         |
  +------------+--------------+
  | 2020-05-01 | 2            |
  | 2020-05-02 | 0            |
  | 2020-05-03 | 20           |
  | 2020-05-04 | -1           |
  +------------+--------------+
  Explanation:
  Day 2020-05-01, 10 apples and 8 oranges were sold (Difference 10 - 8 = 2).
  Day 2020-05-02, 15 apples and 15 oranges were sold (Difference 15 - 15 = 0).
  Day 2020-05-03, 20 apples and 0 oranges were sold (Difference 20 - 0 = 20).
  Day 2020-05-04, 15 apples and 16 oranges were sold (Difference 15 - 16 = -1).
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Group rows by `sale_date`.
| 2 | For each row, emit `sold_num` if `fruit='apples'`, otherwise `-sold_num`.
| 3 | Sum the emitted values per date to get the net difference.
| 4 | Order the result by `sale_date` for readability.

---

## 5. Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Sales` (single scan).
- **Space:** O(D) for storing aggregates per distinct date D.

---

## Key Takeaway

> Use `CASE` inside `SUM` to pivot two categories into a single aggregated difference per group.
