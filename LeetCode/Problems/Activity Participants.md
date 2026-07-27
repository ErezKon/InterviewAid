# 1355. Activity Participants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/activity-participants](https://leetcode.com/problems/activity-participants)
**Companies:** Ibm

---

## 1. Problem Description

**SQL Problem.** Given a `Friends` table with `id`, `name`, `activity`, and an `Activities` table, find activities that have neither the most nor the fewest participants.

---

## 2. Approach: Subquery with Count ✅

```sql
SELECT activity
FROM Friends
GROUP BY activity
HAVING COUNT(*) > (SELECT MIN(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t)
   AND COUNT(*) < (SELECT MAX(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t);
```

---

## Key Takeaway

> Filter extremes by comparing each group's count against the global min and max counts. Subqueries compute boundaries, `HAVING` excludes them.
