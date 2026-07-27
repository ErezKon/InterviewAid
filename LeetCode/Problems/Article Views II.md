# 1149. Article Views II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/article-views-ii](https://leetcode.com/problems/article-views-ii)
**Companies:** Linkedin

---

## 1. Problem Description

**SQL Problem.** Given a `Views` table (article_id, author_id, viewer_id, view_date), find viewers who viewed **more than one article** on the **same day**.

---

## 2. Approach: Group + Having ✅

```sql
SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY viewer_id, view_date
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY id;
```

---

## Key Takeaway

> Group by (viewer, date), count distinct articles, filter with `HAVING`. `DISTINCT` in the outer query handles viewers who qualify on multiple days.
