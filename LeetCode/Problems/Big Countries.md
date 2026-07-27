# 595. Big Countries

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/big-countries](https://leetcode.com/problems/big-countries)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given a table `World(name, population, area)`, return the `name`, `population`, and `area` of all countries that have an `area` of at least 3,000,000 **or** a `population` of at least 25,000,000.

## Examples
- **Input Table:**
  | name | population | area |
  |------|------------|------|
  | CountryA | 50000000 | 2500000 |
  | CountryB | 20000000 | 3500000 |
  | CountryC | 3000000  | 1000000 |
  **Output:**
  | name | population | area |
  |------|------------|------|
  | CountryA | 50000000 | 2500000 |
  | CountryB | 20000000 | 3500000 |
  *Explanation:* CountryA meets population criterion, CountryB meets area criterion.

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
