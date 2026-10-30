# 1757. Recyclable and Low Fat Products

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/recyclable-and-low-fat-products](https://leetcode.com/problems/recyclable-and-low-fat-products)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs
---

## Problem Description
Table: `Products`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key (column with unique values) for this table.
low_fats is an ENUM (category) of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
recyclable is an ENUM (category) of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.
```

Write a solution to find the ids of products that are both low fat and recyclable.

Return the result table in **any order**.

The result format is in the following example.

## Examples

```
Example 1:
  Input:
    Products table:
    +-------------+----------+------------+
    | product_id  | low_fats | recyclable |
    +-------------+----------+------------+
    | 0           | Y        | N          |
    | 1           | Y        | Y          |
    | 2           | N        | Y          |
    | 3           | Y        | Y          |
    | 4           | N        | N          |
    +-------------+----------+------------+
  Output:
    +-------------+
    | product_id  |
    +-------------+
    | 1           |
    | 3           |
    +-------------+
  Explanation: Only products 1 and 3 are both low fat and recyclable.
```

## Approach
The task is a straightforward SQL filter. Use a `SELECT` statement with `WHERE` clauses checking both columns for `'Y'`.

```text
FUNCTION GetRecyclableLowFatProducts():
    // Return product IDs where both flags are 'Y'
    RETURN SELECT product_id FROM Products
           WHERE low_fats = 'Y' AND recyclable = 'Y';
```

## Walkthrough
| Row | low_fats | recyclable | Condition Met? |
|-----|----------|------------|----------------|
| 1   | Y        | Y          | ✅ include      |
| 2   | N        | Y          | ❌ exclude      |
| 3   | Y        | N          | ❌ exclude      |
Only rows meeting both `Y` flags are returned.

## Complexity Analysis
- **Time:** `O(N)` where `N` is the number of rows scanned by the database engine.
- **Space:** `O(K)` for `K` matching rows returned.

## Follow-Up Questions
1. How would you modify the query to also return products that are either low‑fat **or** recyclable?
2. What indexes would improve performance for large tables?
3. How can you write the query to return results sorted by `product_id`?

## Key Takeaway
A simple `SELECT … WHERE column = 'Y' AND column = 'Y'` efficiently filters rows that satisfy multiple boolean conditions.
