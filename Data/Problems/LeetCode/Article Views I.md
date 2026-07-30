# 1148. Article Views I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/article-views-i](https://leetcode.com/problems/article-views-i)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Linkedin, Meta, Microsoft, Tcs

---

## Problem Description
You are given a table `Views` with the following columns:
- `author_id` – the ID of the author of an article.
- `viewer_id` – the ID of the user who viewed the article.

Return a list of **distinct** `author_id`s where the author has viewed **their own** article (i.e., `author_id = viewer_id`). The result should be ordered in ascending order of `author_id`.

## Examples
| author_id | viewer_id |
|-----------|-----------|
| 1         | 2         |
| 2         | 2         |
| 3         | 1         |
| 3         | 3         |

**Output:** `[2, 3]`

Explanation: Author 2 viewed their own article, and author 3 also viewed their own article. Author 1 never viewed their own article.

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

## Follow‑Up Questions
- How would you modify the query to also return the count of self‑views per author?
- How can you handle large datasets efficiently (e.g., using indexes)?
- Extend the problem to return authors who have viewed **any** of their articles, not just self‑views.

## Key Takeaway
A simple `WHERE` filter combined with `SELECT DISTINCT` and `ORDER BY` solves the problem of finding authors who viewed their own articles.
