# 1795. Rearrange Products Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rearrange-products-table](https://leetcode.com/problems/rearrange-products-table)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given a table `Products(product_id, store1, store2, store3)` where each `storeX` column contains the price of the product at that store or `NULL` if unavailable, write a query that returns a normalized view with columns `(product_id, store, price)`. Each non‑NULL price should become a separate row indicating the store name.

## Examples
| product_id | store1 | store2 | store3 |
|------------|--------|--------|--------|
| 1 | 10 | NULL | 12 |
| 2 | NULL | 8 | NULL |

Result:
| product_id | store | price |
|------------|-------|-------|
| 1 | store1 | 10 |
| 1 | store3 | 12 |
| 2 | store2 | 8 |

## Approach
Use `UNION ALL` to select each store column that is not `NULL`. For each store, project `product_id`, a literal store name, and the price.

```text
SELECT product_id, 'store1' AS store, store1 AS price FROM Products WHERE store1 IS NOT NULL
UNION ALL
SELECT product_id, 'store2' AS store, store2 FROM Products WHERE store2 IS NOT NULL
UNION ALL
SELECT product_id, 'store3' AS store, store3 FROM Products WHERE store3 IS NOT NULL;
```

## Walkthrough
For product 1, the first SELECT yields `(1, 'store1', 10)`. The second SELECT is skipped because `store2` is `NULL`. The third SELECT yields `(1, 'store3', 12)`. Repeating for product 2 produces `(2, 'store2', 8)`.

## Complexity Analysis
- **Time:** O(N) – each row is examined once per store column.
- **Space:** O(N) – output size proportional to the number of non‑NULL entries.

## Follow-Up Questions
1. How would you write the query if the number of store columns is dynamic?
2. Can you achieve the same result using `CROSS APPLY` or `UNPIVOT` operators?
3. How to include a column indicating whether the price is discounted?

## Key Takeaway
`UNION ALL` of filtered selects effectively unpivots wide tables into a normalized long format.
