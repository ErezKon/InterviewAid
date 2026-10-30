# 595. Big Countries

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/big-countries](https://leetcode.com/problems/big-countries)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Table: `World`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
name is the primary key (column with unique values) for this table.
Each row of this table gives information about the name of a country, the continent to which it belongs, its area, the population, and its GDP value.
```

A country is **big** if:

- it has an area of at least three million (i.e., `3000000 km²`), or
- it has a population of at least twenty-five million (i.e., `25000000`).

Write a solution to find the name, population, and area of the **big countries**.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
  World table:
  +-------------+-----------+---------+------------+--------------+
  | name        | continent | area    | population | gdp          |
  +-------------+-----------+---------+------------+--------------+
  | Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
  | Albania     | Europe    | 28748   | 2831741    | 12960000000  |
  | Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
  | Andorra     | Europe    | 468     | 78115      | 3712000000   |
  | Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
  +-------------+-----------+---------+------------+--------------+
  Output:
  +-------------+------------+---------+
  | name        | population | area    |
  +-------------+------------+---------+
  | Afghanistan | 25500100   | 652230  |
  | Algeria     | 37100000   | 2381741 |
  +-------------+------------+---------+
```

## Approach
Use a simple `SELECT` with a `WHERE` clause that checks the two conditions using `OR`.

```text
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
```

## Walkthrough
| Condition | Evaluation |
|-----------|------------|
| `area >= 3000000` | true for CountryB, false for CountryA & C |
| `population >= 25000000` | true for CountryA, false for B & C |
| `OR` combines results, returning rows where either condition holds.

## Complexity Analysis
- **Time:** O(n) – the database scans each row once.
- **Space:** O(1) extra space beyond the result set.

## Follow‑Up Questions
1. How would you modify the query to also return countries with **both** criteria?
2. What indexes could speed up this query for a very large `World` table?
3. How can you write the query to order results by descending population?

## Key Takeaway
A straightforward `WHERE` clause with `OR` efficiently filters rows that satisfy either of two numeric thresholds.
