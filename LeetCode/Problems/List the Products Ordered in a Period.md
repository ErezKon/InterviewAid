# 1327. List the Products Ordered in a Period

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/list-the-products-ordered-in-a-period](https://leetcode.com/problems/list-the-products-ordered-in-a-period)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Given tables `Products(product_id, product_name, ...)` and `Orders(order_id, product_id, unit, order_date, ...)`, list the names of products that have been ordered for **at least 100 units** during **February 2020**.

---

## 2. Examples

| Products Table | Orders Table | Result |
|----------------|--------------|--------|
| `product_id` 1 – "Apple" | `(1,1,30,'2020-02-05')`<br>`(2,1,80,'2020-02-20')` | `Apple` (total 110 ≥ 100) |
| `product_id` 2 – "Banana" | `(3,2,50,'2020-02-10')` | *(none)* (total 50 < 100) |

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
