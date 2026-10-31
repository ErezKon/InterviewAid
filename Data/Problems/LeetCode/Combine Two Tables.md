# 175. Combine Two Tables

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/combine-two-tables](https://leetcode.com/problems/combine-two-tables)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft
---

## Problem Description
Table: `Person`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| personId    | int     |
| lastName    | varchar |
| firstName   | varchar |
+-------------+---------+
personId is the primary key (column with unique values) for this table.
This table contains information about the ID of some persons and their first and last names.
```

Table: `Address`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| addressId   | int     |
| personId    | int     |
| city        | varchar |
| state       | varchar |
+-------------+---------+
addressId is the primary key (column with unique values) for this table.
Each row of this table contains information about the city and state of one person with ID = PersonId.
```

Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report `null` instead.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
    Person table:
    +----------+----------+-----------+
    | personId | lastName | firstName |
    +----------+----------+-----------+
    | 1        | Wang     | Allen     |
    | 2        | Alice    | Bob       |
    +----------+----------+-----------+
    Address table:
    +-----------+----------+---------------+------------+
    | addressId | personId | city          | state      |
    +-----------+----------+---------------+------------+
    | 1         | 2        | New York City | New York   |
    | 2         | 3        | Leetcode      | California |
    +-----------+----------+---------------+------------+
  Output:
    +-----------+----------+---------------+----------+
    | firstName | lastName | city          | state    |
    +-----------+----------+---------------+----------+
    | Allen     | Wang     | Null          | Null     |
    | Bob       | Alice    | New York City | New York |
    +-----------+----------+---------------+----------+
  Explanation:
    There is no address in the address table for the personId = 1 so we return null in their city and state.
    addressId = 1 contains information about the address of personId = 2.
```

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

## Follow-Up Questions
- How would you modify the query to include only persons living in a specific state?
- What index would you create to optimize the join performance?
- How can you achieve the same result using a subquery instead of a join?

---

## Key Takeaway

> A LEFT JOIN preserves all rows from the left table while optionally attaching matching data from the right table, making it ideal for combining optional related information.
