# 1635. Hopper Company Queries I

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-i](https://leetcode.com/problems/hopper-company-queries-i)
**Companies:** Uber

---

## 1. Problem Description

Report for each month of 2020: number of active drivers and accepted rides. (SQL problem — Uber ride-sharing data)

## 2. Examples

| month | active_drivers | accepted_rides |
|------|----------------|----------------|
| 1    | 1200           | 3000           |
| 2    | 1300           | 3200           |

*Explanation*: The query should return a row for every month (1‑12). If a month has no rides, `accepted_rides` is shown as 0.

## 3. Approach

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

## 4. Walkthrough

1. **Generate months**: The recursive CTE creates rows for months 1‑12.
2. **Active drivers**: A cumulative count (`COUNT(*) OVER`) gives the total active drivers up to each month.
3. **Accepted rides**: LEFT JOIN the `Rides` table on month, aggregating rides per month.
4. **Handle missing data**: Use `COALESCE(accepted_rides, 0)` to replace NULLs with 0.
5. **Final SELECT**: Return `month, active_count, accepted_rides` ordered by month.

## 5. Complexity Analysis

- **Time**: O(M) where M = 12 (constant), dominated by joins and aggregations.
- **Space**: O(M) for the generated month rows.

## 6. Follow-Up Questions

- How would you modify the query to include only drivers who completed at least one ride?
- Extend the query to compute the average ride fare per month.
- How to handle data for multiple years in a single result set?

## 7. Key Takeaway

> Generate all 12 months with a recursive CTE, left‑join drivers (cumulative) and rides (per month), and fill missing months with 0.
