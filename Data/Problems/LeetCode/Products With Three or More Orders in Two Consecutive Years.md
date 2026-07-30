# 2292. Products With Three or More Orders in Two Consecutive Years

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/products-with-three-or-more-orders-in-two-consecutive-years](https://leetcode.com/problems/products-with-three-or-more-orders-in-two-consecutive-years)
**Companies:** Amazon

---

## Problem Description
Given an `Orders` table with columns `product_id` and `order_year`, return the list of `product_id`s that have **at least three orders in two consecutive years**. The result should be ordered by `product_id`.

## Examples
| product_id | order_year |
|------------|------------|
| 1 | 2018 |
| 1 | 2018 |
| 1 | 2018 |
| 1 | 2019 |
| 1 | 2019 |
| 1 | 2019 |
| 2 | 2018 |
| 2 | 2019 |
| 2 | 2019 |

**Output**
| product_id |
|------------|
| 1 |

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
