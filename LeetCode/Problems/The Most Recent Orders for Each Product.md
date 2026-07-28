# 1549. The Most Recent Orders for Each Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-most-recent-orders-for-each-product](https://leetcode.com/problems/the-most-recent-orders-for-each-product)
**Companies:** Amazon

---

## Problem Description
Given a table `Orders(order_id, product_id, order_date)` where each row represents an order of a product at a specific timestamp, return the most recent order (i.e., the row with the latest `order_date`) for each `product_id`. If multiple orders share the latest date for a product, any one of them may be returned.

## Examples
**Example 1:**
```
Orders = [[1, 101, "2023-01-01"],
          [2, 101, "2023-01-05"],
          [3, 102, "2023-01-03"],
          [4, 102, "2023-01-02"]]
Output = [[2,101,"2023-01-05"],[3,102,"2023-01-03"]]
```
For product 101 the latest order is id 2, for product 102 it is id 3.

**Example 2:**
```
Orders = [[5, 200, "2022-12-31"],
          [6, 200, "2022-12-31"]]
Output = [[5,200,"2022-12-31"]]  // or [[6,200,"2022-12-31"]]
```
Both rows have the same date; any one can be chosen.

## Approach
Use a SQL window function to rank orders per product by `order_date` descending, then keep the top‑ranked row.

```text
SELECT order_id, product_id, order_date
FROM (
    SELECT order_id,
           product_id,
           order_date,
           ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY order_date DESC) AS rn
    FROM Orders
) AS sub
WHERE rn = 1;
```
The inner query assigns a row number per product based on recency; the outer query filters to the most recent order.

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Partition rows by `product_id`. |
| 2 | Within each partition, order rows by `order_date` descending. |
| 3 | Assign `ROW_NUMBER` starting at 1. |
| 4 | Keep rows where `rn = 1`. |
| 5 | Return the selected columns. |

## Complexity Analysis
- **Time:** O(N log N) due to sorting within each partition, where N is the number of orders.
- **Space:** O(N) for intermediate grouping and ranking.

## Follow-Up Questions
1. How would you modify the query to return the top k most recent orders per product?
2. How can you handle ties by returning all orders that share the latest date for a product?
3. If the table is extremely large, what indexes would improve query performance?

## Key Takeaway
Rank orders per product by date using a window function and select the row with rank 1 to obtain the most recent order for each product.
