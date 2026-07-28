# 1757. Recyclable and Low Fat Products

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/recyclable-and-low-fat-products](https://leetcode.com/problems/recyclable-and-low-fat-products)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs
---

## Problem Description
Given a database table `Products(product_id, low_fats, recyclable)`, return the `product_id`s of all products that are both low‑fat (`low_fats = 'Y'`) and recyclable (`recyclable = 'Y'`). The result can be in any order.

## Examples
- **Example 1:** If the table contains rows `[(1,'Y','Y'), (2,'N','Y'), (3,'Y','N')]`, the query should return `[1]` because only product 1 satisfies both conditions.
- **Example 2:** For rows `[(10,'Y','Y'), (20,'Y','Y'), (30,'N','N')]`, the output is `[10,20]`.

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
