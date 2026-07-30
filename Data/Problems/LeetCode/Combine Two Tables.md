# 175. Combine Two Tables

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/combine-two-tables](https://leetcode.com/problems/combine-two-tables)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft
---

## Problem Description
Given two relational tables `Person(personId, firstName, lastName)` and `Address(personId, city, state)`, return a result set containing each person's first name, last name, city, and state. If a person does not have a matching address, the city and state should be `NULL`.

## Examples
- **Example 1:**
```sql
Person:               Address:
+----+----------+----------+   +----+----------+----------+----------+
| id | firstName| lastName |   | id | city     | state    |
+----+----------+----------+   +----+----------+----------+----------+
| 1  | "John"   | "Doe"   |   | 1  | "Seattle"| "WA"    |
| 2  | "Jane"   | "Smith" |   | 2  | "Boston" | "MA"    |
+----+----------+----------+   +----+----------+----------+----------+
```
Result: `John Doe Seattle WA`, `Jane Smith Boston MA`.
- **Example 2:** If `Address` has no row for a `personId`, the city/state appear as `NULL`.

## Approach
Perform a **LEFT JOIN** from `Person` to `Address` on `personId`. This keeps all rows from `Person` and adds matching address columns when present; otherwise `NULL` values are produced.

### Pseudocode (SQL)
```text
SELECT p.firstName,
       p.lastName,
       a.city,
       a.state
FROM Person AS p
LEFT JOIN Address AS a
ON p.personId = a.personId;
```

## Walkthrough
1. For each row in `Person`, the database engine looks up matching rows in `Address` by `personId`.
2. If a match exists, the `city` and `state` columns are taken from `Address`.
3. If no match, those columns are filled with `NULL`.
4. The selected columns are projected as the final result set.

## Complexity Analysis
Time: O(N + M) where N and M are the number of rows in `Person` and `Address` respectively (hash join or indexed lookup). Space: O(N) for the output.

## Follow‑Up Questions
- How would you modify the query to include only persons living in a specific state?
- What index would you create to optimize the join performance?
- How can you achieve the same result using a subquery instead of a join?

---

## Key Takeaway

> A LEFT JOIN preserves all rows from the left table while optionally attaching matching data from the right table, making it ideal for combining optional related information.
