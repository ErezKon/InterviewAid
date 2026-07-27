# 1495. Friendly Movies Streamed Last Month

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/friendly-movies-streamed-last-month](https://leetcode.com/problems/friendly-movies-streamed-last-month)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Join + Filter ✅](#2-approach-sql-join--filter-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find distinct titles of kid-friendly movies streamed in June 2020. (SQL problem)

---

## 2. Approach: SQL Join + Filter ✅

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

## 3. Key Takeaway

> Simple join with filters on content type, kid-friendliness, and date range.
