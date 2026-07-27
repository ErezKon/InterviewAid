# 1435. Create a Session Bar Chart

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-session-bar-chart](https://leetcode.com/problems/create-a-session-bar-chart)
**Companies:** Twitch

---

## Problem Description

SQL problem: Categorize sessions by duration into bins (`[0,5)`, `[5,10)`, `[10,15)`, `15+` minutes) and count sessions per bin. Show all bins even if empty.

---

## Approach

```sql
SELECT '[0-5>' AS bin, COUNT(session_id) AS total
FROM Sessions WHERE duration >= 0 AND duration < 300
UNION ALL
SELECT '[5-10>' AS bin, COUNT(session_id) AS total
FROM Sessions WHERE duration >= 300 AND duration < 600
UNION ALL
SELECT '[10-15>' AS bin, COUNT(session_id) AS total
FROM Sessions WHERE duration >= 600 AND duration < 900
UNION ALL
SELECT '15 or more' AS bin, COUNT(session_id) AS total
FROM Sessions WHERE duration >= 900;
```

---

## Key Takeaway

> **SQL binning with UNION ALL: each SELECT handles one bin with a WHERE clause for the range. Ensures all bins appear even with 0 count.**
