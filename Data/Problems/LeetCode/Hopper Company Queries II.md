# 1645. Hopper Company Queries II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-ii](https://leetcode.com/problems/hopper-company-queries-ii)
**Companies:** Uber

---

## 1. Problem Description

For each month of 2020, report the percentage of working drivers (drivers who accepted at least one ride) out of all active drivers. (SQL problem)

## 2. Examples

| month | active_drivers | working_drivers | working_percentage |
|------|----------------|----------------|--------------------|
| 1    | 1200           | 800            | 66.67%             |
| 2    | 1300           | 900            | 69.23%             |

*Explanation*: `working_percentage` = `working_drivers` / `active_drivers` * 100. If `active_drivers` is 0, the percentage is 0.

## 3. Approach

## 2. Approach: Recursive CTE + Aggregation ✅

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL SELECT month + 1 FROM months WHERE month < 12
),
active AS (
    SELECT month, COUNT(*) OVER (ORDER BY month) AS active_cnt
    FROM months LEFT JOIN Drivers ON ...
),
working AS (
    SELECT month, COUNT(DISTINCT driver_id) AS working_cnt
    FROM Rides WHERE accepted = 1 GROUP BY month
)
SELECT m.month,
       COALESCE(a.active_cnt,0) AS active_drivers,
       COALESCE(w.working_cnt,0) AS working_drivers,
       CASE WHEN COALESCE(a.active_cnt,0)=0 THEN 0
            ELSE ROUND(w.working_cnt*100.0/a.active_cnt,2) END AS working_percentage
FROM months m
LEFT JOIN active a ON m.month=a.month
LEFT JOIN working w ON m.month=w.month
ORDER BY m.month;
```

## 4. Walkthrough

1. **Generate months** 1‑12 via recursive CTE.
2. **Active drivers**: cumulative count similar to Query I.
3. **Working drivers**: count distinct drivers with at least one accepted ride per month.
4. **Compute percentage**: use `CASE` to avoid division by zero, round to two decimals.
5. **Final SELECT** returns all months, filling missing values with 0.

## 5. Complexity Analysis

- **Time**: O(M + D + R) where M=12 months, D=drivers, R=rides – dominated by joins/aggregations.
- **Space**: O(M) for month rows and intermediate aggregates.

## 6. Follow-Up Questions

- How to compute the average fare per working driver per month?
- Extend to include quarterly percentages.
- How to handle multiple years in the same query?

## 7. Key Takeaway

> Build on Query I by adding a distinct count of drivers with accepted rides and compute the ratio, handling zero‑active‑driver months gracefully.
