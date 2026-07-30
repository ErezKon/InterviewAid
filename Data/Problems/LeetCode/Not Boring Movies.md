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

Select movies with odd `id` and description not equal to `'boring'`, ordered by rating descending.

---

## 2. Solution: SQL ✅

```sql
SELECT * FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
```

---

## 3. Examples

| id | description | rating |
|----|-------------|--------|
| 1  | "exciting" | 9.2 |
| 2  | "boring"   | 5.1 |
| 3  | "thrilling"| 8.7 |

**Result:** rows with `id` 1 and 3, ordered by rating → `(1, 9.2)`, `(3, 8.7)`.

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
