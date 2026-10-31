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

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode.*

Table: `TVProgram`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| program_date  | date    |
| content_id    | int     |
| channel       | varchar |
+---------------+---------+
(program_date, content_id) is the primary key (combination of columns with unique values) for this table.
This table contains information of the programs on the TV.
content_id is the id of the program in some channel on the TV.
```

Table: `Content`

```
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| content_id       | varchar |
| title            | varchar |
| Kids_content     | enum    |
| content_type     | varchar |
+------------------+---------+
content_id is the primary key (column with unique values) for this table.
Kids_content is an ENUM (category) of types ('Y', 'N') where:
'Y' means is content for kids otherwise 'N' is not content for kids.
content_type is the category of the content as movies, series, etc.
```

Write a solution to report the distinct titles of the kid-friendly movies streamed in **June 2020**.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
TVProgram table:
+--------------------+--------------+-------------+
| program_date       | content_id   | channel     |
+--------------------+--------------+-------------+
| 2020-06-10 08:00   | 1            | LC-Channel  |
| 2020-05-11 12:00   | 2            | LC-Channel  |
| 2020-05-12 12:00   | 3            | LC-Channel  |
| 2020-05-13 14:00   | 4            | Disney Ch   |
| 2020-06-18 14:00   | 4            | Disney Ch   |
| 2020-07-15 16:00   | 5            | Disney Ch   |
+--------------------+--------------+-------------+
Content table:
+------------+----------------+---------------+---------------+
| content_id | title          | Kids_content  | content_type  |
+------------+----------------+---------------+---------------+
| 1          | Leetcode Movie | N             | Movies        |
| 2          | Alg. for Kids  | Y             | Series        |
| 3          | Database Sols  | N             | Series        |
| 4          | Aladdin        | Y             | Movies        |
| 5          | Cinderella     | Y             | Movies        |
+------------+----------------+---------------+---------------+
Output:
+--------------+
| title        |
+--------------+
| Aladdin      |
+--------------+
Explanation:
"Leetcode Movie" is not a content for kids.
"Alg. for Kids" is not a movie.
"Database Sols" is not a movie
"Alladin" is a movie, content for kids and was streamed in June 2020.
"Cinderella" was not streamed in June 2020.
```

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
2. **Filter** rows where `Kids_content = 'Y'` and `content_type = 'Movies'` to keep only kid-friendly movies.
3. **Date filter** – `MONTH` = 6 and `YEAR` = 2020 restricts to June 2020.
4. **Distinct** – `SELECT DISTINCT` removes duplicate titles that may appear on multiple program dates.

---

## 5. Complexity Analysis

*Time*: O(N) where N is the number of rows processed by the join (depends on table sizes). 
*Space*: O(K) for the result set of distinct titles, where K ≤ number of kid-friendly movies streamed in June 2020.

---

## 6. Follow-Up Questions

- How would you modify the query to return the total number of streams per kid-friendly movie?
- Extend the query to handle a date range instead of a single month.
- Include only movies with a rating above a certain threshold.

---

## 7. Key Takeaway

> Simple join with filters on content type, kid-friendliness, and date range.
