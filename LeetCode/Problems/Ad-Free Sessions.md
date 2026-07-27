# 1809. Ad-Free Sessions

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ad-free-sessions](https://leetcode.com/problems/ad-free-sessions)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given `Playback` (session_id, customer_id, start_time, end_time) and `Ads` (ad_id, customer_id, timestamp) tables, find sessions where **no** ad was shown during playback.

---

## 2. Approach: LEFT JOIN + IS NULL ✅

```sql
SELECT p.session_id
FROM Playback p
LEFT JOIN Ads a ON p.customer_id = a.customer_id
    AND a.timestamp BETWEEN p.start_time AND p.end_time
WHERE a.ad_id IS NULL;
```

---

## Key Takeaway

> Anti-join pattern: LEFT JOIN + WHERE ... IS NULL finds rows with no matching record. Classic SQL pattern for "not exists" queries.
