# 1148. Article Views I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/article-views-i](https://leetcode.com/problems/article-views-i)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Linkedin, Meta, Microsoft, Tcs

---

## Problem Description
Table: `Views`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+
There is no primary key (column with unique values) for this table, the table may have duplicate rows.
Each row of this table indicates that some viewer viewed an article (written by some author) on some date.
Note that equal author_id and viewer_id indicate the same person.
```

Write a solution to find all the authors that viewed at least one of their own articles.

Return the result table sorted by `id` in ascending order.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Views table:
  +------------+-----------+-----------+------------+
  | article_id | author_id | viewer_id | view_date  |
  +------------+-----------+-----------+------------+
  | 1          | 3         | 5         | 2019-08-01 |
  | 1          | 3         | 6         | 2019-08-02 |
  | 2          | 7         | 7         | 2019-08-01 |
  | 2          | 7         | 6         | 2019-08-02 |
  | 4          | 7         | 1         | 2019-07-22 |
  | 3          | 4         | 4         | 2019-07-21 |
  | 3          | 4         | 4         | 2019-07-21 |
  +------------+-----------+-----------+------------+
  Output:
  +------+
  | id   |
  +------+
  | 4    |
  | 7    |
  +------+
```

## Approach
The task is a straightforward filtering and deduplication operation in SQL:
1. Filter rows where `author_id = viewer_id`.
2. Select the distinct `author_id` values.
3. Order the result ascending.

### SQL Query
```sql
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;
```

## Walkthrough
Consider the example table above:
1. The `WHERE` clause keeps rows `(2,2)` and `(3,3)`.
2. `SELECT DISTINCT` extracts the unique `author_id`s: `2` and `3`.
3. `ORDER BY id` returns them in ascending order: `[2, 3]`.

## Complexity Analysis
- **Time Complexity:** O(N) – the database scans each row once.
- **Space Complexity:** O(K) – where K is the number of distinct authors who viewed their own articles (output size).

## Follow-Up Questions
- How would you modify the query to also return the count of self-views per author?
- How can you handle large datasets efficiently (e.g., using indexes)?
- Extend the problem to return authors who have viewed **any** of their articles, not just self-views.

## Key Takeaway
A simple `WHERE` filter combined with `SELECT DISTINCT` and `ORDER BY` solves the problem of finding authors who viewed their own articles.
