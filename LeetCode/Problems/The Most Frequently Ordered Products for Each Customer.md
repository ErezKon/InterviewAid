# 1596. The Most Frequently Ordered Products for Each Customer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer](https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer)
**Companies:** Amazon

---

## Problem Description
Given a table `Orders(customer_id, product_id)` representing each product ordered by customers, return for every `customer_id` the `product_id` that the customer ordered most frequently. If there is a tie, return any one of the most frequent products.

## Examples
**Example 1:**
```
Orders = [[1, 5], [1, 6], [1, 5], [2, 6], [2, 6], [2, 7]]
Output = [[1,5],[2,6]]
```
Customer 1 ordered product 5 twice and product 6 once, so 5 is most frequent. Customer 2 ordered product 6 twice and product 7 once, so 6 is most frequent.

**Example 2:**
```
Orders = [[3,10],[3,10],[3,11],[3,11]]
Output = [[3,10]]  // or [[3,11]]
```
Both products appear twice; any one can be returned.

## Approach
Use SQL aggregation: group by `customer_id` and `product_id` to count orders, then for each customer select the product with the maximum count using a window function or a self‑join.

```text
SELECT customer_id, product_id
FROM (
    SELECT customer_id,
           product_id,
           COUNT(*) AS cnt,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY COUNT(*) DESC) AS rn
    FROM Orders
    GROUP BY customer_id, product_id
) AS sub
WHERE rn = 1;
```
The inner query computes frequencies and ranks them per customer; the outer query keeps the top rank.

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Group rows by `customer_id` and `product_id`, count occurrences. |
| 2 | For each `customer_id`, order groups by count descending and assign row numbers. |
| 3 | Keep rows where row number = 1 (most frequent product). |
| 4 | Return `customer_id` and `product_id` columns. |

## Complexity Analysis
- **Time:** The grouping and window function run in O(N log N) where N is number of orders, due to sorting for ranking.
- **Space:** O(N) to store intermediate aggregates.

## Follow-Up Questions
1. How would you modify the query to return the top k most frequent products per customer?
2. How can you handle ties by returning all products that share the maximum frequency?
3. If the dataset is huge, what indexing strategies improve performance?

## Key Takeaway
Aggregate orders per customer and use a window function to rank product frequencies, then select the top‑ranked product for each customer.
