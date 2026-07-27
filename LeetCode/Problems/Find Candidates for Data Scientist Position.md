# 3051. Find Candidates for Data Scientist Position

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-candidates-for-data-scientist-position](https://leetcode.com/problems/find-candidates-for-data-scientist-position)
**Companies:** Hashedin

---

## Problem Description

Find candidates who are proficient in all three skills: Python, Tableau, and PostgreSQL.

---

## Approach: SQL GROUP BY + HAVING ✅

```sql
SELECT candidate_id
FROM Candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(DISTINCT skill) = 3
ORDER BY candidate_id;
```

---

## Key Takeaway

> **Filter relevant skills, group by candidate, use HAVING COUNT = 3 to ensure all three skills are present.**
