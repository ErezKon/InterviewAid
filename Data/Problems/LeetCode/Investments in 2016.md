# 585. Investments in 2016

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/investments-in-2016](https://leetcode.com/problems/investments-in-2016)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Table: `Insurance`

```
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| pid         | int   |
| tiv_2015    | float |
| tiv_2016    | float |
| lat         | float |
| lon         | float |
+-------------+-------+
pid is the primary key (column with unique values) for this table.
Each row of this table contains information about one policy where:
pid is the policyholder's policy ID.
tiv_2015 is the total investment value in 2015 and tiv_2016 is the total investment value in 2016.
lat is the latitude of the policy holder's city. It's guaranteed that lat is not NULL.
lon is the longitude of the policy holder's city. It's guaranteed that lon is not NULL.
```

Write a solution to report the sum of all total investment values in 2016 `tiv_2016`, for all policyholders who:

- have the same `tiv_2015` value as one or more other policyholders, and
- are not located in the same city as any other policyholder (i.e., the (`lat, lon`) attribute pairs must be unique).

Round `tiv_2016` to **two decimal places**.

The result format is in the following example.

## 2. Approach: Subquery Filters — SQL ✅

```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1
);
```

## 3. Examples

**Example 1:**
```
Input:
Insurance table:
+-----+----------+----------+-----+-----+
| pid | tiv_2015 | tiv_2016 | lat | lon |
+-----+----------+----------+-----+-----+
| 1   | 10       | 5        | 10  | 10  |
| 2   | 20       | 20       | 20  | 20  |
| 3   | 10       | 30       | 20  | 20  |
| 4   | 10       | 40       | 40  | 40  |
+-----+----------+----------+-----+-----+
Output:
+----------+
| tiv_2016 |
+----------+
| 45.00    |
+----------+
Explanation:
The first record in the table, like the last record, meets both of the two criteria.
The tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.
The second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is the same as the third record, which makes the third record fail, too.
So, the result is the sum of tiv_2016 of the first and last record, which is 45.
```

## 4. Walkthrough

1. **Identify duplicate `tiv_2015` values** – the inner subquery groups by `tiv_2015` and keeps groups with `COUNT(*) > 1`.
2. **Identify unique locations** – the second subquery groups by `(lat, lon)` and keeps groups with `COUNT(*) = 1`.
3. **Filter the main table** – rows must satisfy both conditions.
4. **Aggregate** – sum the `tiv_2016` of the remaining rows and round to two decimals.

## 5. Complexity Analysis

- **Time:** The query scans the table a constant number of times; each `GROUP BY` is O(N) where *N* is the number of rows.
- **Space:** O(N) for the intermediate grouping results, plus O(1) extra for the final sum.

## 6. Follow‑Up Questions

- How would you rewrite the query using `JOIN`s instead of `IN` subqueries?
- Can you compute the result in a single pass using window functions?
- How would the solution change if the uniqueness condition applied to a city name instead of exact coordinates?

## Key Takeaway

> Combine independent set‑based filters with `AND` using subqueries (or joins) to enforce multiple constraints before aggregation.
