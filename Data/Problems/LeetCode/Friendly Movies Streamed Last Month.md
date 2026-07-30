# 1495. Friendly Movies Streamed Last Month

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/friendly-movies-streamed-last-month](https://leetcode.com/problems/friendly-movies-streamed-last-month)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Join + Filter ✅](#3-approach-sql-join--filter-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Find distinct titles of kid‑friendly movies streamed in June 2020. (SQL problem)

---

## 2. Examples

**Example**
```sql
Content table:
+----+----------+-----------+------------+
| id | title    | Kids_content | content_type |
+----+----------+-----------+------------+
| 1  | "Toy Story" | 'Y'       | 'Movies'   |
| 2  | "Space Adventure" | 'N' | 'Movies' |
+----+----------+-----------+------------+

TVProgram table (June 2020):
+----+------------+------------+
| id | content_id | program_date |
+----+------------+------------+
| 1  | 1          | '2020-06-15' |
| 2  | 2          | '2020-06-20' |
+----+------------+------------+
```
*Result*: `"Toy Story"`

---

## 3. Approach: SQL Join + Filter ✅

```sql
SELECT DISTINCT c.title
FROM Content c
JOIN TVProgram t ON c.content_id = t.content_id
WHERE c.Kids_content = 'Y'
  AND c.content_type = 'Movies'
  AND MONTH(t.program_date) = 6
  AND YEAR(t.program_date) = 2020;
```

---

## 4. Walkthrough

1. **Join** `Content` with `TVProgram` on `content_id` to associate movies with their streaming dates.
2. **Filter** rows where `Kids_content = 'Y'` and `content_type = 'Movies'` to keep only kid‑friendly movies.
3. **Date filter** – `MONTH` = 6 and `YEAR` = 2020 restricts to June 2020.
4. **Distinct** – `SELECT DISTINCT` removes duplicate titles that may appear on multiple program dates.

---

## 5. Complexity Analysis

*Time*: O(N) where N is the number of rows processed by the join (depends on table sizes). 
*Space*: O(K) for the result set of distinct titles, where K ≤ number of kid‑friendly movies streamed in June 2020.

---

## 6. Follow-Up Questions

- How would you modify the query to return the total number of streams per kid‑friendly movie?
- Extend the query to handle a date range instead of a single month.
- Include only movies with a rating above a certain threshold.

---

## 7. Key Takeaway

> Simple join with filters on content type, kid‑friendliness, and date range.
