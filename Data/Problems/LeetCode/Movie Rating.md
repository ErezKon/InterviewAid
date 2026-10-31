# 1341. Movie Rating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/movie-rating](https://leetcode.com/problems/movie-rating)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Sap

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Examples](#4-examples)
5. [Approach](#5-approach)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)
9. [Key Takeaway](#9-key-takeaway)

---

## 1. Problem Description

Table: `Movies`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| movie_id      | int     |
| title         | varchar |
+---------------+---------+
movie_id is the primary key (column with unique values) for this table.
title is the name of the movie.
Each movie has a unique title.
```

Table: `Users`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| name          | varchar |
+---------------+---------+
user_id is the primary key (column with unique values) for this table.
The column 'name' has unique values.
```

Table: `MovieRating`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| movie_id      | int     |
| user_id       | int     |
| rating        | int     |
| created_at    | date    |
+---------------+---------+
(movie_id, user_id) is the primary key (column with unique values) for this table.
This table contains the rating of a movie by a user in their review.
created_at is the user's review date.
```

Write a solution to:

- Find the name of the user who has rated the greatest number of movies. In case of a tie, return the lexicographically smaller user name.
- Find the movie name with the **highest average** rating in `February 2020`. In case of a tie, return the lexicographically smaller movie name.

The result format is in the following example. 

---

## 2. Key Insight

> Two independent queries combined with `UNION ALL`. First query: group by user, count ratings, order by count desc then name. Second query: filter Feb 2020, group by movie, order by avg desc then title.

---

## 3. Solution: SQL ✅

```sql
(SELECT u.name AS results
 FROM MovieRating mr
 JOIN Users u ON mr.user_id = u.user_id
 GROUP BY mr.user_id
 ORDER BY COUNT(*) DESC, u.name
 LIMIT 1)

UNION ALL

(SELECT m.title AS results
 FROM MovieRating mr
 JOIN Movies m ON mr.movie_id = m.movie_id
 WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'
 GROUP BY mr.movie_id
 ORDER BY AVG(mr.rating) DESC, m.title
 LIMIT 1);
```

---

## 4. Examples

```
Example 1:
  Input:
  Movies table:
  +-------------+--------------+
  | movie_id    |  title       |
  +-------------+--------------+
  | 1           | Avengers     |
  | 2           | Frozen 2     |
  | 3           | Joker        |
  +-------------+--------------+
  Users table:
  +-------------+--------------+
  | user_id     |  name        |
  +-------------+--------------+
  | 1           | Daniel       |
  | 2           | Monica       |
  | 3           | Maria        |
  | 4           | James        |
  +-------------+--------------+
  MovieRating table:
  +-------------+--------------+--------------+-------------+
  | movie_id    | user_id      | rating       | created_at  |
  +-------------+--------------+--------------+-------------+
  | 1           | 1            | 3            | 2020-01-12  |
  | 1           | 2            | 4            | 2020-02-11  |
  | 1           | 3            | 2            | 2020-02-12  |
  | 1           | 4            | 1            | 2020-01-01  |
  | 2           | 1            | 5            | 2020-02-17  |
  | 2           | 2            | 2            | 2020-02-01  |
  | 2           | 3            | 2            | 2020-03-01  |
  | 3           | 1            | 3            | 2020-02-22  |
  | 3           | 2            | 4            | 2020-02-25  |
  +-------------+--------------+--------------+-------------+
  Output:
  +--------------+
  | results      |
  +--------------+
  | Daniel       |
  | Frozen 2     |
  +--------------+
  Explanation:
  Daniel and Monica have rated 3 movies ("Avengers", "Frozen 2" and "Joker") but Daniel is smaller lexicographically.
  Frozen 2 and Joker have a rating average of 3.5 in February but Frozen 2 is smaller lexicographically.
```
 
---

## 5. Approach

```text
FUNCTION getTopUserAndMovie():
    // Query 1: user with most ratings
    SELECT u.name
    FROM MovieRating mr
    JOIN Users u ON mr.user_id = u.user_id
    GROUP BY mr.user_id
    ORDER BY COUNT(*) DESC, u.name ASC
    LIMIT 1;

    // Query 2: movie with highest avg rating in Feb 2020
    SELECT m.title
    FROM MovieRating mr
    JOIN Movies m ON mr.movie_id = m.movie_id
    WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'
    GROUP BY mr.movie_id
    ORDER BY AVG(mr.rating) DESC, m.title ASC
    LIMIT 1;

    UNION ALL the two results.
```

---

## 6. Walkthrough

1. **User query:** Group ratings by `user_id`, count rows, sort descending by count, then alphabetically by `name`. The first row is the desired user.
2. **Movie query:** Filter rows where `created_at` falls in February 2020, group by `movie_id`, compute `AVG(rating)`, sort descending by average, then alphabetically by `title`. The first row is the desired movie.
3. Combine both results with `UNION ALL` to produce a single column output.

---

## 7. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N log N) for sorting groups (handled by the DB engine) |
| **Space** | O(N) for intermediate aggregation tables |

---

## 8. Follow-Up Questions

- How would you modify the query to handle ties by returning all top users or movies?
- What if the rating period is dynamic (e.g., any given month) – how would you parameterize the query?
- Can you achieve the same result using window functions instead of `UNION ALL`?

---

## 9. Key Takeaway

> **Two independent ranked sub-queries combined with `UNION ALL`.** Each sub-query uses `GROUP BY`, `ORDER BY` with tie-breakers, and `LIMIT 1` to extract the top result.
