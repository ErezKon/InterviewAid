# 620. Not Boring Movies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/not-boring-movies](https://leetcode.com/problems/not-boring-movies)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Examples](#3-examples)
4. [Approach](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Table: `Cinema`

```
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| id             | int      |
| movie          | varchar  |
| description    | varchar  |
| rating         | float    |
+----------------+----------+
id is the primary key (column with unique values) for this table.
Each row contains information about the name of a movie, its genre, and its rating.
rating is a 2 decimal places float in the range [0, 10]
```

Write a solution to report the movies with an odd-numbered ID and a description that is not `"boring"`.

Return the result table ordered by `rating` **in descending order**.

The result format is in the following example.

---

## 2. Solution: SQL ✅

```sql
SELECT * FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
```

---

## 3. Examples

```
Example 1:
  Input:
  Cinema table:
  +----+------------+-------------+--------+
  | id | movie      | description | rating |
  +----+------------+-------------+--------+
  | 1  | War        | great 3D    | 8.9    |
  | 2  | Science    | fiction     | 8.5    |
  | 3  | irish      | boring      | 6.2    |
  | 4  | Ice song   | Fantacy     | 8.6    |
  | 5  | House card | Interesting | 9.1    |
  +----+------------+-------------+--------+
  Output:
  +----+------------+-------------+--------+
  | id | movie      | description | rating |
  +----+------------+-------------+--------+
  | 5  | House card | Interesting | 9.1    |
  | 1  | War        | great 3D    | 8.9    |
  +----+------------+-------------+--------+
  Explanation:
  We have three movies with odd-numbered IDs: 1, 3, and 5. The movie with ID = 3 is boring so we do not include it in the answer.
```

---

## 4. Approach

The problem is a pure data‑retrieval task. Use a `WHERE` clause to filter odd `id` (`id % 2 = 1`) and exclude `'boring'` descriptions, then sort by `rating` descending.

---

## 5. Walkthrough

1. **Filter odd IDs:** `id % 2 = 1` keeps rows 1,3,…
2. **Exclude boring:** `description != 'boring'` removes any row with that description.
3. **Order:** `ORDER BY rating DESC` sorts the remaining rows from highest to lowest rating.
4. The query returns the final ordered list.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) – scanning each row once (SQL engine dependent) |
| **Space** | O(k) – space for `k` result rows |

---

## 7. Key Takeaway

> Simple `WHERE` filters combined with `ORDER BY` solve the task; no procedural code needed.
