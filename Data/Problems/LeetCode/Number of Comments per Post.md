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

Table: `Submissions`

```
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| sub_id        | int      |
| parent_id     | int      |
+---------------+----------+
This table may have duplicate rows.
Each row can be a post or comment on the post.
parent_id is null for posts.
parent_id for comments is sub_id for another post in the table.
```

Write a solution to find the number of comments per post. The result table should contain `post_id` and its corresponding `number_of_comments`.

The `Submissions` table may contain duplicate comments. You should count the number of **unique comments** per post.

The `Submissions` table may contain duplicate posts. You should treat them as one post.

The result table should be **ordered** by `post_id` in **ascending order**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Submissions table:
  +---------+------------+
  | sub_id  | parent_id  |
  +---------+------------+
  | 1       | Null       |
  | 2       | Null       |
  | 1       | Null       |
  | 12      | Null       |
  | 3       | 1          |
  | 5       | 2          |
  | 3       | 1          |
  | 4       | 1          |
  | 9       | 1          |
  | 10      | 2          |
  | 6       | 7          |
  +---------+------------+
  Output:
  +---------+--------------------+
  | post_id | number_of_comments |
  +---------+--------------------+
  | 1       | 3                  |
  | 2       | 2                  |
  | 12      | 0                  |
  +---------+--------------------+
  Explanation:
  The post with id 1 has three comments in the table with id 3, 4, and 9. The comment with id 3 is repeated in the table, we counted it only once.
  The post with id 2 has two comments in the table with id 5 and 10.
  The post with id 12 has no comments in the table.
  The comment with id 6 is a comment on a deleted post with id 7 so we ignored it.
```

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
