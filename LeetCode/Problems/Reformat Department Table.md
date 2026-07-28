# 1179. Reformat Department Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-department-table](https://leetcode.com/problems/reformat-department-table)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a table `Department(id, month, revenue)` where each row records the revenue of a department for a specific month, transform it into a pivoted format with one row per `id` and separate columns for each month’s revenue (`Jan_Revenue`, `Feb_Revenue`, …, `Dec_Revenue`). Missing month entries should be treated as `NULL`.

## Examples
| id | month | revenue |
|----|-------|---------|
| 1  | Jan   | 1000    |
| 1  | Mar   | 1500    |
| 2  | Feb   | 2000    |
| 2  | Dec   | 3000    |

Result:
| id | Jan_Revenue | Feb_Revenue | Mar_Revenue | Apr_Revenue | May_Revenue | Jun_Revenue | Jul_Revenue | Aug_Revenue | Sep_Revenue | Oct_Revenue | Nov_Revenue | Dec_Revenue |
|----|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|
| 1  | 1000        | NULL        | 1500        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL |
| 2  | NULL        | 2000        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | NULL        | 3000 |

## Approach
Use a `GROUP BY id` and conditional aggregation for each month. The `CASE WHEN month = 'Mon' THEN revenue END` expression returns the revenue for that month or `NULL` otherwise.

```text
FUNCTION PivotDepartmentTable():
    SELECT id,
        SUM(CASE WHEN month = 'Jan' THEN revenue END) AS Jan_Revenue,
        SUM(CASE WHEN month = 'Feb' THEN revenue END) AS Feb_Revenue,
        ...
        SUM(CASE WHEN month = 'Dec' THEN revenue END) AS Dec_Revenue
    FROM Department
    GROUP BY id;
```

## Walkthrough
For department `id = 1`:
1. Rows: (1, Jan, 1000) and (1, Mar, 1500).
2. `CASE` for Jan returns 1000, others return `NULL`.
3. `SUM` aggregates to 1000 for Jan, `NULL` for Feb, 1500 for Mar, etc.
4. Result row contains those values.

## Complexity Analysis
Time: O(N) – one pass over all rows.
Space: O(K) – storage for each department (`K` distinct ids) plus constant columns.

## Follow-Up Questions
* How would you handle dynamic month columns without hard‑coding each month?
* Can you write a solution that works for any number of categorical columns?
* How would you modify the query to fill missing values with `0` instead of `NULL`?

## Key Takeaway
Conditional aggregation with `CASE` statements lets you pivot row‑wise data into columnar format efficiently.

```sql
SELECT id,
    SUM(CASE WHEN month = 'Jan' THEN revenue END) AS Jan_Revenue,
    SUM(CASE WHEN month = 'Feb' THEN revenue END) AS Feb_Revenue,
    SUM(CASE WHEN month = 'Mar' THEN revenue END) AS Mar_Revenue,
    SUM(CASE WHEN month = 'Apr' THEN revenue END) AS Apr_Revenue,
    SUM(CASE WHEN month = 'May' THEN revenue END) AS May_Revenue,
    SUM(CASE WHEN month = 'Jun' THEN revenue END) AS Jun_Revenue,
    SUM(CASE WHEN month = 'Jul' THEN revenue END) AS Jul_Revenue,
    SUM(CASE WHEN month = 'Aug' THEN revenue END) AS Aug_Revenue,
    SUM(CASE WHEN month = 'Sep' THEN revenue END) AS Sep_Revenue,
    SUM(CASE WHEN month = 'Oct' THEN revenue END) AS Oct_Revenue,
    SUM(CASE WHEN month = 'Nov' THEN revenue END) AS Nov_Revenue,
    SUM(CASE WHEN month = 'Dec' THEN revenue END) AS Dec_Revenue
FROM Department
GROUP BY id;
```