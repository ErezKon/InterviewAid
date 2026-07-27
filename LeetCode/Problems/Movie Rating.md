# 1341. Movie Rating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/movie-rating](https://leetcode.com/problems/movie-rating)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Sap

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Find (1) the user who has rated the most movies (alphabetically first for ties), and (2) the movie with the highest average rating in Feb 2020 (alphabetically first for ties).

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

## 4. Key Takeaway

> **UNION ALL of two independent ranked queries.** Each subquery uses GROUP BY + ORDER BY + LIMIT 1 to pick the top result.
