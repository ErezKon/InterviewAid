# 1082. Sales Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-i](https://leetcode.com/problems/sales-analysis-i)
**Companies:** Amazon

---

## Problem Description

Given a `Sales` table with columns `seller_id` and `price`, report the `seller_id`(s) of the seller(s) who have the highest total sales amount. If multiple sellers tie for the highest total, return all of them.

---

## Approach

```text
FUNCTION topSellers():
    // Compute total sales per seller
    SELECT seller_id, SUM(price) AS total
    FROM Sales
    GROUP BY seller_id
    // Find maximum total
    maxTotal ← SELECT MAX(total) FROM (previous query)
    // Return sellers with total == maxTotal
    SELECT seller_id FROM (previous query) WHERE total = maxTotal
```

---

## Examples

| Sales table | Result |
|-------------|--------|
| `(1, 100)`, `(2, 200)`, `(1, 150)` | `seller_id = 1` (total 250) |
| `(1, 100)`, `(2, 100)`, `(3, 100)` | `1, 2, 3` (all tie at 100) |

---

## Walkthrough

For the first example:

1. Group by `seller_id` → totals: `1 → 250`, `2 → 200`.
2. Maximum total = `250`.
3. Return seller(s) with total `250` → `seller_id = 1`.

---

## Complexity Analysis

- **Time:** O(N) – single pass over the `Sales` rows to aggregate.
- **Space:** O(K) – storage for aggregates of K distinct sellers.

---

## Follow‑Up Questions

1. How would you modify the query to return the top K sellers instead of just the maximum?
2. How can you handle ties when ranking sellers using window functions?

---

## Key Takeaway

Aggregating with `GROUP BY` and comparing to the maximum total lets you efficiently identify the top‑selling seller(s), handling ties naturally.
