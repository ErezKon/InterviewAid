# 1322. Ads Performance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ads-performance](https://leetcode.com/problems/ads-performance)
**Companies:** Meta

---

## 1. Problem Description

**SQL Problem.** Given an `Ads` table with columns `ad_id`, `user_id`, and `action` ('Clicked', 'Viewed', 'Ignored'), find the click-through rate (CTR) for each ad, rounded to 2 decimal places. CTR = clicks / (clicks + views) × 100. If no clicks or views, CTR = 0.

---

## 2. Approach: SQL Aggregation ✅

```sql
SELECT ad_id,
       ROUND(IFNULL(
           SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END) * 100.0 /
           NULLIF(SUM(CASE WHEN action IN ('Clicked','Viewed') THEN 1 ELSE 0 END), 0),
       0), 2) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;
```

---

## Key Takeaway

> Standard SQL aggregation with `CASE WHEN` for conditional counting. Use `NULLIF` to avoid division by zero and `IFNULL` to default to 0.
