# 1149. Article Views II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/article-views-ii](https://leetcode.com/problems/article-views-ii)
**Companies:** Linkedin

---

## 1. Problem Description

**SQL Problem.**

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
This table may have duplicate rows.
Each row of this table indicates that some viewer viewed an article (written by some author) on some date.
Note that equal author_id and viewer_id indicate the same person.
```

Write a solution to find all the people who viewed more than one article on the same date.

Return the result table sorted by `id` in ascending order.

The result format is in the following example.

## 2. Examples

```
Example 1:
  Input:
  Views table:
  +------------+-----------+-----------+------------+
  | article_id | author_id | viewer_id | view_date  |
  +------------+-----------+-----------+------------+
  | 1          | 3         | 5         | 2019-08-01 |
  | 3          | 4         | 5         | 2019-08-01 |
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
  | 5    |
  | 6    |
  +------+
```

## 3. Approach

Group by `viewer_id` and `view_date`, count distinct `article_id`, and keep groups with count > 1.

```sql
SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY viewer_id, view_date
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY id;
```

## 4. Walkthrough

1. **Group** rows by each `(viewer_id, view_date)` pair.
2. **Count** distinct `article_id` within each group.
3. **Filter** groups where the count exceeds 1 using `HAVING`.
4. **Select** distinct `viewer_id` values and order them.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(N log N) for grouping (depends on DB engine) | O(G) where G is number of groups |

## 6. Follow‑Up Questions

- How would you modify the query to return the specific dates on which each viewer satisfied the condition?
- What if you need to consider a sliding window of 7 days instead of a single day?
- How would you handle very large tables efficiently (e.g., using indexes)?

## Key Takeaway

> Grouping by `(viewer_id, view_date)` and applying a `HAVING` clause on the distinct article count isolates viewers who read multiple articles on the same day.
