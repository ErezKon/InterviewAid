# 1327. List the Products Ordered in a Period

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/list-the-products-ordered-in-a-period](https://leetcode.com/problems/list-the-products-ordered-in-a-period)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Table: `Products`

```
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| product_id       | int     |
| product_name     | varchar |
| product_category | varchar |
+------------------+---------+
product_id is the primary key (column with unique values) for this table.
This table contains data about the company's products.
```

Table: `Orders`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| order_date    | date    |
| unit          | int     |
+---------------+---------+
This table may have duplicate rows.
product_id is a foreign key (reference column) to the Products table.
unit is the number of products ordered in order_date.
```

Write a solution to get the names of products that have at least `100` units ordered in **February 2020** and their amount.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Products table:
+-------------+-----------------------+------------------+
| product_id  | product_name          | product_category |
+-------------+-----------------------+------------------+
| 1           | Leetcode Solutions    | Book             |
| 2           | Jewels of Stringology | Book             |
| 3           | HP                    | Laptop           |
| 4           | Lenovo                | Laptop           |
| 5           | Leetcode Kit          | T-shirt          |
+-------------+-----------------------+------------------+
Orders table:
+--------------+--------------+----------+
| product_id   | order_date   | unit     |
+--------------+--------------+----------+
| 1            | 2020-02-05   | 60       |
| 1            | 2020-02-10   | 70       |
| 2            | 2020-01-18   | 30       |
| 2            | 2020-02-11   | 80       |
| 3            | 2020-02-17   | 2        |
| 3            | 2020-02-24   | 3        |
| 4            | 2020-03-01   | 20       |
| 4            | 2020-03-04   | 30       |
| 4            | 2020-03-04   | 60       |
| 5            | 2020-02-25   | 50       |
| 5            | 2020-02-27   | 50       |
| 5            | 2020-03-01   | 50       |
+--------------+--------------+----------+
Output:
+--------------------+---------+
| product_name       | unit    |
+--------------------+---------+
| Leetcode Solutions | 130     |
| Leetcode Kit       | 100     |
+--------------------+---------+
Explanation:
Products with product_id = 1 is ordered in February a total of (60 + 70) = 130.
Products with product_id = 2 is ordered in February a total of 80.
Products with product_id = 3 is ordered in February a total of (2 + 3) = 5.
Products with product_id = 4 was not ordered in February 2020.
Products with product_id = 5 is ordered in February a total of (50 + 50) = 100.
```

---

## 3. Approach

**SQL aggregation** – Join `Products` with `Orders`, filter rows to February 2020, group by product, sum the ordered units, and keep groups with sum ≥ 100.

```sql
SELECT p.product_name, SUM(o.unit) AS total_units
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;
```

---

## 4. Walkthrough

1. **Join** – Each order row is paired with its product name.
2. **Filter** – `WHERE` keeps only rows where `order_date` falls in February 2020.
3. **Group & Sum** – `GROUP BY` aggregates rows per product; `SUM(o.unit)` computes total units ordered.
4. **Having** – `HAVING SUM(o.unit) >= 100` discards products with fewer than 100 units.
5. **Select** – Return the product name and the summed units.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(N log N) – depends on database indexing and join cost |
| Space  | O(K) – space for `K` groups that satisfy the condition |

---

## 6. Follow‑Up Questions

1. How would you modify the query to handle a **date range** supplied at runtime?
2. How can you retrieve the **top k** products by units ordered in the period?
3. What indexes would you create to optimise this query for large tables?

---

## Key Takeaway

> Combining `JOIN`, `GROUP BY`, and `HAVING` lets you filter aggregated results, such as products meeting a minimum order quantity within a specific time window.
