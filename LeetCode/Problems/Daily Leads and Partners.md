# 1693. Daily Leads and Partners

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/daily-leads-and-partners](https://leetcode.com/problems/daily-leads-and-partners)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

SQL: For each date and make, count distinct leads and distinct partners.

---

## Approach

```sql
SELECT date_id, make_name,
    COUNT(DISTINCT lead_id) AS unique_leads,
    COUNT(DISTINCT partner_id) AS unique_partners
FROM DailySales
GROUP BY date_id, make_name;
```

---

## Key Takeaway

> **COUNT(DISTINCT col) within GROUP BY gives unique counts per group. Multiple COUNT(DISTINCT) columns work independently in the same query.**
