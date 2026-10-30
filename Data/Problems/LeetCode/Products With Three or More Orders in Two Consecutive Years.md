# 2292. Products With Three or More Orders in Two Consecutive Years

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/products-with-three-or-more-orders-in-two-consecutive-years](https://leetcode.com/problems/products-with-three-or-more-orders-in-two-consecutive-years)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Orders`

```
+---------------+------+
| Column Name   | Type |
+---------------+------+
| order_id      | int  |
| product_id    | int  |
| quantity      | int  |
| purchase_date | date |
+---------------+------+
order_id contains unique values.
Each row in this table contains the ID of an order, the id of the product purchased, the quantity, and the purchase date.
```

Write a solution to report the IDs of all the products that were ordered three or more times in two consecutive years.

Return the result table in **any order**.

The result format is shown in the following example.

## Examples

**Example 1:**
```
Input:
Orders table:
+----------+------------+----------+---------------+
| order_id | product_id | quantity | purchase_date |
+----------+------------+----------+---------------+
| 1        | 1          | 7        | 2020-03-16    |
| 2        | 1          | 4        | 2020-12-02    |
| 3        | 1          | 7        | 2020-05-10    |
| 4        | 1          | 6        | 2021-12-23    |
| 5        | 1          | 5        | 2021-05-21    |
| 6        | 1          | 6        | 2021-10-11    |
| 7        | 2          | 6        | 2022-10-11    |
+----------+------------+----------+---------------+
Output:
+------------+
| product_id |
+------------+
| 1          |
+------------+
Explanation:
Product 1 was ordered in 2020 three times and in 2021 three times. Since it was ordered three times in two consecutive years, we include it in the answer.
Product 2 was ordered one time in 2022. We do not include it in the answer.
```

## Approach
1. **Aggregate**: Group by `product_id` and `order_year` to count orders per year.
2. **Filter**: Keep rows where `count >= 3`.
3. **Self‑join** the filtered result on `product_id` where `year2 = year1 + 1` to find consecutive years.
4. **Select distinct** `product_id`s and order them.

## Walkthrough
1. `SELECT product_id, order_year, COUNT(*) AS cnt FROM Orders GROUP BY product_id, order_year` → gives yearly order counts.
2. `WHERE cnt >= 3` retains years with at least three orders.
3. Join the filtered table `t1` with itself `t2` on `t1.product_id = t2.product_id AND t2.order_year = t1.order_year + 1`.
4. Project distinct `product_id`s from the join result and sort.

## Complexity Analysis
- Time: O(N log N) for grouping and joining N rows.
- Space: O(N) to store intermediate aggregates.

## Follow‑Up Questions
- How to handle cases where the streak spans more than two years?
- Extend to require a minimum total quantity across the consecutive years.
- Adapt the query for databases without self‑join support (use window functions).

## Key Takeaway
Aggregating per‑group counts and self‑joining on consecutive keys efficiently identifies back‑to‑back qualifying periods.
