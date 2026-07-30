# 585. Investments in 2016

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/investments-in-2016](https://leetcode.com/problems/investments-in-2016)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Report the sum of `tiv_2016` (rounded to 2 decimals) for policyholders who:
1. Have the **same** `tiv_2015` as at least one other policyholder, **and**
2. Are in a **unique** location (`lat`, `lon` pair not shared with any other).

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

| tiv_2015 | lat | lon | tiv_2016 |
|----------|-----|-----|----------|
| 1000 | 40.0 | -73.0 | 500 |
| 1000 | 41.0 | -74.0 | 300 |
| 2000 | 42.0 | -75.0 | 400 |
| 2000 | 42.0 | -75.0 | 600 |

In this table, `tiv_2015 = 1000` appears more than once, and the location `(40.0,-73.0)` is unique, so its `tiv_2016` (500) contributes to the sum. The rows with `tiv_2015 = 2000` share the same location, so they are excluded.

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
