# 182. Duplicate Emails

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/duplicate-emails](https://leetcode.com/problems/duplicate-emails)
**Companies:** Amazon, Bloomberg, Epam Systems, Google, Meta, Microsoft, Tcs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: GROUP BY + HAVING](#approach-group-by--having)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a `Person` table with columns `id` and `email`, find all **duplicate** emails (appearing more than once).

---

## Examples

```
Input:
| id | email   |
|----|---------|
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |

Output:
| Email   |
|---------|
| a@b.com |
```

---

## Key Insight

> `GROUP BY email` groups rows by email address. `HAVING COUNT(*) > 1` filters to only those groups with more than one occurrence — i.e., duplicates.

---

## Approach: GROUP BY + HAVING

```sql
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) |
| **Space** | O(n) for grouping |

---

## Key Takeaway

> **`GROUP BY` + `HAVING` is the standard SQL pattern for finding duplicates. `WHERE` filters rows before grouping; `HAVING` filters groups after.**
