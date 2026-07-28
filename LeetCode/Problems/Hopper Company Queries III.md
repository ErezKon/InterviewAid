# 1651. Hopper Company Queries III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/hopper-company-queries-iii](https://leetcode.com/problems/hopper-company-queries-iii)
**Companies:** Uber

---

## 1. Problem Description

For each month of 2020 (months 1‑10), report the 3‑month moving average of total ride distance and total ride duration. (SQL problem)

## 2. Examples

| month | avg_distance | avg_duration |
|------|--------------|--------------|
| 1    | 12.3         | 5.4          |
| 2    | 13.1         | 5.7          |
| 3    | 14.0         | 6.0          |

*Explanation*: For month 3, the average is computed over months 1‑3; month 1 uses months 1‑3 as well (since earlier months are not available, the window starts at month 1).

## 3. Approach

## 2. Approach: Recursive CTE + Window AVG ✅

```sql
WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL SELECT month + 1 FROM months WHERE month < 12
),
monthly AS (
    SELECT m.month,
           SUM(distance) AS total_distance,
           SUM(duration) AS total_duration
    FROM months m
    LEFT JOIN Rides r ON r.month = m.month
    GROUP BY m.month
)
SELECT month,
       AVG(total_distance) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) AS avg_distance,
       AVG(total_duration) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) AS avg_duration
FROM monthly
WHERE month BETWEEN 1 AND 10
ORDER BY month;
```

## 4. Walkthrough

1. **Generate months** 1‑12 via recursive CTE.
2. **Aggregate per month**: `SUM(distance)` and `SUM(duration)` give totals for each month.
3. **Moving average**: `AVG(...) OVER (ORDER BY month ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING)` computes the average of the current month and the next two months, yielding a 3‑month window.
4. **Filter**: Keep only months 1‑10, because months 11‑12 lack a full forward window.
5. **Result**: Returns `month, avg_distance, avg_duration` for each of the first ten months.

## 5. Complexity Analysis

- **Time**: O(M) where M = 12 (constant), dominated by joins and window calculations.
- **Space**: O(M) for the generated month rows and intermediate aggregates.

## 6. Follow-Up Questions

- How would you compute a trailing 3‑month moving average instead of a forward one?
- Extend the query to handle multiple years in a single result set.
- How to include only rides with a certain status (e.g., completed) in the averages?

## 7. Key Takeaway

> Generate month rows, aggregate per‑month metrics, then apply a window `AVG` over a 3‑month frame to obtain moving averages.
