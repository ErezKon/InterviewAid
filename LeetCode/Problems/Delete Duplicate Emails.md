# 196. Delete Duplicate Emails

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-duplicate-emails](https://leetcode.com/problems/delete-duplicate-emails)
**Companies:** Amazon, Bloomberg, Dell, Google, Infosys, Maq Software, Meta, Microsoft, Tcs

---

## Problem Description

SQL: Delete duplicate emails, keeping only the row with the smallest `id`.

---

## Approach

```sql
DELETE p1 FROM Person p1
JOIN Person p2 ON p1.email = p2.email
WHERE p1.id > p2.id;
```

---

## Key Takeaway

> **Self-join to find duplicates: join on the duplicate column, then DELETE rows with the larger id. Classic SQL deduplication pattern.**
