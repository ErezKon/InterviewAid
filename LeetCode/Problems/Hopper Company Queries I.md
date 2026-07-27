# 1635. Hopper Company Queries I

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-i](https://leetcode.com/problems/hopper-company-queries-i)
**Companies:** Uber

---

## 1. Problem Description

Report for each month of 2020: number of active drivers and accepted rides. (SQL problem — Uber ride-sharing data)

## 2. Approach: Recursive Month CTE + LEFT JOINs ✅

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL SELECT month + 1 FROM months WHERE month < 12
),
active_drivers AS (
    SELECT month,
           COUNT(*) OVER (ORDER BY month) AS active_count
    FROM months LEFT JOIN Drivers ON ...
)
-- Join with accepted Rides per month
-- Fill nulls with 0 for months with no rides
```

## Key Takeaway

> Generate all 12 months with recursive CTE, left join drivers (cumulative) and rides (per month). Fill missing months with 0.
