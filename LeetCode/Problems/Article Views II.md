# 1149. Article Views II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/article-views-ii](https://leetcode.com/problems/article-views-ii)
**Companies:** Linkedin

---

## 1. Problem Description

**SQL Problem.** Given a `Views` table (`article_id`, `author_id`, `viewer_id`, `view_date`), find the IDs of viewers who have viewed **more than one distinct article** on the **same day**.

## 2. Examples

| Views Table (sample) |
|----------------------|
| article_id | viewer_id | view_date |
| 1 | 101 | 2023-01-01 |
| 2 | 101 | 2023-01-01 |
| 3 | 102 | 2023-01-01 |
| 4 | 101 | 2023-01-02 |

**Result:** `101` (viewer 101 viewed two articles on 2023‑01‑01).

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
