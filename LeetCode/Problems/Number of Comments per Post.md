# 1241. Number of Comments per Post

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-comments-per-post](https://leetcode.com/problems/number-of-comments-per-post)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Find the number of comments for each post. Posts have `parent_id IS NULL`; comments reference the post via `parent_id`.

---

## 2. Solution: SQL ✅

```sql
SELECT p.sub_id AS post_id, COUNT(DISTINCT c.sub_id) AS number_of_comments
FROM Submissions p
LEFT JOIN Submissions c ON p.sub_id = c.parent_id
WHERE p.parent_id IS NULL
GROUP BY p.sub_id
ORDER BY post_id;
```

---

## 3. Key Takeaway

> **Self-join for parent-child relationship.** LEFT JOIN to include posts with zero comments. Filter posts with `parent_id IS NULL`.
