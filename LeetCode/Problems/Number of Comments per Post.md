# 1241. Number of Comments per Post

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-comments-per-post](https://leetcode.com/problems/number-of-comments-per-post)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#problem-description)
2. [Examples](#examples)
3. [Approach](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a table `Submissions` with columns `sub_id` (submission ID) and `parent_id` (the ID of the parent submission), find the number of comments for each post. A post is a submission where `parent_id IS NULL`; comments reference the post via `parent_id`.

---

## Examples

**Example:**
```
Submissions table:
+--------+-----------+
| sub_id | parent_id |
+--------+-----------+
| 1      | NULL      |
| 2      | 1         |
| 3      | 1         |
| 4      | NULL      |
| 5      | 4         |
+--------+-----------+
```
**Result:**
```
post_id | number_of_comments
--------+--------------------
1       | 2
4       | 1
```
The first post (ID 1) has two comments (IDs 2, 3); the second post (ID 4) has one comment (ID 5).

---

## Approach

Use a self‑join on the `Submissions` table.
1. Select all rows where `parent_id IS NULL` as posts.
2. LEFT JOIN the same table on `post.sub_id = comment.parent_id` to count comments, including posts with zero comments.
3. GROUP BY the post ID.

```text
FUNCTION commentCountSQL():
    RETURN "SELECT p.sub_id AS post_id, COUNT(c.sub_id) AS number_of_comments\n            FROM Submissions p\n            LEFT JOIN Submissions c ON p.sub_id = c.parent_id\n            WHERE p.parent_id IS NULL\n            GROUP BY p.sub_id\n            ORDER BY post_id;"
```

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Identify posts (`parent_id IS NULL`). | Rows 1 and 4 are posts. |
| 2 | LEFT JOIN comments on `post.sub_id = comment.parent_id`. | Comments 2,3 join to post 1; comment 5 joins to post 4. |
| 3 | GROUP BY post ID and COUNT comment IDs. | Post 1 → 2 comments, Post 4 → 1 comment. |
| 4 | ORDER BY post ID for deterministic output. |

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N) – single scan of the table during join and aggregation |
| **Space** | O(G) – space for groups, where G is number of posts |

---

## Follow-Up Questions

1. How would you modify the query to include the content of each comment?
2. What index would you create to optimise this query for large tables?
3. How can you retrieve the top‑k posts with the most comments?

---

## Key Takeaway

> **Self‑join** a table to relate parent‑child rows, then **LEFT JOIN** to include parents with zero children.
