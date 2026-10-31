# 1211. Queries Quality and Percentage

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/queries-quality-and-percentage](https://leetcode.com/problems/queries-quality-and-percentage)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Table: `Queries`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| query_name  | varchar |
| result      | varchar |
| position    | int     |
| rating      | int     |
+-------------+---------+
This table may have duplicate rows.
This table contains information collected from some queries on a database.
The `position` column has a value from **1** to **500**.
The `rating` column has a value from **1** to **5**. Query with `rating` less than 3 is a poor query.
```

We define query `quality` as:

**
The average of the ratio between query rating and its position.
**

We also define `poor query percentage` as:

**
The percentage of all queries with rating less than 3.
**

Write a solution to find each `query_name`, the `quality` and `poor_query_percentage`.

Both `quality` and `poor_query_percentage` should be **rounded to 2 decimal places**.

When rounding to two decimal places, values exactly halfway between two possible results are rounded away from zero. For example, 0.125 is rounded to 0.13.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Queries table:
+------------+-------------------+----------+--------+
| query_name | result            | position | rating |
+------------+-------------------+----------+--------+
| Dog        | Golden Retriever  | 1        | 5      |
| Dog        | German Shepherd   | 2        | 5      |
| Dog        | Mule              | 200      | 1      |
| Cat        | Shirazi           | 5        | 2      |
| Cat        | Siamese           | 3        | 3      |
| Cat        | Sphynx            | 7        | 4      |
+------------+-------------------+----------+--------+
Output:
+------------+---------+-----------------------+
| query_name | quality | poor_query_percentage |
+------------+---------+-----------------------+
| Dog        | 2.50    | 33.33                 |
| Cat        | 0.66    | 33.33                 |
+------------+---------+-----------------------+
Explanation:
Dog queries quality is ((5 / 1) + (5 / 2) + (1 / 200)) / 3 = 2.50
Dog queries poor_ query_percentage is (1 / 3) * 100 = 33.33
Cat queries quality equals ((2 / 5) + (3 / 3) + (4 / 7)) / 3 = 0.66
Cat queries poor_ query_percentage is (1 / 3) * 100 = 33.33
```

## Approach
Use aggregation with `GROUP BY query_name`. Compute the average of the expression `rating / position` and the percentage of rows where `rating < 3`.

```sql
SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(100.0 * SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) / COUNT(*), 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;
```
The `ROUND` function formats the results to two decimal places.

## Walkthrough
| Step | Operation | Result |
|------|-----------|--------|
| 1 | Filter out rows with NULL `query_name` | only valid rows remain |
| 2 | Compute `rating / position` for each row | e.g., 5/1 = 5, 3/2 = 1.5 |
| 3 | Aggregate per `query_name` – average of those values → `quality` |
| 4 | Count rows where `rating < 3` and divide by total rows → percentage → `poor_query_percentage` |
| 5 | Round both metrics to two decimals |

## Complexity Analysis
- **Time:** The query scans the table once → O(N) where N is number of rows.
- **Space:** O(G) for storing aggregates per distinct query name, where G is number of groups.

## Follow-Up Questions
1. How would you modify the query to handle weighted averages based on `position`?
2. Can you write a version that returns the top-k queries by quality?
3. How would you compute these metrics incrementally as new rows are inserted?

## Key Takeaway
SQL aggregation lets you compute per-group averages and conditional percentages concisely using `AVG`, `SUM(CASE ...)`, and `ROUND`.
