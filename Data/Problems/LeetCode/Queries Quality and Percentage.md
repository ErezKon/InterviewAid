# 1211. Queries Quality and Percentage

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/queries-quality-and-percentage](https://leetcode.com/problems/queries-quality-and-percentage)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given a table `Queries(query_name VARCHAR, rating INT, position INT)`. For each distinct `query_name`, compute two metrics:
1. **Quality** – the average of `rating / position` for that query, rounded to two decimal places.
2. **Poor Query Percentage** – the percentage of rows for that query where `rating < 3`, rounded to two decimal places.
Return a result set with columns `query_name`, `quality`, and `poor_query_percentage`.

## Examples
**Example:**
```
Queries table:
+------------+--------+----------+
| query_name | rating | position |
+------------+--------+----------+
| "A"       | 5      | 1        |
| "A"       | 3      | 2        |
| "B"       | 2      | 1        |
| "B"       | 4      | 3        |
+------------+--------+----------+
```
Result:
```
+------------+---------+----------------------+
| query_name | quality | poor_query_percentage |
+------------+---------+----------------------+
| "A"       | 2.75    | 0.00                 |
| "B"       | 1.33    | 50.00                |
+------------+---------+----------------------+
```
Explanation: For "A", quality = (5/1 + 3/2)/2 = 2.75, no rating < 3.
For "B", quality = (2/1 + 4/3)/2 ≈ 1.33, one out of two rows has rating < 3 → 50%.

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
2. Can you write a version that returns the top‑k queries by quality?
3. How would you compute these metrics incrementally as new rows are inserted?

## Key Takeaway
SQL aggregation lets you compute per‑group averages and conditional percentages concisely using `AVG`, `SUM(CASE ...)`, and `ROUND`.
