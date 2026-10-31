# 1179. Reformat Department Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-department-table](https://leetcode.com/problems/reformat-department-table)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Table: `Department`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| revenue     | int     |
| month       | varchar |
+-------------+---------+
In SQL,(id, month) is the primary key of this table.
The table has information about the revenue of each department per month.
The month has values in ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].
```

Reformat the table such that there is a department id column and a revenue column **for each month**.

Return the result table in **any order**.

The result format is in the following example.

## Examples

```
Example 1:
  Input:
    Department table:
    +------+---------+-------+
    | id   | revenue | month |
    +------+---------+-------+
    | 1    | 8000    | Jan   |
    | 2    | 9000    | Jan   |
    | 3    | 10000   | Feb   |
    | 1    | 7000    | Feb   |
    | 1    | 6000    | Mar   |
    +------+---------+-------+
  Output:
    +------+-------------+-------------+-------------+-----+-------------+
    | id   | Jan_Revenue | Feb_Revenue | Mar_Revenue | ... | Dec_Revenue |
    +------+-------------+-------------+-------------+-----+-------------+
    | 1    | 8000        | 7000        | 6000        | ... | null        |
    | 2    | 9000        | null        | null        | ... | null        |
    | 3    | null        | 10000       | null        | ... | null        |
    +------+-------------+-------------+-------------+-----+-------------+
  Explanation: The revenue from Apr to Dec is null.
    Note that the result table has 13 columns (1 for the department id + 12 for the months).
```

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
* How would you handle dynamic month columns without hard-coding each month?
* Can you write a solution that works for any number of categorical columns?
* How would you modify the query to fill missing values with `0` instead of `NULL`?

## Key Takeaway
Conditional aggregation with `CASE` statements lets you pivot row-wise data into columnar format efficiently.

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