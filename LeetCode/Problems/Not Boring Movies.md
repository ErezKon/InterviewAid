# 620. Not Boring Movies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/not-boring-movies](https://leetcode.com/problems/not-boring-movies)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Select movies with odd `id` and description not equal to `'boring'`, ordered by rating descending.

---

## 2. Solution: SQL ✅

```sql
SELECT * FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
```

---

## 3. Key Takeaway

> **Simple WHERE filter with modulo for odd check.** `id % 2 = 1` filters odd IDs.
